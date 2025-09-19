// utils/server/rebrand-button-server.ts
// Server-side module for swapping button components

import { readdirSync, statSync } from 'fs';
import { join } from 'path';

// Get all button components from the buttons directory
const getButtonComponents = () => {
  try {
    const buttonsDir = join(process.cwd(), 'components', 'buttons');
    if (!statSync(buttonsDir).isDirectory()) {
      return [];
    }
    
    const files = readdirSync(buttonsDir);
    return files.filter(file => file.endsWith('.tsx') || file.endsWith('.jsx'));
  } catch (error) {
    console.error('Error reading buttons directory:', error);
    return [];
  }
};

// Get a random button component
export const getRandomButtonComponent = () => {
  const buttonComponents = getButtonComponents();
  if (buttonComponents.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * buttonComponents.length);
  return buttonComponents[randomIndex];
};

export default {
  getRandomButtonComponent
};