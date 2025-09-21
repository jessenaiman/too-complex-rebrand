// utils/rebrand-text-design.ts
// Module for swapping text rendering components with theme-coordinated animations

// Define the type for theme colors
interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
}

// Define animation types
type TextAnimationType = 'gradient' | 'highlight' | 'morphing' | 'rolling' | 'rotating' | 'shimmering' | 'splitting' | 'typing';

// Predefined animation sets for each theme
const themeAnimationSets: Record<string, TextAnimationType[]> = {
  'Ocean Breeze': ['gradient', 'shimmering', 'morphing', 'rolling'],
  'Sunset Glow': ['gradient', 'highlight', 'shimmering', 'rotating'],
  'Forest Mist': ['morphing', 'rolling', 'splitting', 'typing'],
  'Purple Haze': ['gradient', 'shimmering', 'morphing', 'splitting'],
  'Midnight Sky': ['gradient', 'highlight', 'shimmering', 'typing']
};

// Theme-specific color coordination mappings
const themeColorMappings: Record<string, Record<string, string>> = {
  'Ocean Breeze': {
    primary: 'oklch(0.6 0.15 240)', // Cool blue
    secondary: 'oklch(0.8 0.1 240)', // Lighter blue
    accent: 'oklch(0.7 0.15 180)'   // Teal accent
  },
  'Sunset Glow': {
    primary: 'oklch(0.7 0.2 30)',    // Warm orange
    secondary: 'oklch(0.8 0.15 30)', // Lighter orange
    accent: 'oklch(0.7 0.2 10)'     // Deep red accent
  },
  'Forest Mist': {
    primary: 'oklch(0.6 0.15 140)', // Forest green
    secondary: 'oklch(0.7 0.1 140)', // Lighter green
    accent: 'oklch(0.7 0.2 120)'    // Bright green accent
  },
  'Purple Haze': {
    primary: 'oklch(0.6 0.2 300)',   // Purple
    secondary: 'oklch(0.7 0.15 300)', // Lighter purple
    accent: 'oklch(0.6 0.2 280)'    // Deep purple accent
  },
  'Midnight Sky': {
    primary: 'oklch(0.5 0.15 280)',   // Deep blue
    secondary: 'oklch(0.6 0.1 280)',  // Medium blue
    accent: 'oklch(0.6 0.15 260)'    // Indigo accent
  }
};

// Get random animation from theme-specific set
function getRandomAnimationForTheme(themeName: string): TextAnimationType {
  const animations = themeAnimationSets[themeName] || ['gradient', 'shimmering', 'morphing'];
  return animations[Math.floor(Math.random() * animations.length)];
}

// Apply professional and elegant theme-coordinated animations
export const applyTextAnimation = (element: HTMLElement, themeColors: ThemeColors, themeName: string = 'Ocean Breeze') => {
  // Clear any existing animation classes
  element.className = element.className.replace(/animate-\w+/g, '');
  
  // Get random animation for this theme
  const animationType = getRandomAnimationForTheme(themeName);
  
  // Get theme-specific colors
  const themeColorsMap = themeColorMappings[themeName] || themeColorMappings['Ocean Breeze'];
  
  // Apply base transition with smooth easing
  element.style.transition = 'all 600ms cubic-bezier(0.4, 0, 0.2, 1)';
  
  // Apply animation-specific styling with professional effects
  switch (animationType) {
    case 'gradient':
      // Create elegant gradient animation with theme colors
      const gradient = `linear-gradient(90deg, ${themeColorsMap.primary} 0%, ${themeColorsMap.secondary} 50%, ${themeColorsMap.accent} 100%)`;
      element.style.background = gradient;
      element.style.webkitBackgroundClip = 'text';
      element.style.backgroundClip = 'text';
      element.style.color = 'transparent';
      element.style.backgroundSize = '200% 100%';
      // Add smooth gradient animation
      element.style.animation = 'gradient-shift 3s ease-in-out infinite alternate';
      // Add keyframes for gradient animation
      const gradientKeyframes = `
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `;
      // Inject keyframes if not already present
      if (!document.getElementById('gradient-keyframes')) {
        const style = document.createElement('style');
        style.id = 'gradient-keyframes';
        style.textContent = gradientKeyframes;
        document.head.appendChild(style);
      }
      break;
      
    case 'shimmering':
      // Apply elegant shimmering effect with theme colors
      element.style.color = themeColorsMap.primary;
      element.style.position = 'relative';
      // Add shimmer overlay
      element.style.setProperty('--shimmer-color', themeColorsMap.accent);
      element.style.setProperty('--base-color', themeColorsMap.primary);
      element.style.animation = 'shimmer-pulse 2s ease-in-out infinite';
      // Add keyframes for shimmer animation
      const shimmerKeyframes = `
        @keyframes shimmer-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `;
      // Inject keyframes if not already present
      if (!document.getElementById('shimmer-keyframes')) {
        const style = document.createElement('style');
        style.id = 'shimmer-keyframes';
        style.textContent = shimmerKeyframes;
        document.head.appendChild(style);
      }
      break;
      
    case 'highlight':
      // Apply elegant highlight effect with theme colors
      element.style.color = themeColorsMap.primary;
      element.style.position = 'relative';
      element.style.background = `linear-gradient(to right, ${themeColorsMap.accent}30, transparent 70%)`;
      element.style.backgroundSize = '0% 100%';
      element.style.backgroundRepeat = 'no-repeat';
      element.style.animation = 'highlight-sweep 1.5s ease-in-out forwards';
      // Add keyframes for highlight animation
      const highlightKeyframes = `
        @keyframes highlight-sweep {
          0% { background-size: 0% 100%; background-position: left; }
          100% { background-size: 100% 100%; background-position: right; }
        }
      `;
      // Inject keyframes if not already present
      if (!document.getElementById('highlight-keyframes')) {
        const style = document.createElement('style');
        style.id = 'highlight-keyframes';
        style.textContent = highlightKeyframes;
        document.head.appendChild(style);
      }
      break;
      
    case 'morphing':
      // Apply elegant morphing effect with theme colors
      element.style.color = themeColorsMap.secondary;
      element.style.animation = 'morph-pulse 2.5s ease-in-out infinite';
      // Add keyframes for morphing animation
      const morphKeyframes = `
        @keyframes morph-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `;
      // Inject keyframes if not already present
      if (!document.getElementById('morph-keyframes')) {
        const style = document.createElement('style');
        style.id = 'morph-keyframes';
        style.textContent = morphKeyframes;
        document.head.appendChild(style);
      }
      break;
      
    case 'rolling':
      // Apply elegant rolling effect with theme colors
      element.style.color = themeColorsMap.accent;
      element.style.animation = 'roll-in 1s cubic-bezier(0.22, 0.61, 0.36, 1) forwards';
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px) rotate(5deg)';
      // Add keyframes for rolling animation
      const rollKeyframes = `
        @keyframes roll-in {
          0% { opacity: 0; transform: translateY(20px) rotate(5deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0); }
        }
      `;
      // Inject keyframes if not already present
      if (!document.getElementById('roll-keyframes')) {
        const style = document.createElement('style');
        style.id = 'roll-keyframes';
        style.textContent = rollKeyframes;
        document.head.appendChild(style);
      }
      break;
      
    case 'rotating':
      // Apply elegant rotating effect with theme colors
      element.style.color = themeColorsMap.primary;
      element.style.animation = 'rotate-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
      element.style.opacity = '0';
      element.style.transform = 'rotate(-10deg) scale(0.8)';
      // Add keyframes for rotating animation
      const rotateKeyframes = `
        @keyframes rotate-in {
          0% { opacity: 0; transform: rotate(-10deg) scale(0.8); }
          100% { opacity: 1; transform: rotate(0) scale(1); }
        }
      `;
      // Inject keyframes if not already present
      if (!document.getElementById('rotate-keyframes')) {
        const style = document.createElement('style');
        style.id = 'rotate-keyframes';
        style.textContent = rotateKeyframes;
        document.head.appendChild(style);
      }
      break;
      
    case 'splitting':
      // Apply elegant splitting effect with theme colors
      element.style.color = themeColorsMap.secondary;
      element.style.animation = 'split-reveal 1.2s ease-out forwards';
      element.style.opacity = '0';
      element.style.clipPath = 'inset(0 100% 0 0)';
      // Add keyframes for splitting animation
      const splitKeyframes = `
        @keyframes split-reveal {
          0% { opacity: 0; clip-path: inset(0 100% 0 0); }
          50% { opacity: 1; clip-path: inset(0 0 0 0); }
          100% { opacity: 1; clip-path: inset(0 0 0 0); }
        }
      `;
      // Inject keyframes if not already present
      if (!document.getElementById('split-keyframes')) {
        const style = document.createElement('style');
        style.id = 'split-keyframes';
        style.textContent = splitKeyframes;
        document.head.appendChild(style);
      }
      break;
      
    case 'typing':
      // Apply elegant typing effect with theme colors
      element.style.color = themeColorsMap.accent;
      element.style.animation = 'type-reveal 1.8s steps(20, end) forwards';
      element.style.opacity = '0';
      element.style.width = '0';
      element.style.overflow = 'hidden';
      element.style.whiteSpace = 'nowrap';
      // Add keyframes for typing animation
      const typeKeyframes = `
        @keyframes type-reveal {
          0% { opacity: 0; width: 0; }
          20% { opacity: 1; width: 0; }
          100% { opacity: 1; width: 100%; }
        }
      `;
      // Inject keyframes if not already present
      if (!document.getElementById('type-keyframes')) {
        const style = document.createElement('style');
        style.id = 'type-keyframes';
        style.textContent = typeKeyframes;
        document.head.appendChild(style);
      }
      break;
      
    default:
      // Fallback to simple fade animation
      element.style.color = themeColorsMap.primary;
      element.style.animation = 'fade-in 0.6s ease-out forwards';
      element.style.opacity = '0';
      // Add keyframes for fade animation
      const fadeKeyframes = `
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `;
      // Inject keyframes if not already present
      if (!document.getElementById('fade-keyframes')) {
        const style = document.createElement('style');
        style.id = 'fade-keyframes';
        style.textContent = fadeKeyframes;
        document.head.appendChild(style);
      }
  }
};

const rebrandTextDesign = {
  applyTextAnimation
};

export default rebrandTextDesign;