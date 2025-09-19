// utils/rebrand-button.ts
// Module for swapping button components

// Apply theme-coordinated styling to button
export const applyButtonTheme = (element: HTMLElement, themeColors: any) => {
  // Apply theme colors if available
  if (themeColors?.primary) {
    // Extract color values from theme
    if (themeColors.primary.includes('from-') && themeColors.primary.includes('to-')) {
      // Handle gradient colors
      const fromColor = themeColors.primary.split(' ')[1].replace('from-', '');
      const toColor = themeColors.primary.split(' ')[3].replace('to-', '');
      element.style.background = `linear-gradient(to right, ${fromColor}, ${toColor})`;
    } else {
      // Handle solid colors
      element.style.background = themeColors.primary;
    }
    
    // Apply text color for better contrast
    element.style.color = 'white';
 }
  
  // Maintain accessible focus states
  element.setAttribute('tabindex', '0');
  element.setAttribute('role', 'button');
  element.setAttribute('aria-label', 'Rebrandable button');
  
  // Add focus styles
  element.addEventListener('focus', () => {
    element.style.outline = '2px solid #007bff';
    element.style.outlineOffset = '2px';
  });
  
  element.addEventListener('blur', () => {
    element.style.outline = 'none';
  });
};

export default {
  applyButtonTheme
};