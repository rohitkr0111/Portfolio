import { useEffect, useState } from 'react';
import './Loader.css';

const Loader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setProgress(count);
      if (count >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (typeof onFinish === 'function') onFinish();
        }, 400);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="loader">
      <div className="loader__content">
        <div className="loader__logo">RK</div>
        <div className="loader__progress-track">
          <div className="loader__progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="loader__pct">{progress}%</p>
        <p className="loader__label">Loading Portfolio</p>
      </div>
    </div>
  );
};

export default Loader;
