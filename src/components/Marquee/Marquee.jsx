import './Marquee.css';

const SKILLS = [
  { label: 'React',       icon: '⚛' },
  { label: 'Node.js',     icon: '🟢' },
  { label: 'MongoDB',     icon: '🍃' },
  { label: 'Express.js',  icon: '🚂' },
  { label: 'JavaScript',  icon: '⚡' },
  { label: 'TypeScript',  icon: '🔷' },
  { label: 'Next.js',     icon: '▲' },
  { label: 'Redux',       icon: '🔮' },
  { label: 'Tailwind CSS',icon: '🎨' },
  { label: 'REST APIs',   icon: '🔗' },
  { label: 'Git & GitHub',icon: '🐙' },
  { label: 'Figma',       icon: '✏️' },
];

/* Duplicate array so CSS seamless loop works */
const ROW = [...SKILLS, ...SKILLS];

const Marquee = () => (
  <div className="marquee-section" aria-hidden="true">
    <div className="marquee-track">
      <ul className="marquee-list marquee-list--fwd">
        {ROW.map((s, i) => (
          <li key={i} className="marquee-item">
            <span className="marquee-icon">{s.icon}</span>
            {s.label}
          </li>
        ))}
      </ul>
      <ul className="marquee-list marquee-list--rev">
        {ROW.map((s, i) => (
          <li key={i} className="marquee-item">
            <span className="marquee-icon">{s.icon}</span>
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Marquee;
