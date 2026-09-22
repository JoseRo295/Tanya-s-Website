import Image from 'next/image'
import Link from 'next/link'

const SOCIAL_PATHS: Record<string, string> = {
  instagram:
    'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 5.68a4.16 4.16 0 1 0 0 8.32 4.16 4.16 0 0 0 0-8.32Zm0 6.86a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.3-7.03a.97.97 0 1 1-1.94 0 .97.97 0 0 1 1.94 0Z',
  facebook:
    'M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z',
  pinterest:
    'M12 2C6.48 2 2 6.48 2 12c0 4.24 2.64 7.86 6.36 9.32-.09-.79-.17-2.01.03-2.87.18-.78 1.19-4.97 1.19-4.97s-.3-.61-.3-1.5c0-1.41.82-2.46 1.83-2.46.86 0 1.28.65 1.28 1.42 0 .87-.55 2.17-.84 3.37-.24 1.01.5 1.84 1.5 1.84 1.8 0 3.19-1.9 3.19-4.65 0-2.43-1.75-4.13-4.24-4.13-2.89 0-4.59 2.17-4.59 4.41 0 .87.34 1.81.76 2.32.08.1.09.19.07.29l-.28 1.13c-.04.18-.14.22-.33.13-1.25-.58-2.03-2.4-2.03-3.87 0-3.15 2.29-6.04 6.6-6.04 3.46 0 6.16 2.47 6.16 5.77 0 3.44-2.17 6.21-5.18 6.21-1.01 0-1.96-.53-2.29-1.15l-.62 2.38c-.22.87-.83 1.96-1.24 2.62.93.29 1.92.44 2.95.44 5.52 0 10-4.48 10-10S17.52 2 12 2Z',
  tiktok:
    'M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06V9.7a5.64 5.64 0 0 0-.77-.05A5.66 5.66 0 1 0 15.54 15.3V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.24-1.48Z',
  youtube:
    'M21.58 7.19a2.5 2.5 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42A2.5 2.5 0 0 0 2.42 7.2C2 8.75 2 12 2 12s0 3.25.42 4.81a2.5 2.5 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.5 2.5 0 0 0 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81ZM10 15.02V8.98L15.2 12 10 15.02Z',
  linkedin:
    'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18V9.98H5.84V18h2.5ZM7.09 8.87a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9ZM18.16 18v-4.6c0-2.38-1.27-3.49-2.97-3.49-1.37 0-1.98.75-2.32 1.28v-1.1h-2.5V18h2.5v-4.48c0-1.18.22-2.32 1.68-2.32 1.44 0 1.46 1.35 1.46 2.4V18h2.15Z',
}

export function Footer({
  locale,
  tagline,
  links,
  social,
  whatsappNumber,
  email,
  privacyLabel,
  rights,
}: {
  locale: string
  tagline: string
  links: { id: string; label: string }[]
  social: { platform: string; url: string }[]
  whatsappNumber: string
  email: string | null
  privacyLabel: string
  rights: string
}) {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-ink-900 text-white">
      {/* Filete dorado: cierra la pagina y separa el pie del contenido sin
          recurrir a otra linea gris. */}
      <div
        aria-hidden
        className="h-px w-full bg-linear-to-r from-transparent via-gold/50 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Image
              src="/logo-white.png"
              alt="TG Design"
              width={180}
              height={56}
              className="h-11 w-auto brightness-0 invert"
            />
            <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-white/50">
              {tagline}
            </p>

            {social.length > 0 && (
              <div className="mt-7 flex gap-2.5">
                {social.map(({ platform, url }) => {
                  const path = SOCIAL_PATHS[platform?.toLowerCase()]
                  if (!path || !url) return null
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={platform}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
                    >
                      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" aria-hidden>
                        <path d={path} />
                      </svg>
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          <nav aria-label="Pie de página">
            <ul className="space-y-3 text-sm">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="text-white/60 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 text-sm">
            <a
              href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-white/60 transition-colors hover:text-white"
            >
              {whatsappNumber}
            </a>
            {email && (
              <a
                href={`mailto:${email}`}
                className="block text-white/60 transition-colors hover:text-white"
              >
                {email}
              </a>
            )}
            <Link
              href={`/${locale}/privacidad`}
              className="block text-white/60 transition-colors hover:text-white"
            >
              {privacyLabel}
            </Link>
          </div>
        </div>

        {/* `white/55` y no `white/35`: sobre la tinta del pie, el 35 % daba
            2.15:1 y no llegaba al minimo legible. */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} TG Design. {rights}
          </span>
          <span className="font-display text-sm tracking-wide text-white/45">
            Quito · Moscú
          </span>
        </div>
      </div>
    </footer>
  )
}
