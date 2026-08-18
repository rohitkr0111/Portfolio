import { useEffect, useRef, useState } from 'react';
import Services_Data from '../../assets/services_data';
import './Services.css';

const SERVICE_ICONS = ['🌐', '🎨', '⚙️', '🔗', '✨'];

const Services = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="services" ref={sectionRef} data-num="02">
      <div className="services__bg-glow" aria-hidden="true" />

      <div className={`services__inner ${visible ? 'services__inner--visible' : ''}`}>
        <div className="section-title">
          <span className="section-pill">What I Do</span>
          <h2>My Services</h2>
          <p>End-to-end solutions from concept to deployment — built to perform and scale.</p>
        </div>

        <div className="services__grid">
          {Services_Data.map((service, index) => (
            <div
              key={service.s_no}
              className="service-card"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Watermark number */}
              <span className="service-card__watermark">{service.s_no}</span>

              <div className="service-card__icon">{SERVICE_ICONS[index] || '💡'}</div>

              <h3 className="service-card__title">{service.s_name}</h3>
              <p className="service-card__desc">{service.s_desc}</p>

              <div className="service-card__footer">
                <span className="service-card__arrow">→</span>
              </div>

              {/* Gradient border overlay */}
              <div className="service-card__border" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;