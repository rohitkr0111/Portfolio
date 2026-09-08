import { useEffect, useRef, useState } from 'react';
import './Experience.css';

const TIMELINE = [
  {
    type: 'education',
    icon: '🎓',
    title: 'B.Tech — Computer Science & Engineering',
    org: 'Oriental Institute of Science & Technology',
    location: 'Bhopal, India',
    period: '2023 — 2027',
    desc: 'Pursuing B.Tech CSE. Focused on full-stack development, competitive programming (400+ LeetCode), and shipping production-ready projects.',
    tags: ['CSE', 'Full-Stack', 'DSA', 'Batch of 2027'],
  },
  {
    type: 'achievement',
    icon: '🏆',
    title: 'Hackathon Finalist — 5+ Events',
    org: 'National Level Hackathons',
    location: 'Pan India',
    period: '2023 — Present',
    desc: 'Reached the finals of 5+ national hackathons among 1000+ participants. Built and shipped complete working projects within 24–48 hours under real pressure.',
    tags: ['Top Finalist', '1000+ participants', 'Shipped under 48h'],
  },
  {
    type: 'work',
    icon: '💼',
    title: 'Software Developer Intern',
    org: 'SustainableBhava',
    location: 'New Delhi, India',
    period: '2024',
    desc: 'Built a reusable React component library that cut development effort by ~30%. Worked on production-level frontend architecture with real users in the loop.',
    tags: ['React', 'JavaScript', 'Component Library', 'Frontend'],
  },
  {
    type: 'achievement',
    icon: '⚡',
    title: '400+ DSA Problems',
    org: 'LeetCode',
    location: 'Online',
    period: '2023 — Present',
    desc: 'Consistently solving data structures and algorithm problems. Strong in arrays, trees, graphs, and dynamic programming. Still going.',
    tags: ['LeetCode', 'DSA', 'Problem Solving'],
  },
];

const Experience = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="experience" ref={sectionRef} data-num="02">
      <div className="experience__bg-glow" aria-hidden="true" />

      <div className={`experience__inner ${visible ? 'experience__inner--visible' : ''}`}>
        <div className="section-title">
          <span className="section-pill">Journey</span>
          <h2>Experience & Education</h2>
          <p>The path so far — internship, college, hackathons, and a lot of debugging at 2am.</p>
        </div>

        <div className="experience__timeline">
          {/* Centre line */}
          <div className="experience__line" aria-hidden="true" />

          {TIMELINE.map((item, i) => (
            <div
              key={i}
              className={`experience__item experience__item--${i % 2 === 0 ? 'left' : 'right'} experience__item--${item.type}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Dot on the line */}
              <div className="experience__dot">
                <span className="experience__dot-icon">{item.icon}</span>
              </div>

              {/* Card */}
              <div className="experience__card">
                <div className="experience__card-header">
                  <span className="experience__period">{item.period}</span>
                  <span className={`experience__type-badge experience__type-badge--${item.type}`}>
                    {item.type === 'work' ? 'Internship' : item.type === 'education' ? 'Education' : 'Achievement'}
                  </span>
                </div>
                <h3 className="experience__title">{item.title}</h3>
                <p className="experience__org">
                  {item.org}
                  <span className="experience__location"> · {item.location}</span>
                </p>
                <p className="experience__desc">{item.desc}</p>
                <div className="experience__tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="experience__tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
