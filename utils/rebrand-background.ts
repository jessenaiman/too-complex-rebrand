// utils/rebrand-background.ts
// Module for swapping background components

import { readdirSync, statSync } from 'fs';
import { join } from 'path';

// Get all background components from the backgrounds directory
const getBackgroundComponents = () => {
  try {
    const backgroundsDir = join(process.cwd(), 'components', 'backgrounds');
    if (!statSync(backgroundsDir).isDirectory()) {
      return [];
    }
    
    const files = readdirSync(backgroundsDir);
    return files.filter(file => file.endsWith('.tsx') || file.endsWith('.jsx'));
  } catch (error) {
    console.error('Error reading backgrounds directory:', error);
    return [];
  }
};

// Get a random background component
export const getRandomBackground = () => {
  const backgrounds = getBackgroundComponents();
  if (backgrounds.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  return backgrounds[randomIndex];
};

// Apply subtle entrance animation
export const applyBackgroundAnimation = (element: HTMLElement) => {
  // Apply opacity transition
  element.style.opacity = '0';
  element.style.transition = 'opacity 300ms ease-in-out';
  
  // Trigger reflow
  void element.offsetHeight;
  
  // Animate in
  element.style.opacity = '1';
};

export default {
  getRandomBackground,
  applyBackgroundAnimation
};