/**
 * Genera web/src/lib/countries.ts.
 *
 * El sitio viejo pedia la lista a restcountries.com en cada visita. Esa API
 * quedo descontinuada y hoy devuelve un error, asi que el desplegable se queda
 * vacio, el pais nunca se puede elegir y el formulario no se puede enviar.
 *
 * Aqui la lista se genera una sola vez y viaja con el codigo: sin peticion de
 * red, sin dependencia externa que se pueda caer, y los nombres salen del
 * propio ICU de Node en los tres idiomas.
 *
 *   node scripts/gen-countries.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'web/src/lib/countries.ts')

// ISO 3166-1 alpha-2 -> prefijo telefonico E.164
const DIAL = {
  AD:'+376',AE:'+971',AF:'+93',AG:'+1268',AI:'+1264',AL:'+355',AM:'+374',AO:'+244',AR:'+54',AS:'+1684',
  AT:'+43',AU:'+61',AW:'+297',AX:'+358',AZ:'+994',BA:'+387',BB:'+1246',BD:'+880',BE:'+32',BF:'+226',
  BG:'+359',BH:'+973',BI:'+257',BJ:'+229',BL:'+590',BM:'+1441',BN:'+673',BO:'+591',BQ:'+599',BR:'+55',
  BS:'+1242',BT:'+975',BW:'+267',BY:'+375',BZ:'+501',CA:'+1',CC:'+61',CD:'+243',CF:'+236',CG:'+242',
  CH:'+41',CI:'+225',CK:'+682',CL:'+56',CM:'+237',CN:'+86',CO:'+57',CR:'+506',CU:'+53',CV:'+238',
  CW:'+599',CX:'+61',CY:'+357',CZ:'+420',DE:'+49',DJ:'+253',DK:'+45',DM:'+1767',DO:'+1809',DZ:'+213',
  EC:'+593',EE:'+372',EG:'+20',EH:'+212',ER:'+291',ES:'+34',ET:'+251',FI:'+358',FJ:'+679',FK:'+500',
  FM:'+691',FO:'+298',FR:'+33',GA:'+241',GB:'+44',GD:'+1473',GE:'+995',GF:'+594',GG:'+44',GH:'+233',
  GI:'+350',GL:'+299',GM:'+220',GN:'+224',GP:'+590',GQ:'+240',GR:'+30',GT:'+502',GU:'+1671',GW:'+245',
  GY:'+592',HK:'+852',HN:'+504',HR:'+385',HT:'+509',HU:'+36',ID:'+62',IE:'+353',IL:'+972',IM:'+44',
  IN:'+91',IO:'+246',IQ:'+964',IR:'+98',IS:'+354',IT:'+39',JE:'+44',JM:'+1876',JO:'+962',JP:'+81',
  KE:'+254',KG:'+996',KH:'+855',KI:'+686',KM:'+269',KN:'+1869',KP:'+850',KR:'+82',KW:'+965',KY:'+1345',
  KZ:'+7',LA:'+856',LB:'+961',LC:'+1758',LI:'+423',LK:'+94',LR:'+231',LS:'+266',LT:'+370',LU:'+352',
  LV:'+371',LY:'+218',MA:'+212',MC:'+377',MD:'+373',ME:'+382',MF:'+590',MG:'+261',MH:'+692',MK:'+389',
  ML:'+223',MM:'+95',MN:'+976',MO:'+853',MP:'+1670',MQ:'+596',MR:'+222',MS:'+1664',MT:'+356',MU:'+230',
  MV:'+960',MW:'+265',MX:'+52',MY:'+60',MZ:'+258',NA:'+264',NC:'+687',NE:'+227',NF:'+672',NG:'+234',
  NI:'+505',NL:'+31',NO:'+47',NP:'+977',NR:'+674',NU:'+683',NZ:'+64',OM:'+968',PA:'+507',PE:'+51',
  PF:'+689',PG:'+675',PH:'+63',PK:'+92',PL:'+48',PM:'+508',PR:'+1787',PS:'+970',PT:'+351',PW:'+680',
  PY:'+595',QA:'+974',RE:'+262',RO:'+40',RS:'+381',RU:'+7',RW:'+250',SA:'+966',SB:'+677',SC:'+248',
  SD:'+249',SE:'+46',SG:'+65',SH:'+290',SI:'+386',SJ:'+47',SK:'+421',SL:'+232',SM:'+378',SN:'+221',
  SO:'+252',SR:'+597',SS:'+211',ST:'+239',SV:'+503',SX:'+1721',SY:'+963',SZ:'+268',TC:'+1649',TD:'+235',
  TG:'+228',TH:'+66',TJ:'+992',TK:'+690',TL:'+670',TM:'+993',TN:'+216',TO:'+676',TR:'+90',TT:'+1868',
  TV:'+688',TW:'+886',TZ:'+255',UA:'+380',UG:'+256',US:'+1',UY:'+598',UZ:'+998',VA:'+379',VC:'+1784',
  VE:'+58',VG:'+1284',VI:'+1340',VN:'+84',VU:'+678',WF:'+681',WS:'+685',XK:'+383',YE:'+967',YT:'+262',
  ZA:'+27',ZM:'+260',ZW:'+263',
}

const LOCALES = ['en', 'ru', 'es']

const namers = Object.fromEntries(
  LOCALES.map((l) => [l, new Intl.DisplayNames([l], { type: 'region' })]),
)

const countries = Object.entries(DIAL)
  .map(([code, dial]) => {
    const name = {}
    for (const l of LOCALES) {
      const n = namers[l].of(code)
      // Si ICU no conoce el codigo devuelve el codigo mismo: se descarta.
      if (n && n !== code) name[l] = n
    }
    return Object.keys(name).length ? { code, dial, name } : null
  })
  .filter(Boolean)

const body = `// GENERADO por scripts/gen-countries.mjs — no editar a mano.
// Reemplaza la llamada a restcountries.com, que quedo descontinuada y rompia
// el formulario de contacto (el desplegable se quedaba vacio y el boton de
// enviar nunca se activaba).

export type Country = {
  code: string
  dial: string
  name: Partial<Record<'en' | 'ru' | 'es', string>>
}

export const COUNTRIES: Country[] = ${JSON.stringify(countries, null, 2)}

/** Ordenado alfabeticamente en el idioma pedido. */
export function countriesFor(locale: 'en' | 'ru' | 'es'): {
  code: string
  dial: string
  label: string
}[] {
  return COUNTRIES.map((c) => ({
    code: c.code,
    dial: c.dial,
    label: c.name[locale] ?? c.name.en ?? c.code,
  })).sort((a, b) => a.label.localeCompare(b.label, locale))
}
`

fs.writeFileSync(OUT, body)
console.log(`${countries.length} paises -> ${path.relative(ROOT, OUT)}`)
