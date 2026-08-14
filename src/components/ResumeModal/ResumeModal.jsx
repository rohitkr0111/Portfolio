import { useEffect, useRef, useCallback } from 'react';
import './ResumeModal.css';

const ResumeModal = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const iframeRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Close on backdrop click
  const handleOverlayClick = useCallback((e) => {
    if (e.target === overlayRef.current) onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="resume-modal__overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Resume Viewer"
    >
      <div className="resume-modal">
        {/* Header toolbar */}
        <div className="resume-modal__toolbar">
          <div className="resume-modal__toolbar-left">
            <div className="resume-modal__icon">📄</div>
            <div>
              <h2 className="resume-modal__title">Rohit Kumar — Resume</h2>
              <p className="resume-modal__subtitle">Full-Stack Developer · MERN Stack</p>
            </div>
          </div>

          <div className="resume-modal__toolbar-right">
            <a
              href="/Rohit_Kumar.pdf"
              download="Rohit_Kumar_Resume.pdf"
              className="resume-modal__btn resume-modal__btn--download"
              title="Download PDF"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download
            </a>

            <a
              href="/Rohit_Kumar.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-modal__btn resume-modal__btn--open"
              title="Open in new tab"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              New Tab
            </a>

            <button
              className="resume-modal__close"
              onClick={onClose}
              aria-label="Close resume viewer"
              title="Close (Esc)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="resume-modal__viewer">
          <iframe
            ref={iframeRef}
            src="/Rohit_Kumar.pdf#toolbar=1&navpanes=0&scrollbar=1&view=FitH"
            className="resume-modal__iframe"
            title="Rohit Kumar Resume"
            loading="lazy"
          />

          {/* Fallback for browsers that block inline PDFs */}
          <noscript>
            <div className="resume-modal__fallback">
              <p>Your browser doesn't support inline PDF viewing.</p>
              <a href="/Rohit_Kumar.pdf" download className="resume-modal__btn resume-modal__btn--download">
                Download Resume Instead
              </a>
            </div>
          </noscript>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
