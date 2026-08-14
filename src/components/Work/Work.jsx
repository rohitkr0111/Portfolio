import { useEffect, useRef, useState } from 'react';
import mywork_data from '../../assets/mywork_data';
import './Work.css';

const PROJECT_TAGS = [
  ['React', 'MERN'],
  ['React', 'Full-Stack'],
  ['Next.js', 'Blog'],
  ['React', 'WebSockets'],
  ['React', 'NASA API'],
  ['Web Design'],
];

const Work = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" className="work" ref={sectionRef}>
      <div className="work__bg-glow" aria-hidden="true" />

      <div className={`work__inner ${visible ? 'work__inner--visible' : ''}`}>
        <div className="section-title">
          <span className="section-pill">Portfolio</span>
          <h2>My Latest Work</h2>
          <p>A curated selection of projects that showcase my skills and creativity.</p>
        </div>

        <div className="work__grid">
          {mywork_data.map((item, index) => (
            <a
              key={item.w_no}
              href={item.w_link}
              target="_blank"
              rel="noopener noreferrer"
              className="work__card"
              style={{ transitionDelay: `${index * 80}ms` }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div className="work__card-img-wrap">
                <img
                  src={item.w_img}
                  alt={item.w_name}
                  className="work__card-img"
                />

                {/* Hover overlay */}
                <div className={`work__card-overlay ${hovered === index ? 'work__card-overlay--active' : ''}`}>
                  <div className="work__card-overlay-content">
                    <span className="work__card-visit">View Live ↗</span>
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div className="work__card-footer">
                <div className="work__card-info">
                  <h3 className="work__card-name">Project {item.w_no}</h3>
                  <div className="work__card-tags">
                    {(PROJECT_TAGS[index] || ['Web']).map((tag) => (
                      <span key={tag} className="work__card-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="work__card-arrow">↗</span>
              </div>
            </a>
          ))}
        </div>

        {/* Show more */}
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
