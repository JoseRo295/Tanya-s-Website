'use client'

import { useEffect, useMemo, useState } from 'react'
import { SanityPicture } from './SanityPicture'
import { Reveal } from './Reveal'
import type { SanityImg } from '@/sanity/queries'

export type ContactLabels = {
  eyebrow: string
  heading: string
  help: string
  firstName: string
  lastName: string
  email: string
  country: string
  selectCountry: string
  phone: string
  phonePlaceholder: string
  agree: string
  acceptTerms: string
  privacyPolicy: string
  send: string
  errors: {
    firstName: string
    lastName: string
    email: string
    country: string
    phone: string
    agree: string
  }
}

type CountryOption = { code: string; dial: string; label: string }

/** Secciones de la politica de privacidad, ya resueltas al idioma actual. */
export type PrivacyContent = {
  title: string
  intro: string
  close: string
  sections: { heading: string; body: string; items: string[] }[]
}

type Errors = Partial<Record<'firstName' | 'lastName' | 'email' | 'country' | 'phone' | 'agree', string>>

export function Contact({
  labels,
  countries,
  image,
  whatsappNumber,
  privacy,
}: {
  labels: ContactLabels
  countries: CountryOption[]
  image: SanityImg
  whatsappNumber: string
  privacy: PrivacyContent
}) {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    phone: '',
    agree: false,
  })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState(false)

  const dial = useMemo(
    () => countries.find((c) => c.code === values.country)?.dial ?? '',
    [countries, values.country],
  )

  const set = <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => {
    setValues((v) => ({ ...v, [key]: value }))
    if (touched) setErrors(validate({ ...values, [key]: value }, labels))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)

    const found = validate(values, labels)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      // Lleva el foco al primer campo con problema.
      const first = Object.keys(found)[0]
      document.getElementById(`contact-${first}`)?.focus()
      return
    }

    const countryLabel = countries.find((c) => c.code === values.country)?.label ?? ''
    const message = [
      `${labels.firstName}: ${values.firstName} ${values.lastName}`,
      `${labels.email}: ${values.email}`,
      `${labels.country}: ${countryLabel}`,
      `${labels.phone}: ${dial} ${values.phone}`,
    ].join('\n')

    window.open(
      `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <section id="contact" className="bg-sand-50 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid overflow-hidden rounded-3xl bg-white shadow-[0_24px_70px_-30px_rgba(11,15,23,0.4)] lg:grid-cols-2">
            {/* Imagen: decorativa, se oculta en movil para no gastar datos */}
            <div className="relative hidden min-h-[560px] bg-ink-800 lg:block">
              <SanityPicture
                image={image}
                alt=""
                sizes="50vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-10">
                <p className="font-display text-3xl leading-tight text-white">
                  {labels.heading}
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                  {labels.help}
                </p>
              </div>
            </div>

            {/* Formulario */}
            <div className="p-6 sm:p-10 lg:p-12">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                {labels.eyebrow}
              </p>
              <h2 className="text-balance text-[clamp(1.6rem,4vw,2.25rem)] font-semibold leading-tight text-ink-900">
                {labels.heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-400 lg:hidden">
                {labels.help}
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    id="contact-firstName"
                    label={labels.firstName}
                    value={values.firstName}
                    onChange={(v) => set('firstName', v)}
                    error={errors.firstName}
                    autoComplete="given-name"
                  />
                  <Input
                    id="contact-lastName"
                    label={labels.lastName}
                    value={values.lastName}
                    onChange={(v) => set('lastName', v)}
                    error={errors.lastName}
                    autoComplete="family-name"
                  />
                </div>

                <Input
                  id="contact-email"
                  label={labels.email}
                  type="email"
                  value={values.email}
                  onChange={(v) => set('email', v)}
                  error={errors.email}
                  autoComplete="email"
                />

                <Select
                  id="contact-country"
                  label={labels.country}
                  placeholder={labels.selectCountry}
                  value={values.country}
                  onChange={(v) => set('country', v)}
                  error={errors.country}
                  options={countries}
                />

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-1.5 block text-sm font-medium text-ink-600"
                  >
                    {labels.phone}
                  </label>
                  <div
                    className={`flex overflow-hidden rounded-xl border bg-sand-50 transition-colors focus-within:border-ink-700 focus-within:bg-white ${
                      errors.phone ? 'border-accent' : 'border-ink-200'
                    }`}
                  >
                    {dial && (
                      <span className="flex shrink-0 items-center border-r border-ink-200 bg-white/60 px-3.5 text-sm font-medium text-ink-500">
                        {dial}
                      </span>
                    )}
                    <input
                      id="contact-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      value={values.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      placeholder={labels.phonePlaceholder}
                      aria-invalid={Boolean(errors.phone)}
                      className="w-full bg-transparent px-4 py-3 text-sm text-ink-800 outline-none placeholder:text-ink-300"
                    />
                  </div>
                  {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                </div>

                <div className="pt-1">
                  <label className="flex cursor-pointer items-start gap-3">
                    <span className="relative mt-0.5 flex shrink-0">
                      <input
                        id="contact-agree"
                        type="checkbox"
                        checked={values.agree}
                        onChange={(e) => set('agree', e.target.checked)}
                        aria-invalid={Boolean(errors.agree)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-ink-300 bg-white transition-colors checked:border-ink-900 checked:bg-ink-900"
                      />
                      <svg
                        viewBox="0 0 16 16"
                        className="pointer-events-none absolute inset-0 m-auto h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M3 8.5l3.5 3.5L13 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-sm leading-relaxed text-ink-500">
                      {labels.acceptTerms}{' '}
                      <button
                        type="button"
                        onClick={() => setPrivacyOpen(true)}
                        className="font-medium text-ink-900 underline underline-offset-2 transition-colors hover:text-accent"
                      >
                        {labels.privacyPolicy}
                      </button>
                    </span>
                  </label>
                  {errors.agree && <ErrorText>{errors.agree}</ErrorText>}
                </div>

                <button
                  type="submit"
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Z" />
                  </svg>
                  {labels.send}
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>

      {privacyOpen && (
        <PrivacyModal content={privacy} onClose={() => setPrivacyOpen(false)} />
      )}
    </section>
  )
}

// ------------------------------------------------------------- privacidad

function PrivacyModal({
  content,
  onClose,
}: {
  content: PrivacyContent
  onClose: () => void
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={content.title}
      className="fixed inset-0 z-100 flex animate-fade-in items-end justify-center sm:items-center sm:p-6"
    >
      <button
        className="absolute inset-0 cursor-default bg-ink-900/80 backdrop-blur-sm"
        onClick={onClose}
        tabIndex={-1}
        aria-hidden
      />

      <div className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        <div className="flex items-start justify-between gap-4 border-b border-ink-100 px-6 py-5 sm:px-8">
          <h2 className="text-xl font-semibold text-ink-900">{content.title}</h2>
          <button
            onClick={onClose}
            aria-label={content.close}
            className="-mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-900"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden>
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6 text-sm leading-relaxed text-ink-500 sm:px-8">
          <p>{content.intro}</p>

          {content.sections.map((s, i) => (
            <section key={i} className="mt-6">
              <h3 className="mb-2 text-sm font-semibold text-ink-900">{s.heading}</h3>
              {s.body && <p>{s.body}</p>}
              {s.items.length > 0 && (
                <ul className="mt-2 list-disc space-y-1.5 pl-5">
                  {s.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="border-t border-ink-100 px-6 py-4 sm:px-8">
          <button
            onClick={onClose}
            className="w-full rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
          >
            {content.close}
          </button>
        </div>
      </div>
    </div>
  )
}

// ------------------------------------------------------------- validacion

function validate(
  v: { firstName: string; lastName: string; email: string; country: string; phone: string; agree: boolean },
  labels: ContactLabels,
): Errors {
  const e: Errors = {}
  if (!v.firstName.trim()) e.firstName = labels.errors.firstName
  if (!v.lastName.trim()) e.lastName = labels.errors.lastName
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = labels.errors.email
  if (!v.country) e.country = labels.errors.country
  if (v.phone.replace(/\D/g, '').length < 6) e.phone = labels.errors.phone
  if (!v.agree) e.agree = labels.errors.agree
  return e
}

// ------------------------------------------------------------- campos

const fieldClass = (error?: string) =>
  `w-full rounded-xl border bg-sand-50 px-4 py-3 text-sm text-ink-800 outline-none transition-colors placeholder:text-ink-300 focus:border-ink-700 focus:bg-white ${
    error ? 'border-accent' : 'border-ink-200'
  }`

function Input({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  type?: string
  autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-600">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClass(error)}
      />
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  )
}

function Select({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  options,
}: {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  error?: string
  options: CountryOption[]
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-600">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          className={`${fieldClass(error)} appearance-none pr-10 ${
            value ? 'text-ink-800' : 'text-ink-300'
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((c) => (
            <option key={c.code} value={c.code} className="text-ink-800">
              {c.label} ({c.dial})
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 16 16"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
          fill="none"
          aria-hidden
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  )
}

function ErrorText({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs font-medium text-accent-dark">
      {children}
    </p>
  )
}
