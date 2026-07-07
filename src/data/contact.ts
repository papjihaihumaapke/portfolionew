export const contactContent = {
  headline: "Let's work together.",
  body:
    "Whether you need a UI system, AI automation, or a hybrid designer\nfor your team — I'd love to hear from you.",
  responseTime: 'Usually within 24 hours',
  projectTypes: ['General Inquiry', 'Other'] as const,
  form: {
    name: 'Name',
    email: 'Email',
    projectType: 'Project Type',
    message: 'Message',
    submit: 'Send message →',
    successTitle: 'Message sent.',
    successBody: "Thanks — I’ll reply to your email as soon as I can.",
    errorGeneric: 'Something went wrong. Please try again.',
  },
} as const

