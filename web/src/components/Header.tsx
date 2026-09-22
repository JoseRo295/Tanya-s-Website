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
  const [active, setActive] = useState<string>('')
  const pathname = usePathname()

  // Barra de progreso + estado compacto al bajar.
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight
        setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
        setScrolled(window.scrollY > 24)
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

  /** Conserva el ancla al cambiar de idioma: /en#contact -> /ru#contact */
  const localeHref = (target: Locale) => {
    const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || ''
    return `/${target}${rest}`
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-ink-100 bg-sand-50/85 shadow-[0_1px_20px_rgba(11,15,23,0.06)] backdrop-blur-xl'
            : 'border-b border-transparent bg-sand-50/60 backdrop-blur-md'
        }`}
      >
        <nav
          aria-label="Principal"
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        >
          <Link
            href={`/${locale}`}
            className="group relative z-50 flex shrink-0 items-center py-3"
            aria-label="TG Design — inicio"
          >
            <Image
              src={logoUrl}
              alt="TG Design"
              width={180}
              height={56}
              priority
              className={`w-auto transition-all duration-300 ${
                scrolled ? 'h-9 sm:h-10' : 'h-11 sm:h-14'
              }`}
            />
          </Link>

          {/* Menu escritorio */}
          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`relative block px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200 ${
                    active === item.id
                      ? 'text-ink-900'
                      : 'text-ink-500 hover:text-ink-900'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 -bottom-px h-px origin-left bg-accent transition-transform duration-300 ${
                      active === item.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LocaleSwitch current={locale} href={localeHref} />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              className="relative z-50 -mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ink-100 md:hidden"
            >
              <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
              <Burger open={open} />
            </button>
          </div>
        </nav>

        <div
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-linear-to-r from-accent to-accent-light transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress / 100})` }}
          aria-hidden
        />
      </header>

      {/* Menu movil a pantalla completa */}
      <div
        id="menu-movil"
        inert={!open}
        className={`fixed inset-0 z-40 bg-sand-50 transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-2 px-8">
          {nav.map((item, i) => (
            <li key={item.id} className="w-full max-w-xs">
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-6 py-4 text-center font-display text-2xl text-ink-800 transition-all duration-300 hover:bg-white hover:text-accent"
                style={{
                  transitionDelay: open ? `${i * 40}ms` : '0ms',
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateY(0)' : 'translateY(12px)',
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
}: {
  current: Locale
  href: (l: Locale) => string
}) {
  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-ink-200 bg-white/70 p-0.5"
      role="group"
      aria-label="Idioma"
    >
      {LOCALES.map(({ id }) => (
        <Link
          key={id}
          href={href(id)}
          hrefLang={id}
          aria-current={id === current ? 'true' : undefined}
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 ${
            id === current
              ? 'bg-ink-800 text-white shadow-sm'
              : 'text-ink-400 hover:text-ink-800'
          }`}
        >
          {id}
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
      <span className={`${bar} ${open ? 'top-1/2 -rotate-45' : 'bottom-0.5 top-auto'}`} />
    </span>
  )
}
