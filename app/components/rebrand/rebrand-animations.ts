// Animation variants for rebrand-page

export const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.3 } }
};

export const loadingVariants = {
  initial: { scale: 0 },
  animate: { 
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const navIconVariants = {
  hover: { 
    scale: 1.2,
    rotate: 180,
    transition: { duration: 0.3 }
  },
  tap: { 
    scale: 0.9,
    transition: { duration: 0.1 }
  }
};