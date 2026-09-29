import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const env = Object.fromEntries(
  fs
    .readFileSync(path.join(ROOT, "web/.env.local"), "utf8")
    .split("\n")
    .map((l) => l.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].trim()]),
);

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

/*
 * Rellena "Incluye todo lo de…" y "Lo que añade" en los paquetes.
 *
 * Los paquetes son acumulativos y cada tarjeta repetia la lista entera del
 * anterior. Las novedades se toman de la propia lista `features` por posicion
 * (las tres traducciones estan alineadas linea a linea), asi no se reescribe
 * ni se traduce nada a mano. `features` no se toca: sigue siendo la lista
 * completa y el respaldo si se vacian los campos nuevos.
 *
 * Antes de escribir se comprueba que las lineas que se dan por incluidas son
 * identicas en el paquete base, en los tres idiomas. Si Tanya cambia una
 * lista y deja de cuadrar, el script se detiene en vez de publicar un
 * "todo lo de…" falso.
 */
const LOCALES = ["es", "en", "ru"];

// La unica diferencia de "100%" sobre "Concepto" que no es una linea nueva:
// la misma distribucion, con mas opciones.
const MORE_OPTIONS = {
  es: "Más opciones de distribución: 2–3 en lugar de 1–2",
  en: "More layout options: 2–3 instead of 1–2",
  ru: "Больше вариантов планировки: 2–3 вместо 1–2",
};

const PLAN = [
  {
    id: "package-100",
    base: "package-concept",
    // Lineas del base que este paquete contiene tal cual: [base, este].
    same: [
      [1, 1],
      [2, 4],
    ],
    // "Consulta online…" / "Consulta en línea…": en español cambia una
    // palabra, en ingles y ruso son identicas. Se compara solo en en/ru.
    sameLoose: [[3, 5]],
    extras: (f, l) => [MORE_OPTIONS[l], f[2], f[3]],
  },
  {
    id: "package-airbnb",
    base: "package-100",
    same: [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
    ],
    extras: (f) => f.slice(5),
  },
  {
    id: "package-wow",
    base: "package-100",
    same: [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
    ],
    extras: (f) => f.slice(5),
  },
];

const UI_STRINGS = {
  packageIncludes: {
    es: "Todo lo de «{title}», más:",
    en: "Everything in “{title}”, plus:",
    ru: "Всё из пакета «{title}», плюс:",
  },
};

const dry = process.argv.includes("--dry-run");

const docs = await client.fetch(
  '*[_type=="pricingPackage" && !(_id in path("drafts.**"))]{_id, title, features}',
);
const byId = new Map(docs.map((d) => [d._id, d]));

const patches = [];
for (const step of PLAN) {
  const pkg = byId.get(step.id);
  const base = byId.get(step.base);
  if (!pkg || !base)
    throw new Error(`Falta el paquete ${step.id} o ${step.base}`);

  for (const l of LOCALES) {
    const f = pkg.features?.[l] ?? [];
    const b = base.features?.[l] ?? [];
    const check = (pairs, locales) =>
      pairs.forEach(([bi, pi]) => {
        if (locales.includes(l) && b[bi] !== f[pi]) {
          throw new Error(
            `${step.id} (${l}): la linea ${pi} "${f[pi]}" no coincide con "${b[bi]}" de ${step.base}. No se escribe nada.`,
          );
        }
      });
    check(step.same, LOCALES);
    check(step.sameLoose ?? [], ["en", "ru"]);
  }

  const extras = Object.fromEntries(
    LOCALES.map((l) => [l, step.extras(pkg.features[l], l)]),
  );
  patches.push({ id: step.id, base: step.base, extras });
}

if (dry) {
  console.log("[simulación]");
  for (const p of patches) {
    console.log(`\n${p.id}  →  incluye ${p.base}`);
    LOCALES.forEach((l) =>
      p.extras[l].forEach((e) => console.log(`  ${l}  + ${e}`)),
    );
  }
  Object.keys(UI_STRINGS).forEach((k) => console.log(`\netiqueta: ${k}`));
} else {
  await write();
}

async function write() {
  const tx = patches.reduce(
    (t, p) =>
      t.patch(p.id, (patch) =>
        patch.set({
          includes: { _type: "reference", _ref: p.base },
          extras: { _type: "localeStringList", ...p.extras },
        }),
      ),
    client.transaction(),
  );
  await tx.commit();
  console.log(`✓ ${patches.length} paquetes con "Incluye todo lo de…"`);

  const doc = await client.fetch('*[_id=="siteContent"][0]{strings}');
  const have = new Set((doc?.strings ?? []).map((s) => s.key));
  const add = Object.entries(UI_STRINGS)
    .filter(([k]) => !have.has(k))
    .map(([key, v], i) => ({
      _type: "stringEntry",
      _key: "pkg" + i,
      key,
      value: { _type: "localeString", ...v },
    }));

  if (add.length) {
    await client.patch("siteContent").append("strings", add).commit();
    console.log(`✓ ${add.length} etiqueta de interfaz`);
  } else {
    console.log("· la etiqueta ya estaba");
  }
}
