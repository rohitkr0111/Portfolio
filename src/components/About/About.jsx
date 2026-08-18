import { useEffect, useRef, useState } from 'react';
import profile_img from '../../assets/prop124.png';
import './About.css';

const SKILLS = [
  { name: 'React.js / Next.js',   pct: 92, color: '#61dafb' },
  { name: 'JavaScript / TypeScript', pct: 88, color: '#f7df1e' },
  { name: 'Node.js / Express.js',  pct: 82, color: '#68a063' },
  { name: 'MongoDB / MySQL',       pct: 78, color: '#47a248' },
  { name: 'Socket.io / REST APIs', pct: 80, color: '#8b5cf6' },
  { name: 'Git / Docker / AWS',    pct: 75, color: '#f05032' },
];

const STATS = [
  { value: 15, suffix: '+', label: 'Projects Shipped' },
  { value: 400, suffix: '+', label: 'DSA Problems Solved' },
  { value: 5,  suffix: '+', label: 'Hackathon Finalist' },
];

const TECH = [
  '⚛️ React', '▲ Next.js', '⚡ JavaScript', '🔷 TypeScript',
  '🟢 Node.js', '🍃 MongoDB', '🗄️ MySQL', '🔗 Socket.io',
  '🐙 GitHub', '☁️ AWS EC2', '🐳 Docker', '🚀 Vercel',
];

const useCountUp = (target, started) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 40);
    return () => clearInterval(timer);
  }, [started, target]);
  return count;
};

const StatCard = ({ stat, started }) => {
  const count = useCountUp(stat.value, started);
  return (
    <div className="about__stat-card">
      <h3 className="about__stat-value">{count}{stat.suffix}</h3>
      <p className="about__stat-label">{stat.label}</p>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef} data-num="01">
      {/* Background gradient */}
      <div className="about__bg-glow" aria-hidden="true" />

      <div className={`about__inner ${visible ? 'about__inner--visible' : ''}`}>
        {/* Section header */}
        <div className="section-title">
          <span className="section-pill">About Me</span>
          <h2>Who I Am</h2>
          <p>A passionate Full-Stack Developer turning ideas into elegant digital experiences.</p>
        </div>

        {/* Main content grid */}
        <div className="about__grid">
          {/* Image column */}
          <div className="about__image-col">
            <div className="about__image-frame">
              <img src={profile_img} alt="Rohit Kumar" className="about__photo" />
              <div className="about__image-decoration" aria-hidden="true" />
            </div>

            {/* Tech stack pills */}
            <div className="about__tech-grid">
              {TECH.map((t) => (
                <span key={t} className="about__tech-pill">{t}</span>
              ))}
            </div>
          </div>

          {/* Content column */}
          <div className="about__content-col">
            <div className="about__bio">
              <p>
                I'm a <strong>Full-Stack Developer</strong> from Bhopal, India, and a
                <strong> B.Tech CSE student</strong> at Oriental Institute Of Science &amp; Technology (2023–2027).
                I recently interned as a <strong>Software Developer at SustainableBhava, New Delhi</strong>,
                where I built reusable React components that reduced development effort by 30%.
              </p>
              <p>
                I specialise in the <strong>MERN stack</strong> — building real-time apps, AI-powered platforms,
                and scalable REST APIs. I've solved <strong>400+ DSA problems</strong> on LeetCode
                and reached the finals of <strong>5+ national hackathons</strong> among 1000+ participants.
              </p>
            </div>

            {/* Skill bars */}
            <div className="about__skills">
              {SKILLS.map((skill, i) => (
                <div key={skill.name} className="about__skill-row">
                  <div className="about__skill-header">
                    <span className="about__skill-name">{skill.name}</span>
                    <span className="about__skill-pct">{visible ? skill.pct : 0}%</span>
                  </div>
                  <div className="about__skill-track">
                    <div
                      className="about__skill-bar"
                      style={{
                        width: visible ? `${skill.pct}%` : '0%',
                        background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                        boxShadow: `0 0 12px ${skill.color}55`,
                        transitionDelay: `${i * 100}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="/Rohit_Kumar.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="about__resume-btn"
            >
              Download Resume ↗
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="about__stats">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} started={visible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
