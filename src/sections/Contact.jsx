import { useState } from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

/**
 * Contact — form UI only. No SMTP credentials or mail-sending logic live
 * here; validation and submit-state handling are ported from the
 * original, but the actual send is a placeholder POST to `/api/contact`.
 * Wire that endpoint to a serverless function (e.g. a Vercel Function
 * using Resend/SendGrid, or any other provider) — this file never needs
 * to change when that backend is added.
 */
export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', phone: '', message: '', website: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ message: '', state: '' });
  const [isLoading, setIsLoading] = useState(false);

  function validateField(name, value) {
    if (name === 'phone' || name === 'website') return '';
    if (!value.trim()) return 'This field is required.';
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.';
    return '';
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = {
      name: validateField('name', values.name),
      email: validateField('email', values.email),
      message: validateField('message', values.message)
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      setStatus({ message: 'Please fix the highlighted fields.', state: 'error' });
      return;
    }

    setIsLoading(true);
    setStatus({ message: 'Sending…', state: 'pending' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus({ message: data.message || 'Message sent — thanks, I\u2019ll reply soon.', state: 'success' });
        setValues({ name: '', email: '', phone: '', message: '', website: '' });
      } else {
        setStatus({ message: data.message || 'Something went wrong. Please try again or email directly.', state: 'error' });
      }
    } catch {
      setStatus({ message: 'Network error. Please try again or email directly.', state: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="contact" aria-label="Contact" className="px-6 py-32 sm:px-10 lg:pl-32 lg:pr-16">
      <p className="font-mono text-eyebrow uppercase tracking-widest text-muted">06 // Contact</p>
      <h2 className="mt-4 max-w-3xl font-display text-display-1 text-paper">Let&rsquo;s build something impossible.</h2>

      <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-12">
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-website">Leave this field empty</label>
            <input
              type="text"
              id="contact-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="contact-name" className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Name
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              required
              autoComplete="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.name)}
              className="mt-2 w-full border-b border-depth-2 bg-transparent py-2 font-body text-paper outline-none transition-colors focus:border-signal"
            />
            <p role="alert" className="mt-1 font-mono text-[11px] text-signal">
              {errors.name}
            </p>
          </div>

          <div>
            <label htmlFor="contact-email" className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Email address
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              required
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.email)}
              className="mt-2 w-full border-b border-depth-2 bg-transparent py-2 font-body text-paper outline-none transition-colors focus:border-signal"
            />
            <p role="alert" className="mt-1 font-mono text-[11px] text-signal">
              {errors.email}
            </p>
          </div>

          <div>
            <label htmlFor="contact-phone" className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Phone number <span className="normal-case text-muted/60">(optional)</span>
            </label>
            <input
              type="tel"
              id="contact-phone"
              name="phone"
              autoComplete="tel"
              value={values.phone}
              onChange={handleChange}
              className="mt-2 w-full border-b border-depth-2 bg-transparent py-2 font-body text-paper outline-none transition-colors focus:border-signal"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Tell me about your project
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.message)}
              className="mt-2 w-full border-b border-depth-2 bg-transparent py-2 font-body text-paper outline-none transition-colors focus:border-signal"
            />
            <p role="alert" className="mt-1 font-mono text-[11px] text-signal">
              {errors.message}
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            data-cursor="hover"
            className="w-full rounded-full bg-signal px-6 py-4 font-mono text-xs uppercase tracking-widest text-void transition-opacity duration-300 disabled:opacity-50 sm:w-auto"
          >
            {isLoading ? 'Sending…' : 'Send message'}
          </button>

          <p role="status" aria-live="polite" className="font-mono text-xs uppercase tracking-widest text-muted">
            {status.message}
          </p>
        </form>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-depth-2 bg-depth-1 p-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-signal">Email me</p>
            <a
              href="mailto:daniellawal015@gmail.com"
              data-cursor="hover"
              className="mt-2 block font-display text-xl text-paper transition-colors hover:text-signal"
            >
              daniellawal015@gmail.com
            </a>
          </div>

          <div className="rounded-2xl border border-depth-2 bg-depth-1 p-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-signal">Location</p>
            <p className="mt-2 font-display text-xl text-paper">Lagos, Nigeria</p>
          </div>

          <div className="rounded-2xl border border-depth-2 bg-depth-1 p-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">DIGITAL FOOTPRINT</p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://github.com/daniellawal015-code"
                data-cursor="hover"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-depth-2 text-paper transition-colors hover:border-signal hover:text-signal"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/daniel-lawal-135b54418"
                data-cursor="hover"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-depth-2 text-paper transition-colors hover:border-signal hover:text-signal"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://x.com/DanielLawa35431"
                data-cursor="hover"
                aria-label="X (Twitter)"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-depth-2 text-paper transition-colors hover:border-signal hover:text-signal"
              >
                <Twitter className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="mt-2 rounded-2xl border border-signal/40 bg-depth-1 p-6">
            <p className="font-display text-2xl text-paper">Let&rsquo;s turn ideas into digital reality.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
