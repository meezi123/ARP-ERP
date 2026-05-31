import { useState, useEffect, useRef } from 'react';

const useCountUp = (target, duration = 1200) => {
  const [value, setValue] = useState(0);
  const startTime = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (target === null || target === undefined) return;
    const numTarget = parseFloat(target) || 0;
    startTime.current = null;

    const step = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(numTarget * eased);
      if (progress < 1) animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [target, duration]);

  return value;
};

export default useCountUp;
