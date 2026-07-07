import { CheckCircle2, Github, Linkedin, Palette } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { site } from '../data/site'
import { contactContent } from '../data/contact'
import { Button } from '../components/ui/Button'
import { SectionLabel } from '../components/ui/SectionLabel'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { TextReveal } from '../components/ui/TextReveal'

export function Contact() {
  useEffect(() => {
    document.title = 'Contact — Hilal Malik'
  }, [])

  const c = contactContent

  const projectTypes = useMemo(() => c.projectTypes, [c.projectTypes])

  const [values, setValues] = useState<{
    name: string
    email: string
    projectType: string
    message: string
  }>({
    name: '',
    email: '',
    projectType: projectTypes[0] ?? 'UI/UX Design',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof typeof values, string>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const validate = () => {
    const next: Partial<Record<keyof typeof values, string>> = {}
    if (!values.name.trim()) next.name = 'Name is required.'
    if (!values.email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = 'Enter a valid email.'
    if (!values.projectType.trim()) next.projectType = 'Project type is required.'
    if (!values.message.trim()) next.message = 'Message is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    if (!validate()) return

    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          projectType: values.projectType,
          message: values.message,
        }),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string; errors?: Record<string, string> }
          | null
        if (data?.errors) {
          setErrors((prev) => ({
            ...prev,
            ...data.errors,
          }))
        }
        setErrorMessage(data?.error ?? c.form.errorGeneric)
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setErrorMessage(c.form.errorGeneric)
      setStatus('error')
    }
  }

  return (
    <section className="section">
      <div className="container-page">
        <AnimatedSection className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <SectionLabel>Contact</SectionLabel>
              <TextReveal
                text={c.headline}
                as="h1"
                className="font-display text-[var(--text-display)] leading-[0.95] tracking-tight"
              />
              <p className="font-body text-[var(--text-body)] text-muted whitespace-pre-line">
                {c.body}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="font-body text-[var(--text-micro)] uppercase tracking-[0.15em] text-muted">
                  Email
                </div>
                <a
                  className="font-body text-[var(--text-body)] text-text hover:text-accent transition-colors duration-300"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </div>
              <div>
                <div className="font-body text-[var(--text-micro)] uppercase tracking-[0.15em] text-muted">
                  Location
                </div>
                <div className="font-body text-[var(--text-body)] text-text">{site.location}</div>
              </div>
              <div>
                <div className="font-body text-[var(--text-micro)] uppercase tracking-[0.15em] text-muted">
                  Response time
                </div>
                <div className="font-body text-[var(--text-body)] text-text">{c.responseTime}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-body text-[var(--text-micro)] uppercase tracking-[0.15em] text-muted">
                Social
              </div>
              <div className="space-y-2">
                <SocialLink
                  icon={<Linkedin size={18} aria-hidden="true" />}
                  label="LinkedIn"
                  href="https://linkedin.com/in/hilalmalik"
                />
                <SocialLink
                  icon={<Palette size={18} aria-hidden="true" />}
                  label="Behance"
                  href="https://behance.net/mohammadhilalmalik"
                  highlight
                />
                <SocialLink
                  icon={<Github size={18} aria-hidden="true" />}
                  label="GitHub"
                  href="https://github.com/hilalmalik"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-border bg-surface p-8">
              {status === 'success' ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-accent" aria-hidden="true" />
                    <div className="font-display text-[24px] leading-tight">
                      {c.form.successTitle}
                    </div>
                  </div>
                  <p className="font-body text-[var(--text-body)] text-muted">
                    {c.form.successBody}
                  </p>
                  <Button href="/work" variant="outlined">
                    See my work →
                  </Button>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={onSubmit} noValidate>
                  <Field
                    id="name"
                    label={c.form.name}
                    error={errors.name}
                    required
                  >
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, name: e.target.value }))
                      }
                      className={inputClass(errors.name)}
                      autoComplete="name"
                    />
                  </Field>

                  <Field
                    id="email"
                    label={c.form.email}
                    error={errors.email}
                    required
                  >
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, email: e.target.value }))
                      }
                      className={inputClass(errors.email)}
                      autoComplete="email"
                    />
                  </Field>

                  <Field
                    id="projectType"
                    label={c.form.projectType}
                    error={errors.projectType}
                    required
                  >
                    <select
                      id="projectType"
                      name="projectType"
                      value={values.projectType}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, projectType: e.target.value }))
                      }
                      className={inputClass(errors.projectType)}
                    >
                      {projectTypes.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    id="message"
                    label={c.form.message}
                    error={errors.message}
                    required
                  >
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={values.message}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, message: e.target.value }))
                      }
                      className={inputClass(errors.message)}
                    />
                  </Field>

                  {status === 'error' ? (
                    <div className="font-body text-[var(--text-small)] text-accent">
                      {errorMessage}
                    </div>
                  ) : null}

                  <div>
                    <Button
                      variant="filled"
                      type="submit"
                      className="w-full sm:w-auto"
                    >
                      {status === 'submitting' ? 'Sending…' : c.form.submit}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

function inputClass(error?: string) {
  return [
    'w-full border rounded-none px-4 py-3 font-body text-[var(--text-body)] bg-white',
    'transition-colors duration-200 focus:border-accent focus:outline-none',
    error ? 'border-accent' : 'border-border',
  ].join(' ')
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="font-body text-[var(--text-micro)] uppercase tracking-[0.15em] text-muted"
      >
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>
      {children}
      {error ? (
        <div className="font-body text-[var(--text-micro)] text-accent">{error}</div>
      ) : null}
    </div>
  )
}

function SocialLink({
  icon,
  label,
  href,
  highlight = false,
}: {
  icon: React.ReactNode
  label: string
  href: string
  highlight?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={[
        'inline-flex items-center gap-2 font-body text-[var(--text-body)] transition-colors duration-300',
        highlight
          ? 'text-accent border border-accent/20 px-3 py-1 bg-accent/5 hover:bg-accent hover:text-white'
          : 'text-text hover:text-accent'
      ].join(' ')}
    >
      {icon}
      <span>{label}</span>
    </a>
  )
}

