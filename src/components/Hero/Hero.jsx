import { useEffect, useRef, useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import profile_img from '../../assets/prop122.png';
import './Hero.css';

const ROLES = [
  'Full-Stack Developer',
  'MERN Stack Engineer',
  'React Enthusiast',
  'UI/UX Craftsman',
];

/* Floating skill bubbles — label, size, start pos, drift speed */
const SKILL_BUBBLES = [
  { label: 'React',       size: 'lg', x: 8,  y: 18, dur: 14, delay: 0   },
  { label: 'Node.js',     size: 'md', x: 82, y: 12, dur: 17, delay: 2   },
  { label: 'MongoDB',     size: 'sm', x: 70, y: 65, dur: 12, delay: 1   },
  { label: 'Express',     size: 'sm', x: 15, y: 72, dur: 19, delay: 3   },
  { label: 'JavaScript',  size: 'lg', x: 88, y: 40, dur: 15, delay: 0.5 },
  { label: 'TypeScript',  size: 'sm', x: 5,  y: 45, dur: 20, delay: 2.5 },
  { label: 'Git',         size: 'sm', x: 60, y: 85, dur: 13, delay: 1.5 },
  { label: 'REST API',    size: 'md', x: 35, y: 8,  dur: 16, delay: 0.8 },
  { label: 'Tailwind',    size: 'sm', x: 92, y: 78, dur: 18, delay: 3.5 },
  { label: 'Next.js',     size: 'md', x: 22, y: 90, dur: 11, delay: 2.2 },
  { label: 'Redux',       size: 'sm', x: 75, y: 28, dur: 22, delay: 1.2 },
  { label: 'HTML & CSS',  size: 'sm', x: 48, y: 92, dur: 16, delay: 4   },
];

const Hero = ({ onOpenResume }) => {
  const canvasRef  = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting,  setDeleting]  = useState(false);
  const [visible,   setVisible]   = useState(false);

  /* entrance */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* typewriter */
  useEffect(() => {
    const full = ROLES[roleIndex];
    let timeout;
    if (!deleting && displayed.length < full.length)
      timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 70);
    else if (!deleting && displayed.length === full.length)
      timeout = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && displayed.length > 0)
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
    else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex(p => (p + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  /* particle canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x     = Math.random() * canvas.width;
        this.y     = Math.random() * canvas.height;
        this.r     = Math.random() * 1.4 + 0.3;
        this.vx    = (Math.random() - 0.5) * 0.25;
        this.vy    = (Math.random() - 0.5) * 0.25;
        this.alpha = Math.random() * 0.4 + 0.08;
        this.color = Math.random() > 0.5
          ? `rgba(139,92,246,${this.alpha})`
          : `rgba(6,182,212,${this.alpha})`;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height)
          this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 100 }, () => new Particle());

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139,92,246,${0.1 * (1 - d / 90)})`;
            ctx.lineWidth   = 0.4;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="home" className="hero">
      {/* particle canvas */}
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />

      {/* ambient glow orbs */}
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />

      {/* ── Floating skill bubbles ── */}
      <div className="hero__bubbles" aria-hidden="true">
        {SKILL_BUBBLES.map((b, i) => (
          <span
            key={i}
            className={`hero__bubble hero__bubble--${b.size}`}
            style={{
              left:            `${b.x}%`,
              top:             `${b.y}%`,
              animationDuration:`${b.dur}s`,
              animationDelay:  `${b.delay}s`,
            }}
          >
            {b.label}
          </span>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className={`hero__content ${visible ? 'hero__content--visible' : ''}`}>

        {/* Profile — clean, no ring, no border background */}
        <div className="hero__avatar-wrap">
          <img src={profile_img} alt="Rohit Kumar" className="hero__avatar" />
          <div className="hero__avatar-shadow" aria-hidden="true" />
        </div>

        {/* availability badge */}
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Available for work
        </div>

        {/* name */}
        <h1 className="hero__name">
          Hi, I'm{' '}
          <span className="hero__name-gradient">Rohit Kumar</span>
        </h1>

        {/* typewriter */}
        <div className="hero__role-wrap">
          <span className="hero__role">{displayed}</span>
          <span className="hero__cursor" aria-hidden="true">|</span>
        </div>

        {/* tagline */}
        <p className="hero__tagline">
          Crafting high-performance web experiences with the MERN stack.
          <br />
          Based in <strong>India</strong> · 15+ projects shipped · 10+ hackathon wins
        </p>

        {/* tech badges */}
        <div className="hero__tech-badges">
          {['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript'].map(t => (
            <span key={t} className="hero__tech-badge">{t}</span>
          ))}
        </div>

        {/* CTAs */}
        <div className="hero__actions">
          <AnchorLink href="#contact" offset={70} className="hero__btn hero__btn--primary">
            Let's Connect →
          </AnchorLink>
          <button onClick={onOpenResume} className="hero__btn hero__btn--secondary">
            View Resume ↗
          </button>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="hero__scroll-hint" aria-label="Scroll down">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
