import { useEffect, useRef, useState } from 'react';
import certificates_data from '../../assets/certificates_data';
import './Certificates.css';

const Certificates = () => {
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
    <section id="certifications" className="certs" ref={sectionRef} data-num="06">
      <div className="certs__bg-glow" aria-hidden="true" />

      <div className={`certs__inner ${visible ? 'certs__inner--visible' : ''}`}>
        <div className="section-title">
          <span className="section-pill">Credentials</span>
          <h2>Licenses & Certificates</h2>
          <p>Tap any card to verify — these are real, not participation trophies.</p>
        </div>

        <div className="certs__grid">
          {certificates_data.map((cert, i) => {
            const isLink = cert.link && cert.link !== '#';
            const Tag = isLink ? 'a' : 'div';
            const linkProps = isLink
              ? { href: cert.link, target: '_blank', rel: 'noopener noreferrer' }
              : {};

            /* Initials fallback */
            const initials = cert.issuer
              .split(' ')
              .slice(0, 2)
              .map(w => w[0])
              .join('');

            return (
              <Tag
                key={cert.id}
                className="certs__card"
                style={{ transitionDelay: `${i * 80}ms` }}
                {...linkProps}
              >
                {/* Image or initials placeholder */}
                <div className="certs__img-wrap">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="certs__img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="certs__placeholder" style={{ '--cert-color': cert.color }}>
                      <span className="certs__initials">{initials}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="certs__content">
                  <h3 className="certs__title">{cert.title}</h3>
                  <p className="certs__issuer">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                    {cert.issuer}
                  </p>
                  <p className="certs__date">{cert.date}</p>

                  <div className="certs__tags">
                    {cert.tags.map(tag => (
                      <span key={tag} className="certs__tag">{tag}</span>
                    ))}
                  </div>

                  {isLink && (
                    <span className="certs__verify">
                      View Certificate ↗
                    </span>
                  )}
                </div>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
