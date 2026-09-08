import { useEffect, useRef, useState } from 'react';
import './TechSkills.css';

/* ── Tech categories with devicons CDN icons ── */
const TECH_CATEGORIES = [
  {
    category: 'Frontend',
    emoji: '🖥️',
    techs: [
      { name: 'HTML5',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'React',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js',     icon: 'https://cdn.simpleicons.org/nextdotjs/e8d5b7' },
      { name: 'Tailwind',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    ],
  },
  {
    category: 'Backend',
    emoji: '⚙️',
    techs: [
      { name: 'Node.js',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js',  icon: 'https://cdn.simpleicons.org/express/e8d5b7' },
      { name: 'Socket.io',   icon: 'https://cdn.simpleicons.org/socketdotio/e8d5b7' },
      { name: 'REST APIs',   icon: 'https://cdn.simpleicons.org/openapiinitiative/e8d5b7' },
    ],
  },
  {
    category: 'Database',
    emoji: '🗄️',
    techs: [
      { name: 'MongoDB',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'PostgreSQL',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'Redis',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
    ],
  },
  {
    category: 'DevOps & Cloud',
    emoji: '☁️',
    techs: [
      { name: 'Git',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub',      icon: 'https://cdn.simpleicons.org/github/e8d5b7' },
      { name: 'Docker',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'AWS',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'Vercel',      icon: 'https://cdn.simpleicons.org/vercel/e8d5b7' },
      { name: 'Linux',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    ],
  },
  {
    category: 'AI & LLM',
    emoji: '🤖',
    techs: [
      { name: 'Gemini AI',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg' },
      { name: 'OpenAI',       icon: 'https://cdn.simpleicons.org/openai/e8d5b7' },
      { name: 'LangChain',    icon: 'https://cdn.simpleicons.org/langchain/e8d5b7' },
      { name: 'HuggingFace',  icon: 'https://cdn.simpleicons.org/huggingface/e8d5b7' },
      { name: 'TensorFlow',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'Ollama',       icon: 'https://cdn.simpleicons.org/ollama/e8d5b7' },
    ],
  },
  {
    category: 'Languages & Tools',
    emoji: '🛠️',
    techs: [
      { name: 'C++',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'Java',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'Python',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'VS Code',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Postman',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
      { name: 'Figma',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    ],
  },
];

const TechSkills = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const displayed = activeCategory
    ? TECH_CATEGORIES.filter(c => c.category === activeCategory)
    : TECH_CATEGORIES;

  return (
    <section id="skills" className="techskills" ref={sectionRef} data-num="03">
      {/* Background glow */}
      <div className="techskills__bg-glow" aria-hidden="true" />

      <div className={`techskills__inner ${visible ? 'techskills__inner--visible' : ''}`}>
        {/* Header */}
        <div className="section-title">
          <span className="section-pill">Tech Stack</span>
          <h2>My Technical Skills</h2>
          <p>Tools I've actually used in projects — not just things I watched a tutorial on.</p>
        </div>

        {/* Category filter tabs */}
        <div className="techskills__tabs">
          <button
            className={`techskills__tab ${activeCategory === null ? 'techskills__tab--active' : ''}`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {TECH_CATEGORIES.map(({ category, emoji }) => (
            <button
              key={category}
              className={`techskills__tab ${activeCategory === category ? 'techskills__tab--active' : ''}`}
              onClick={() => setActiveCategory(activeCategory === category ? null : category)}
            >
              {emoji} {category}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="techskills__categories">
          {displayed.map(({ category, emoji, techs }, catIdx) => (
            <div key={category} className="techskills__category" style={{ transitionDelay: `${catIdx * 80}ms` }}>
              <h3 className="techskills__category-title">
                <span className="techskills__category-emoji">{emoji}</span>
                {category}
              </h3>
              <div className="techskills__grid">
                {techs.map(({ name, icon }, i) => (
                  <div
                    key={name}
                    className="techskills__card"
                    style={{ transitionDelay: `${(catIdx * 80) + (i * 50)}ms` }}
                  >
                    <div className="techskills__icon-wrap">
                      <img
                        src={icon}
                        alt={name}
                        className="techskills__icon"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.querySelector('.techskills__icon-fallback').style.display = 'flex';
                        }}
                      />
                      <span className="techskills__icon-fallback" style={{ display: 'none' }}>
                        {name[0]}
                      </span>
                    </div>
                    <span className="techskills__name">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSkills;
