'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';

type Status = 'idle' | 'sending' | 'success' | 'error';

const labelCls =
  'font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--fg-muted)]';

const inputCls =
  'w-full bg-[var(--bg)] rounded-none font-sans text-[16px] text-[var(--fg)] ' +
  'px-4 py-3 outline-none ' +
  'placeholder:text-[var(--fg-subtle)] ' +
  'focus:ring-2 focus:ring-[var(--accent-amber-dk)] focus:ring-offset-0';

const borderStyle = { borderWidth: '0.5px', borderColor: 'rgba(107,95,77,0.5)' } as const;

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // Client validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in name, email, and message.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, message }),
      });
      const data: { success?: boolean; error?: string } = await res
        .json()
        .catch(() => ({}));

      if (!res.ok || !data.success) {
        setStatus('error');
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setStatus('success');
    } catch {
      setStatus('error');
      setError('Network error. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-3">
        <p className="font-serif text-[28px] leading-[1.15] tracking-[-0.01em] text-[var(--fg)]">
          Thanks — we&apos;ll be in touch within 24 hours.
        </p>
        <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--fg-muted)]">
          We usually reply faster than that.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-name" className={labelCls}>
          Name
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputCls}
          style={borderStyle}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-email" className={labelCls}>
          Email
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
          style={borderStyle}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-company" className={labelCls}>
          Company
        </label>
        <input
          id="cf-company"
          name="company"
          type="text"
          autoComplete="organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputCls}
          style={borderStyle}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-message" className={labelCls}>
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputCls} resize-y`}
          style={borderStyle}
          required
        />
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <Button
          type="submit"
          variant="pill"
          disabled={status === 'sending'}
          className="self-start"
        >
          {status === 'sending' ? 'Sending…' : 'Send →'}
        </Button>
        {status === 'sending' ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--fg-muted)]">
            Sending…
          </span>
        ) : null}
        {error ? (
          <span className="font-sans text-[14px] text-[var(--accent-terra)]">
            {error}
          </span>
        ) : null}
      </div>
    </form>
  );
}
