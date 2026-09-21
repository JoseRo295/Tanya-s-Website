import fs from 'node:fs'

/**
 * Extrae el objeto `translations` de tg-design/src/context/LocalizationContext.js.
 *
 * No se puede importar el modulo directo porque arrastra React y JSX, asi que
 * se recorta el literal del objeto y se evalua. Es data pura (strings y arrays),
 * y el archivo es del propio repo, no entrada de usuario.
 */
export function parseTranslations(file) {
  const src = fs.readFileSync(file, 'utf8')

  const marker = /const\s+translations\s*=\s*/g
  const match = marker.exec(src)
  if (!match) throw new Error(`No encontre "const translations =" en ${file}`)

  const start = src.indexOf('{', match.index + match[0].length)
  if (start === -1) throw new Error('No encontre la llave de apertura del objeto')

  const end = matchBrace(src, start)
  const literal = src.slice(start, end + 1)

  // eslint-disable-next-line no-new-func
  const value = new Function(`return (${literal})`)()

  // La clave duplicada `orderDesignProject` en `es` hace que gane la version
  // array. Se normaliza a string para que coincida con en/ru.
  for (const locale of Object.keys(value)) {
    const v = value[locale].orderDesignProject
    if (Array.isArray(v) && v.length === 1) value[locale].orderDesignProject = v[0]
  }

  return value
}

/** Devuelve el indice de la llave que cierra la que empieza en `open`. */
function matchBrace(src, open) {
  let depth = 0
  let i = open

  while (i < src.length) {
    const c = src[i]

    // comentarios
    if (c === '/' && src[i + 1] === '/') {
      i = src.indexOf('\n', i)
      if (i === -1) break
      continue
    }
    if (c === '/' && src[i + 1] === '*') {
      i = src.indexOf('*/', i + 2) + 2
      continue
    }

    // strings: saltarlas enteras para no contar llaves de su interior
    if (c === '"' || c === "'" || c === '`') {
      i = skipString(src, i)
      continue
    }

    if (c === '{') depth++
    else if (c === '}') {
      depth--
      if (depth === 0) return i
    }
    i++
  }

  throw new Error('El objeto translations no cierra')
}

function skipString(src, start) {
  const quote = src[start]
  let i = start + 1
  while (i < src.length) {
    if (src[i] === '\\') {
      i += 2
      continue
    }
    if (src[i] === quote) return i + 1
    i++
  }
  throw new Error(`String sin cerrar en el indice ${start}`)
}
