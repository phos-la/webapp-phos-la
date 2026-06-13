import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact | Phos',
  description:
    'Get in touch with Phos, an IV ketamine clinic in Westwood, Los Angeles. Ask a general question about treatment, candidacy, or scheduling. No deposit required.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main
        style={{
          minHeight: '100vh',
          background: 'var(--brand-cream)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '140px 24px 96px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 40, maxWidth: 560 }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--brand-teal)',
              marginBottom: 16,
            }}
          >
            Contact
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 400,
              color: 'var(--brand-navy)',
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            Have a question? We&apos;re here.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              color: 'var(--fg-muted)',
              lineHeight: 1.6,
            }}
          >
            Send us a note and our team will get back to you, usually within one business day.
            Prefer to talk? Call or text (424) 278-4241.
          </p>
        </div>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
