// utils/rebrand-text-design.ts
// Module for swapping text rendering components

// Apply theme-coordinated animations
export const applyTextAnimation = (element: HTMLElement, themeColors: any) => {
  // Apply animation with theme colors
  element.style.transition = 'all 500ms ease-in-out';
  
  // Add a simple animation effect
  element.classList.add('animate-in', 'fade-in', 'duration-500');
  
  // Apply theme colors if available
  if (themeColors?.primary) {
    // Extract color values from theme
    const primaryColor = themeColors.primary.split(' ')[1] || themeColors.primary;
    
    // Apply theme-coordinated styles
    element.style.color = primaryColor.replace('from-', '').replace('-500', '');
    
    // Add gradient if applicable
    if (themeColors.primary.includes('from-') && themeColors.primary.includes('to-')) {
      const fromColor = themeColors.primary.split(' ')[1].replace('from-', '');
      const toColor = themeColors.primary.split(' ')[3].replace('to-', '');
      element.style.background = `linear-gradient(to right, ${fromColor}, ${toColor})`;
      element.style.webkitBackgroundClip = 'text';
      element.style.backgroundClip = 'text';
      element.style.color = 'transparent';
    }
  }
};

export default {
  applyTextAnimation
};