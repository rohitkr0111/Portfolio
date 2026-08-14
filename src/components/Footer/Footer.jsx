import logopic from '../../assets/logopic.png';
import './Footer.css';

const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rohitkumarsingh0111/' },
  { label: 'GitHub', href: 'https://github.com/rohitkumarsingh0111' },
  { label: 'Resume', href: '/Rohit_Kumar.pdf' },
];

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      {/* Gradient divider */}
      <div className="footer__divider" />

      <div className="footer__inner">
        {/* Brand */}
        <div className="footer__brand">
          <img src={logopic} alt="Rohit Kumar" className="footer__logo" />
          <p className="footer__brand-text">
            Building fast, scalable, and beautiful web experiences.
          </p>
          <div className="footer__socials">
            {LINKS.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="footer__social">
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Nav links */}
        <div className="footer__nav-col">
          <h4 className="footer__col-title">Navigation</h4>
          <nav className="footer__nav">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className="footer__nav-link">{label}</a>
            ))}
          </nav>
        </div>

        {/* Contact mini */}
        <div className="footer__contact-col">
          <h4 className="footer__col-title">Contact</h4>
          <div className="footer__contact-list">
            <a href="mailto:rohitkumarsingh1168@gmail.com" className="footer__contact-item">
              rohitkumarsingh1168@gmail.com
            </a>
            <span className="footer__contact-item">Bhopal, India</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p className="footer__copy">
          © {year} <strong>Rohit Kumar</strong>. All rights reserved.
        </p>
        <p className="footer__made">
          Made with ❤️ & ☕ in India
        </p>
      </div>
    </footer>
  );
};

export default Footer;