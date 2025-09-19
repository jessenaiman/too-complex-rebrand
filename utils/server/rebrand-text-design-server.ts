// utils/server/rebrand-text-design-server.ts
// Server-side module for swapping text rendering components

import { readdirSync, statSync } from 'fs';
import { join } from 'path';

// Get all text components from the texts directory
const getTextComponents = () => {
  try {
    const textsDir = join(process.cwd(), 'components', 'animate-ui', 'primitives', 'texts');
    if (!statSync(textsDir).isDirectory()) {
      return [];
    }
    
    const files = readdirSync(textsDir);
    return files.filter(file => file.endsWith('.tsx') || file.endsWith('.jsx'));
  } catch (error) {
    console.error('Error reading texts directory:', error);
    return [];
  }
};

// Get a random text component
export const getRandomTextComponent = () => {
  const textComponents = getTextComponents();
  if (textComponents.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * textComponents.length);
  return textComponents[randomIndex];
};

export default {
  getRandomTextComponent
};