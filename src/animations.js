export const fadeInUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } }
};

export const slideInLeft = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

export const slideInRight = {
  hidden:  { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } }
};

export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px 2px rgba(141,46,79,0.4)',
      '0 0 30px 6px rgba(141,46,79,0.7)',
      '0 0 20px 2px rgba(141,46,79,0.4)'
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
  }
};

export const modalOverlay = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } }
};

export const modalContent = {
  hidden:  { opacity: 0, scale: 0.94, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } },
  exit:    { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.2 } }
};

export const drawerSlide = {
  hidden:  { x: '100%', opacity: 0 },
  visible: { x: '0%', opacity: 1, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { x: '100%', opacity: 0, transition: { duration: 0.25 } }
};

export const chipSlideIn = {
  hidden:  { opacity: 0, x: -12, scale: 0.9 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 25 } },
  exit:    { opacity: 0, scale: 0.85, transition: { duration: 0.15 } }
};
