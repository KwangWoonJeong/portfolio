import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import useScrollReveal from '../../hooks/useScrollReveal'
import TerminalWindow from '../ui/TerminalWindow'
import GlowButton from '../ui/GlowButton'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const links = [
  { label: 'GitHub', href: 'https://github.com/manbo', icon: '$ git remote -v' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/manbo', icon: '$ open linkedin' },
  { label: 'Email', href: 'mailto:manbo@dev.com', icon: '$ echo $EMAIL' },
]

function InputField({
  label,
  type = 'text',
  required,
  value,
  onChange,
}: {
  label: string
  type?: string
  required?: boolean
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-accent-green shrink-0">{label}:</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent border-b border-border text-text-primary font-mono text-sm py-1 outline-none transition-colors focus:border-accent caret-accent"
      />
    </div>
  )
}

export default function Contact() {
  const { ref, isVisible } = useScrollReveal()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const update = (field: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [field]: v }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim() || !form.message.trim()) {
      setError('Error: name and message are required fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Error: invalid email format.')
      return
    }

    console.log('Contact form:', form)
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contact" className="max-w-4xl mx-auto px-6 py-20" ref={ref}>
      <motion.h2
        className="mb-8"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={fadeUp}
      >
        <span className="text-accent-green">##</span> send_message --to manbo
      </motion.h2>

      <motion.div
        className="grid md:grid-cols-[1fr_280px] gap-8"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {/* form */}
        <motion.div variants={fadeUp}>
          <TerminalWindow title="compose_message">
            <p className="text-accent-green mb-4">visitor@manbo:~$ compose_message</p>

            {sent ? (
              <div className="space-y-2">
                <p className="text-accent-green font-mono text-sm">
                  ✓ Message sent successfully. Exit code: 0
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-accent font-mono text-sm hover:underline"
                >
                  $ compose_message (send another)
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <InputField label="name" required value={form.name} onChange={update('name')} />
                <InputField
                  label="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                />
                <InputField label="subject" value={form.subject} onChange={update('subject')} />

                <div>
                  <p className="text-accent-green mb-1">message:</p>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => update('message')(e.target.value)}
                    className="w-full bg-transparent border border-border rounded text-text-primary font-mono text-sm p-2 outline-none transition-colors focus:border-accent caret-accent resize-none"
                  />
                </div>

                {error && <p className="text-accent-red font-mono text-xs">{error}</p>}

                <GlowButton type="submit">$ send_message</GlowButton>
              </form>
            )}
          </TerminalWindow>
        </motion.div>

        {/* links sidebar */}
        <motion.div variants={fadeUp} className="space-y-6">
          <div className="space-y-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-mono text-sm text-text-muted hover:text-accent transition-colors"
              >
                <span className="text-text-muted">{l.icon}</span>
                <span className="block ml-4 text-text-primary hover:text-accent hover:underline">
                  {l.label}
                </span>
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-border">
            <a href="/resume.pdf" download="resume.pdf">
              <GlowButton className="w-full">$ wget resume.pdf</GlowButton>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
