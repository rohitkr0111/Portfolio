import { useEffect, useRef, useState, useCallback } from 'react';
import mywork_data from '../../assets/mywork_data';
import './Work.css';

const PROJECT_META = [
  {
    name: 'Snakkr',
    desc: 'AI-driven lesson-to-quiz platform with persistent user progress tracking',
    tags: ['HTML /CSS', 'JavaScript'],
  },
  {
    name: 'File Sharing System(CodeUrja)',
    desc: 'Real-time chat for 100+ concurrent users with JWT auth & Redux',
    tags: ['HTML /CSS', 'JavaScript'],
  },
  {
    name: 'AI Blog Platform',
    desc: 'Role-based MERN blogging platform with AI content generation',
    tags: ['React', 'Node.js', 'MongoDB', 'Gemini API'],
  },
  {
    name: 'ChatApp',
    desc: 'Full-stack social platform built with the MERN stack',
    tags: ['React', 'MERN', 'Express', 'MongoDB', 'Socket.io', 'JWT', 'TailwindCSS'],
  },
  {
    name: 'Space Science (Kids Learning WebApp',
    desc: 'Developer productivity platform with real-time collaboration',
    tags: ['React', 'TypeScript', 'Node.js', 'Gemini API'],
  },
  {
    name: 'Portfolio v2',
    desc: 'Award-style personal portfolio with dark/light theme & 3D effects',
    tags: ['React', 'CSS', 'Vite'],
  },
];

/* ─────────────────────────────────────────────────────────
   useTilt — 3-D perspective tilt + moving glare sheen
   ───────────────────────────────────────────────────────── */
const useTilt = () => {
  const cardRef  = useRef(null);
  const glareRef = useRef(null);
  const rafRef   = useRef(null);

  const onMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const { left, top, width, height } = card.getBoundingClientRect();

      // normalised -0.5 … 0.5
      const xN = (e.clientX - left) / width  - 0.5;
      const yN = (e.clientY - top)  / height - 0.5;

      // rotation — more dramatic angles
      const rotY =  xN * 22;
      const rotX = -yN * 16;

      // dynamic shadow that shifts opposite to tilt
      const shadowX = -xN * 20;
      const shadowY = -yN * 20;

      card.style.transform = `
        perspective(700px)
        rotateX(${rotX}deg)
        rotateY(${rotY}deg)
        scale3d(1.04, 1.04, 1.04)
      `;
      card.style.boxShadow = `
        ${shadowX}px ${shadowY + 20}px 60px rgba(0,0,0,0.5),
        0 0 40px rgba(139,92,246,0.15),
        inset 0 0 0 1px rgba(139,92,246,0.2)
      `;
      card.style.transition = 'transform 0.08s linear, box-shadow 0.08s linear';

      // glare — radial gradient that follows cursor
      if (glareRef.current) {
        const glareX = ((e.clientX - left) / width)  * 100;
        const glareY = ((e.clientY - top)  / height) * 100;
        glareRef.current.style.background = `
          radial-gradient(
            circle at ${glareX}% ${glareY}%,
            rgba(255,255,255,0.12) 0%,
            rgba(255,255,255,0.04) 35%,
            transparent 70%
          )
        `;
        glareRef.current.style.opacity = '1';
      }
    });
  }, []);

  const onLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const card = cardRef.current;
    if (!card) return;
    card.style.transform  = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    card.style.boxShadow  = '';
    card.style.transition = 'transform 0.7s cubic-bezier(0.23,1,0.32,1), box-shadow 0.7s ease';
    if (glareRef.current) glareRef.current.style.opacity = '0';
  }, []);

  return { cardRef, glareRef, onMove, onLeave };
};

/* ─────────────────────────────────────────────────────────
   WorkCard
   ───────────────────────────────────────────────────────── */
const WorkCard = ({ item, meta, index, visible }) => {
  const { cardRef, glareRef, onMove, onLeave } = useTilt();

  return (
    <a
      ref={cardRef}
      href={item.w_link}
      target="_blank"
      rel="noopener noreferrer"
      className={`work__card ${visible ? 'work__card--visible' : ''}`}
      style={{ transitionDelay: `${index * 90}ms` }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Glare layer — sits above image, below overlay */}
      <div ref={glareRef} className="work__card-glare" aria-hidden="true" />

      {/* Project number watermark */}
      <span className="work__card-num" aria-hidden="true">0{index + 1}</span>

      {/* Image */}
      <div className="work__card-img-wrap">
        <img
          src={item.w_img}
          alt={meta.name}
          className="work__card-img"
          loading="lazy"
        />
        <div className="work__card-overlay">
          <span className="work__card-visit">View Live ↗</span>
        </div>
      </div>

      {/* Footer — name + tags only, no year */}
      <div className="work__card-footer">
        <div className="work__card-info">
          <h3 className="work__card-name">{meta.name}</h3>
          <div className="work__card-tags">
            {meta.tags.map(tag => (
              <span key={tag} className="work__card-tag">{tag}</span>
            ))}
          </div>
        </div>
        <span className="work__card-arrow" aria-hidden="true">↗</span>
      </div>
    </a>
  );
};

/* ─────────────────────────────────────────────────────────
   Work section
   ───────────────────────────────────────────────────────── */
const Work = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" className="work" ref={sectionRef} data-num="03">
      <div className="work__bg-glow" aria-hidden="true" />

      <div className={`work__inner ${visible ? 'work__inner--visible' : ''}`}>
        <div className="section-title">
          <span className="section-pill">Portfolio</span>
          <h2>My Latest Work</h2>
          <p>A curated selection of projects that showcase my skills and creativity.</p>
        </div>

        <div className="work__grid">
          {mywork_data.map((item, index) => (
            <WorkCard
              key={item.w_no}
              item={item}
              meta={PROJECT_META[index] || { name: `Project ${item.w_no}`, tags: ['Web'] }}
              index={index}
              visible={visible}
            />
          ))}
        </div>

        <div className="work__cta">
          <a
            href="https://github.com/rohitkumarsingh0111"
            target="_blank"
            rel="noopener noreferrer"
            className="work__more-btn"
          >
            View All on GitHub
            <span className="work__more-icon">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Work;
