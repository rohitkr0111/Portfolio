import './Marquee.css';

/* Real SVG icons from devicons / simpleicons CDN — same source as TechSkills */
const SKILLS = [
  { label: 'React',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { label: 'Node.js',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { label: 'MongoDB',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { label: 'JavaScript',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { label: 'TypeScript',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { label: 'Next.js',      icon: 'https://cdn.simpleicons.org/nextdotjs/e8d5b7' },
  { label: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { label: 'Express.js',   icon: 'https://cdn.simpleicons.org/express/e8d5b7' },
  { label: 'Git',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { label: 'Docker',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { label: 'Python',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { label: 'Figma',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { label: 'Gemini AI',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg' },
  { label: 'MySQL',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
];

/* Duplicate for seamless CSS loop */
const ROW = [...SKILLS, ...SKILLS];

const Marquee = () => (
  <div className="marquee-section" aria-hidden="true">
    <div className="marquee-track">
      {/* Row 1 — scrolls forward */}
      <ul className="marquee-list marquee-list--fwd">
        {ROW.map((s, i) => (
          <li key={i} className="marquee-item">
            <img
              src={s.icon}
              alt={s.label}
              className="marquee-icon-img"
              loading="lazy"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            {s.label}
          </li>
        ))}
      </ul>
      {/* Row 2 — scrolls reverse */}
      <ul className="marquee-list marquee-list--rev">
        {ROW.map((s, i) => (
          <li key={i} className="marquee-item">
            <img
              src={s.icon}
              alt={s.label}
              className="marquee-icon-img"
              loading="lazy"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Marquee;
