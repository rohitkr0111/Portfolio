import { useState, useRef, useEffect } from 'react';
import mail_icon from '../../assets/mail_icon.svg';
import location_icon from '../../assets/location_icon.svg';
import call_icon from '../../assets/call_icon.svg';
import './Contact.css';

const CONTACT_INFO = [
  { icon: mail_icon, label: 'Email', value: 'rohitkumarsingh1168@gmail.com', href: 'mailto:rohitkumarsingh1168@gmail.com' },
  { icon: call_icon, label: 'Phone', value: '+91 7004545342', href: 'tel:+917004545342' },
  { icon: location_icon, label: 'Location', value: 'Bhopal, India', href: null },
];

const Contact = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, success: true });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    formData.append('access_key', '65eb1b93-4407-4e67-894c-7a571215bc74');
    formData.append('subject', 'New Contact From Your Portfolio');
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        e.target.reset();
        setToast({ show: true, success: true });
      } else {
        setToast({ show: true, success: false });
      }
    } catch {
      setToast({ show: true, success: false });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setToast({ show: false, success: true }), 4000);
    }
  };

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact__bg-glow" aria-hidden="true" />

      {/* Toast notification */}
      <div className={`contact__toast ${toast.show ? 'contact__toast--visible' : ''} ${toast.success ? 'contact__toast--success' : 'contact__toast--error'}`}>
        {toast.success ? "✅ Message sent! I'll get back to you soon." : '❌ Something went wrong. Please try again.'}
      </div>

      <div className={`contact__inner ${visible ? 'contact__inner--visible' : ''}`}>
        <div className="section-title">
          <span className="section-pill">Contact</span>
          <h2>Get In Touch</h2>
          <p>Have a project in mind or just want to say hi? My inbox is always open.</p>
        </div>

        <div className="contact__grid">
          {/* Left: info */}
          <div className="contact__info-col">
            <div className="contact__info-card">
              <h3 className="contact__info-heading">Let's Talk</h3>
              <p className="contact__info-desc">
                I'm currently open to new opportunities and collaborations.
                Whether it's a freelance project, a full-time role, or just
                a technical conversation — let's connect!
              </p>
              <div className="contact__details">
                {CONTACT_INFO.map(({ icon, label, value, href }) => (
                  <div key={label} className="contact__detail">
                    <div className="contact__detail-icon">
                      <img src={icon} alt={label} />
                    </div>
                    <div className="contact__detail-text">
                      <span className="contact__detail-label">{label}</span>
                      {href ? (
                        <a href={href} className="contact__detail-value">{value}</a>
                      ) : (
                        <span className="contact__detail-value">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="contact__socials">
                <a href="https://www.linkedin.com/in/rohitkumarsingh0111/" target="_blank" rel="noopener noreferrer" className="contact__social-btn">
                  LinkedIn ↗
                </a>
                <a href="https://github.com/rohitkumarsingh0111" target="_blank" rel="noopener noreferrer" className="contact__social-btn">
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={onSubmit} className="contact__form">
            <div className="contact__form-group">
              <label htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="e.g. John Doe"
                required
              />
            </div>
            <div className="contact__form-group">
              <label htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="e.g. john@example.com"
                required
              />
            </div>
            <div className="contact__form-group">
              <label htmlFor="contact-message">Your Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                placeholder="Tell me about your project or idea..."
                required
              />
            </div>
            <input type="hidden" name="access_key" value="65eb1b93-4407-4e67-894c-7a571215bc74" />
            <button
              type="submit"
              className="contact__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <><span className="contact__spinner" />Sending...</>
              ) : (
                <>Send Message →</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;