import { Resend } from 'resend'
import type { VercelRequest, VercelResponse } from '@vercel/node'

type ContactPayload = {
  name: string
  email: string
  projectType: string
  message: string
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' })
    return
  }

  const body = (req.body ?? {}) as Partial<ContactPayload>

  const name = isNonEmptyString(body.name) ? body.name.trim() : ''
  const email = isNonEmptyString(body.email) ? body.email.trim() : ''
  const projectType = isNonEmptyString(body.projectType) ? body.projectType.trim() : ''
  const message = isNonEmptyString(body.message) ? body.message.trim() : ''

  const errors: Record<string, string> = {}
  if (!name) errors.name = 'Name is required.'
  if (!email) errors.email = 'Email is required.'
  else if (!isEmail(email)) errors.email = 'Enter a valid email.'
  if (!projectType) errors.projectType = 'Project type is required.'
  if (!message) errors.message = 'Message is required.'

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ ok: false, errors })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    res.status(500).json({ ok: false, error: 'Missing RESEND_API_KEY' })
    return
  }

  const resend = new Resend(apiKey)

  try {
    const subject = `New portfolio inquiry — ${projectType}`
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${projectType}`,
      '',
      message,
    ].join('\n')

    const result = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['mohammadhilalmalik@gmail.com'],
      replyTo: email,
      subject,
      text,
    })

    res.status(200).json({ ok: true, id: result.data?.id ?? null })
  } catch {
    res.status(500).json({ ok: false, error: 'Failed to send message.' })
  }
}

