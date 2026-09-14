import { useEffect, useRef, useState } from 'react';
import profile_img from '../../assets/prop124.png';
import './About.css';

const LEETCODE_USERNAME = 'rohitsinghrajput0111';
const LC_CACHE_KEY = 'lc_stats_v1';

const useLeetCode = () => {
  const cached = (() => { try { return JSON.parse(sessionStorage.getItem(LC_CACHE_KEY)); } catch { return null; } })();

  const [data,    setData]    = useState(cached ?? null);
  const [loading, setLoading] = useState(!cached); /* skip loading if cache hit */

  useEffect(() => {
    if (cached) return; /* already have data — no fetch needed */
    const ctrl = new AbortController();
    const tid  = setTimeout(() => ctrl.abort(), 8000);

    fetch(`https://leetcode-api-faisalshohag.vercel.app/${LEETCODE_USERNAME}`, { signal: ctrl.signal })
      .then(r => r.json())
      .then(j => {
        const fresh = {
          total:  j.totalSolved  ?? 532,
          easy:   j.easySolved   ?? 156,
          medium: j.mediumSolved ?? 266,
          hard:   j.hardSolved   ?? 110,
        };
        setData(fresh);
        try { sessionStorage.setItem(LC_CACHE_KEY, JSON.stringify(fresh)); } catch {}
      })
      .catch(() => {
        /* API failed — show accurate static fallback */
        setData({ total: 532, easy: 156, medium: 266, hard: 110 });
      })
      .finally(() => { clearTimeout(tid); setLoading(false); });

    return () => { clearTimeout(tid); ctrl.abort(); };
  }, []); // eslint-disable-line

  return { data, loading };
};

const LEVELS = [
  { label: 'Easy',   key: 'easy',   color: '#68d391', bg: 'rgba(104,211,145,0.08)', border: 'rgba(104,211,145,0.25)' },
  { label: 'Medium', key: 'medium', color: '#f6ad55', bg: 'rgba(246,173,85,0.08)',  border: 'rgba(246,173,85,0.25)'  },
  { label: 'Hard',   key: 'hard',   color: '#fc8181', bg: 'rgba(252,129,129,0.08)', border: 'rgba(252,129,129,0.25)' },
];

/* ── Skeleton shown only on first-ever visit while API fetches ── */
const LCSkeleton = () => (
  <div className="about__lc-skeleton-card">
    {/* Big number placeholder */}
    <div className="about__lc-sk-total" />
    <div className="about__lc-sk-divider" />
    {/* Three pill placeholders */}
    <div className="about__lc-sk-pills">
      <div className="about__lc-sk-pill" />
      <div className="about__lc-sk-pill" />
      <div className="about__lc-sk-pill" />
    </div>
  </div>
);

const LeetCodeStats = () => {
  const { data, loading } = useLeetCode();

  return (
    <div className="about__github">
      <h3 className="about__github-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
        </svg>
        LeetCode Stats
      </h3>

      {loading ? <LCSkeleton /> : (
        <a href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`} target="_blank" rel="noopener noreferrer" className="about__lc-card">
          <div className="about__lc-content">
            <div className="about__lc-top-row">
              <div className="about__lc-total">
                <span className="about__lc-total-num">{data.total}</span>
                <span className="about__lc-total-label">Solved</span>
              </div>
              <div className="about__lc-divider" />
              <div className="about__lc-breakdown">
                {LEVELS.map(({ label, key, color, bg, border }) => (
                  <div key={key} className="about__lc-level" style={{ '--lc-color': color, '--lc-bg': bg, '--lc-border': border }}>
                    <span className="about__lc-level-count">{data[key]}</span>
                    <span className="about__lc-level-label">{label}</span>
                  </div>
                ))}
              </div>
              <span className="about__lc-verify">View Profile ↗</span>
            </div>
          </div>
        </a>
      )}
    </div>
  );
};

const STATS = [
  { value: 15,  suffix: '+', label: 'Projects Shipped' },
  { value: 530, suffix: '+', label: 'DSA on LeetCode' },
  { value: 5,   suffix: '+', label: 'Hackathon Finals' },
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
          <p>4th-year CS student, MERN developer, occasional hackathon finalist.</p>
        </div>

        {/* Main content grid */}
        <div className="about__grid">
          {/* Image column */}
          <div className="about__image-col">
            <div className="about__image-frame">
              <img src={profile_img} alt="Rohit Kumar" className="about__photo" />
              <div className="about__image-decoration" aria-hidden="true" />
            </div>
          </div>

          {/* Content column */}
          <div className="about__content-col">
            <div className="about__bio">
              <p>
                Hey, I'm <strong>Rohit</strong> — a <strong>B.Tech CSE student</strong> from Bhopal
                (Oriental Institute of Science &amp; Technology, batch of 2027).
                I got into web dev properly in my first year, broke everything,
                then gradually figured it out.
              </p>
              <p>
                I interned at <strong>SustainableBhava, New Delhi</strong> as a Software Developer,
                where I shipped reusable React components that genuinely cut dev time by ~30%
                — a number that surprised even me when we measured it.
              </p>
              <p>
                My go-to stack is <strong>MERN</strong>, but lately I've been deep into
                AI integrations — Gemini API shows up in 3 of my last 4 projects.
                Outside of coding, I'm either grinding LeetCode (400+ problems and counting)
                or debugging something at 2am for a hackathon I probably shouldn't have signed up for.
              </p>
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

        {/* GitHub Activity */}
        <div className="about__github">
          <h3 className="about__github-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub Activity
          </h3>

          {/* Contribution heatmap — gold tinted to match theme */}
          <a
            href="https://github.com/rohitkr0111"
            target="_blank"
            rel="noopener noreferrer"
            className="about__github-graph-link"
            title="View GitHub profile"
          >
            <img
              src="https://ghchart.rshah.org/c9a96e/rohitkr0111"
              alt="Rohit Kumar's GitHub contribution graph"
              className="about__github-graph"
              loading="lazy"
            />
          </a>

          {/* Stats cards row */}
          
        </div>

        <LeetCodeStats />
      </div>
    </section>
  );
};

export default About;
