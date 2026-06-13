import { Resend } from 'resend';

// Transactional email via Resend. Lazy client so the build never requires the
// key; routes that send mail throw a clear error if it is missing at runtime.
let resendClient: Resend | null = null;
export function getResend(): Resend {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY not configured');
    resendClient = new Resend(key);
  }
  return resendClient;
}

// Where clinic-facing notifications and contact-form submissions are delivered.
export const CLINIC_INBOX = process.env.CLINIC_NOTIFY_EMAIL || 'support@foss.la';

// Verified Resend sending identity. Must be a domain verified in the Resend
// dashboard (e.g. notifications@foss.la). Falls back to Resend's shared
// onboarding sender so local/dev sends still work before DNS is verified.
export const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL || 'Phos <onboarding@resend.dev>';
