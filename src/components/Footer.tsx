export default function Footer() {
  return (
    <footer className="site-footer" data-screen-label="14 Footer">
      <div className="footer-row">
        <div className="footer-col">
          <p className="footer-line">
            &copy; 2025 Foresta template <strong>by Sebastian St</strong>
          </p>
          <p className="footer-line is-small">
            <strong>Build in Framer</strong>&nbsp;&nbsp;All rights reserved.
          </p>
          <div className="footer-socials">
            <a href="#instagram" aria-label="Instagram">
              <svg
                className="footer-social"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href="#facebook" aria-label="Facebook">
              <svg className="footer-social" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 8h2.5V5H14c-1.7 0-3 1.3-3 3v2H9v3h2v8h3v-8h2.5l.5-3H14V8.5c0-.3.2-.5.5-.5z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#youtube" aria-label="YouTube">
              <svg className="footer-social" viewBox="0 0 24 24" fill="none">
                <rect
                  x="2"
                  y="5"
                  width="20"
                  height="14"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path d="M10 9 L15 12 L10 15 Z" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <span className="footer-watermark" aria-hidden="true">
        Foresta
      </span>
    </footer>
  );
}
