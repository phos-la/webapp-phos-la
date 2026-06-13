'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  fontFamily: 'var(--font-sans)',
  fontSize: 14,
  color: 'var(--fg)',
  background: 'var(--cream-50)',
  border: '1px solid var(--border)',
  borderRadius: 10,
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-sans)',
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.02em',
  color: 'var(--fg)',
  marginBottom: 6,
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError('');

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      message: String(data.get('message') ?? ''),
      company: String(data.get('company') ?? ''), // honeypot
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      form.reset();
      setStatus('sent');
    } catch {
      setError('Network error. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          boxShadow: 'var(--shadow-md)',
          padding: '40px 36px',
          width: '100%',
          maxWidth: 600,
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 24,
            fontWeight: 400,
            color: 'var(--brand-navy)',
            marginBottom: 12,
          }}
        >
          Thank you, we&apos;ll be in touch.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            color: 'var(--fg-muted)',
            lineHeight: 1.7,
          }}
        >
          Your message has reached our team. We typically respond within one business day. For
          anything time-sensitive, call or text us at (424) 278-4241.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: '#fff',
        borderRadius: 20,
        boxShadow: 'var(--shadow-md)',
        padding: '32px 36px 36px',
        width: '100%',
        maxWidth: 600,
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}
    >
      {/* Honeypot: hidden from users, catches bots. */}
      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" style={labelStyle}>
          Name
        </label>
        <input id="name" name="name" type="text" required maxLength={120} style={inputStyle} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div>
          <label htmlFor="email" style={labelStyle}>
            Email
          </label>
          <input id="email" name="email" type="email" required maxLength={200} style={inputStyle} />
        </div>
        <div>
          <label htmlFor="phone" style={labelStyle}>
            Phone <span style={{ color: 'var(--cream-500)', fontWeight: 400 }}>(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" maxLength={40} style={inputStyle} />
        </div>
      </div>

      <div>
        <label htmlFor="message" style={labelStyle}>
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={4000}
          rows={5}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 12,
          color: 'var(--cream-500)',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        Please don&apos;t share medical history or sensitive health details here. This form is for
        general questions only. We&apos;ll guide you to a secure intake when you&apos;re ready to
        book.
      </p>

      {status === 'error' && (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#b23b3b', margin: 0 }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          width: '100%',
          padding: '14px 0',
          background: 'var(--accent)',
          color: '#fff',
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: '0.03em',
          border: 0,
          borderRadius: 10,
          cursor: status === 'sending' ? 'default' : 'pointer',
          opacity: status === 'sending' ? 0.7 : 1,
          transition: 'background 0.2s, opacity 0.2s',
        }}
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
