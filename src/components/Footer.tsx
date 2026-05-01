export default function Footer() {
  return (
    <footer className="site-footer" data-screen-label="14 Footer">
      <div className="footer-row">
        <div className="footer-col">
          <p className="footer-line">
            <strong>Phos Wellness</strong> &nbsp;&mdash;&nbsp; 1762 Westwood Blvd, Ste 320, Los Angeles, CA 90024
          </p>
          <p className="footer-line">
            <a href="tel:4242784241" style={{ color: "inherit" }}>(424) 278-4241</a>
            &nbsp;&nbsp;&middot;&nbsp;&nbsp;
            <a href="mailto:support@ketaminehealing.com" style={{ color: "inherit" }}>support@ketaminehealing.com</a>
          </p>
          <p className="footer-line is-small" style={{ marginTop: 8 }}>
            &copy; {new Date().getFullYear()} Ketamine Healing Clinic of Los Angeles.
            IV ketamine for mood disorders is an off-label use. Spravato (esketamine) is FDA-approved for TRD.
          </p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/ketaminehealingla" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg className="footer-social" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href="https://www.facebook.com/ketaminehealingla" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg className="footer-social" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 8h2.5V5H14c-1.7 0-3 1.3-3 3v2H9v3h2v8h3v-8h2.5l.5-3H14V8.5c0-.3.2-.5.5-.5z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <span className="footer-watermark" aria-hidden="true">
        Phos
      </span>
    </footer>
  );
}
