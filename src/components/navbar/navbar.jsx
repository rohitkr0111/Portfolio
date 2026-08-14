import { useState, useEffect, useRef } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import logo from '../../assets/logopic.png';
import './navbar.css';

const NAV_ITEMS = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work',     label: 'Portfolio' },
  { id: 'contact',  label: 'Contact' },
];

const Navbar = ({ onOpenResume }) => {
  const [active,     setActive]     = useState('home');
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);

  /* ── scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── active section via IntersectionObserver ── */
  useEffect(() => {
    const sections = NAV_ITEMS
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ── close mobile menu on outside click ── */
  useEffect(() => {
    const handle = (e) => {
      if (mobileOpen && menuRef.current && !menuRef.current.contains(e.target))
        setMobileOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [mobileOpen]);

  /* ── body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--top'}`}>

        {/* ── Brand ── */}
        <a href="#home" className="navbar__brand">
          <div className="navbar__monogram">
            <span>RK</span>
            <div className="navbar__monogram-glow" aria-hidden="true" />
          </div>
          <div className="navbar__brand-text">
            <span className="navbar__brand-name">Rohit Kumar</span>
            <span className="navbar__brand-role">Full-Stack Developer</span>
          </div>
        </a>

        {/* ── Desktop nav links ── */}
        <ul className="navbar__links">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id} className={`navbar__item ${active === id ? 'navbar__item--active' : ''}`}>
              <AnchorLink
                className="navbar__link"
                offset={70}
                href={`#${id}`}
                onClick={() => setActive(id)}
              >
                {label}
              </AnchorLink>
              <span className={`navbar__dot ${active === id ? 'navbar__dot--active' : ''}`} />
            </li>
          ))}
        </ul>

        {/* ── Right action buttons ── */}
        <div className="navbar__actions">
          <button className="navbar__resume-btn" onClick={onOpenResume}>
            Resume ↗
          </button>
          <AnchorLink className="navbar__cta" offset={70} href="#contact">
            <span className="navbar__cta-icon">✉</span>
            Hire Me
          </AnchorLink>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── Mobile backdrop ── */}
      <div
        className={`mobile-overlay ${mobileOpen ? 'mobile-overlay--open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile drawer ── */}
      <aside ref={menuRef} className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}>

        {/* drawer header */}
        <div className="mobile-menu__header">
          <div className="mobile-menu__brand">
            <img src={logo} alt="Rohit Kumar" className="mobile-menu__logo" />
            <div>
              <p className="mobile-menu__name">Rohit Kumar</p>
              <p className="mobile-menu__role">Full-Stack Developer</p>
            </div>
          </div>
          <button className="mobile-menu__close" onClick={() => setMobileOpen(false)} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* nav items */}
        <ul className="mobile-menu__links">
          {NAV_ITEMS.map(({ id, label }, i) => (
            <li
              key={id}
              className="mobile-menu__item"
              style={{ transitionDelay: mobileOpen ? `${i * 55}ms` : '0ms' }}
            >
              <AnchorLink
                href={`#${id}`}
                offset={70}
                className={`mobile-menu__link ${active === id ? 'mobile-menu__link--active' : ''}`}
                onClick={() => { setActive(id); setMobileOpen(false); }}
              >
                <span className="mobile-menu__num">0{i + 1}</span>
                {label}
                {active === id && <span className="mobile-menu__active-dot" />}
              </AnchorLink>
            </li>
          ))}
        </ul>

        {/* drawer footer */}
        <div className="mobile-menu__footer">
          <button className="mobile-menu__resume" onClick={() => { onOpenResume(); setMobileOpen(false); }}>
            View Resume ↗
          </button>
          <AnchorLink
            className="mobile-menu__cta"
            offset={70}
            href="#contact"
            onClick={() => setMobileOpen(false)}
          >
            Hire Me →
          </AnchorLink>
        </div>
      </aside>
    </>
  );
};

export default Navbar;