'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LOCALES, type Locale } from '@/sanity/locales'

type NavItem = { id: string; label: string }

export function Header({
  locale,
  nav,
  logoUrl,
}: {
  locale: Locale
  nav: NavItem[]
  logoUrl: string
}) {
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  // Arranca en `true`: la pagina siempre carga con la portada debajo.
  const [overHero, setOverHero] = useState(true)
  const [active, setActive] = useState<string>('')
  const pathname = usePathname()

  // Barra de progreso, estado compacto al bajar, y si aun estamos sobre la
  // foto de portada (entonces el header va transparente y en blanco).
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight
        setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
        setScrolled(window.scrollY > 24)
        const hero = document.getElementById('home')
        setOverHero(hero ? window.scrollY < hero.offsetHeight - 72 : false)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Resalta en el menu la seccion que se esta viendo.
  useEffect(() => {
    const sections = nav
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [nav])

  // Bloquea el scroll del fondo mientras el menu movil esta abierto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Cierra el menu con Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  /** Al cambiar de idioma se vuelve a la seccion que se estaba viendo:
   *  leyendo Precios en /es, "ru" lleva a /ru#newpricingplans. Se usa la
   *  seccion activa y no la posicion en pixeles porque cada idioma tiene
   *  textos de distinto largo y la misma altura cae en otro sitio. */
  const localeHref = (target: Locale) => {
    const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || ''
    const hash = active && active !== 'home' ? `#${active}` : ''
    return `/${target}${rest}${hash}`
  }

  // Texto claro sobre la foto de portada y sobre el menu movil (que es oscuro).
  const light = overHero || open

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          light
            ? 'border-b border-transparent bg-transparent'
            : 'border-b border-ink-200/70 bg-sand-50/85 backdrop-blur-xl'
        }`}
      >
        <nav
          aria-label="Principal"
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8"
        >
          <Link
            href={`/${locale}`}
            className="group relative z-50 flex shrink-0 items-center py-3"
            aria-label="TG Design — inicio"
          >
            {/* Un solo archivo de logo: en claro se vuelve blanco con filtro,
                asi no se descarga una segunda imagen. */}
            <Image
              src={logoUrl}
              alt="TG Design"
              width={180}
              height={56}
              priority
              className={`w-auto transition-[height,filter] duration-500 ${
                scrolled && !open ? 'h-9 sm:h-10' : 'h-11 sm:h-12'
              } ${light ? 'brightness-0 invert' : ''}`}
            />
          </Link>

          {/* Menu escritorio */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`relative block px-3 py-2 text-sm transition-colors duration-300 ${
                    light
                      ? active === item.id
                        ? 'text-white'
                        : 'text-white/75 hover:text-white'
                      : active === item.id
                        ? 'text-ink-900'
                        : 'text-ink-500 hover:text-ink-900'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 bottom-0.5 h-px origin-left transition-transform duration-500 ease-out-expo ${
                      light ? 'bg-white' : 'bg-gold'
                    } ${active === item.id ? 'scale-x-100' : 'scale-x-0'}`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="relative z-50 flex items-center gap-1">
            <LocaleSwitch current={locale} href={localeHref} light={light} />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              className={`-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden ${
                light
                  ? 'text-white hover:bg-white/10'
                  : 'text-ink-800 hover:bg-ink-100'
              }`}
            >
              <span className="sr-only">
                {open ? 'Cerrar menú' : 'Abrir menú'}
              </span>
              <Burger open={open} />
            </button>
          </div>
        </nav>

        <div
          className={`absolute inset-x-0 bottom-0 h-px origin-left bg-gold transition-opacity duration-300 ${
            light ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ transform: `scaleX(${progress / 100})` }}
          aria-hidden
        />
      </header>

      {/* Menu movil a pantalla completa. Oscuro, con los enlaces grandes en
          la serif: en el telefono es la primera vez que se ve la tipografia
          del sitio a tamano de cartel, y conviene que se note. */}
      <div
        id="menu-movil"
        inert={!open}
        className={`fixed inset-0 z-40 flex flex-col bg-ink-900 transition-[clip-path] duration-700 ease-in-out-quart lg:hidden ${
          open
            ? '[clip-path:inset(0_0_0_0)]'
            : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
        }`}
      >
        <ul className="flex flex-1 flex-col justify-center gap-1 px-6 pt-20">
          {nav.map((item, i) => (
            <li key={item.id} className="overflow-hidden">
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`block py-2 font-display text-[clamp(2.25rem,10vw,3.5rem)] leading-tight transition-[translate,color] duration-700 ease-out-expo ${
                  active === item.id
                    ? 'text-gold'
                    : 'text-white hover:text-gold'
                }`}
                style={{
                  transitionDelay: open ? `${150 + i * 50}ms` : '0ms',
                  translate: open ? '0 0' : '0 110%',
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

function LocaleSwitch({
  current,
  href,
  light,
}: {
  current: Locale
  href: (l: Locale) => string
  light: boolean
}) {
  return (
    <div className="flex items-center" role="group" aria-label="Idioma">
      {LOCALES.map(({ id }) => (
        <Link
          key={id}
          href={href(id)}
          hrefLang={id}
          aria-current={id === current ? 'true' : undefined}
          className={`relative flex h-11 min-w-9 items-center justify-center px-1.5 text-[13px] uppercase transition-colors duration-300 ${
            id === current
              ? light
                ? 'text-white'
                : 'text-ink-900'
              : light
                ? 'text-white/55 hover:text-white'
                : 'text-ink-400 hover:text-ink-900'
          }`}
        >
          {id}
          {id === current && (
            <span
              aria-hidden
              className={`absolute inset-x-2 bottom-2.5 h-px ${light ? 'bg-white' : 'bg-gold'}`}
            />
          )}
        </Link>
      ))}
    </div>
  )
}

/** Hamburguesa que se transforma en X. */
function Burger({ open }: { open: boolean }) {
  const bar = 'absolute h-[1.5px] w-5 bg-current transition-all duration-300'
  return (
    <span className="relative block h-4 w-5" aria-hidden>
      <span className={`${bar} ${open ? 'top-1/2 rotate-45' : 'top-0.5'}`} />
      <span
        className={`${bar} top-1/2 ${open ? 'opacity-0' : 'opacity-100'}`}
      />
      <span
        className={`${bar} ${open ? 'top-1/2 -rotate-45' : 'bottom-0.5 top-auto'}`}
      />
    </span>
  )
}
