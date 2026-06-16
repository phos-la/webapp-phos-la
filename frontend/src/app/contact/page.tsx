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

        <section
          style={{
            width: '100%',
            maxWidth: 1000,
            marginTop: 72,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 32,
            alignItems: 'stretch',
          }}
        >
          <div
            style={{
              flex: '1 1 300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--brand-teal)',
                marginBottom: 14,
              }}
            >
              Visit the clinic
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 400,
                color: 'var(--brand-navy)',
                lineHeight: 1.25,
                marginBottom: 18,
              }}
            >
              Westwood, Los Angeles
            </h2>
            <address
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 15,
                fontStyle: 'normal',
                color: 'var(--fg-muted)',
                lineHeight: 1.7,
              }}
            >
              1762 Westwood Blvd, Ste 320
              <br />
              Los Angeles, CA 90024
              <br />
              <br />
              <a
                href="tel:+14242784241"
                style={{ color: 'var(--brand-navy)', textDecoration: 'none' }}
              >
                (424) 278-4241
              </a>{' '}
              (call or text)
              <br />
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=1762+Westwood+Blvd+Ste+320+Los+Angeles+CA+90024"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--brand-teal)', textDecoration: 'none', fontWeight: 600 }}
              >
                Get directions
              </a>
            </address>
          </div>

          <div
            style={{
              flex: '1 1 380px',
              borderRadius: 20,
              overflow: 'hidden',
              height: 380,
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border)',
            }}
          >
            <iframe
              title="Phos clinic location, 1762 Westwood Blvd, Ste 320, Los Angeles"
              src="https://www.google.com/maps?q=1762%20Westwood%20Blvd%20Ste%20320%20Los%20Angeles%20CA%2090024&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
