// utils/rebrand-theme.ts
// Theme utility for the rebranding system

export interface Theme {
  name: string;
  className: string;
  mood: string;
  feeling: string;
  description: string;
}

// Predefined themes with metadata
const themes: Theme[] = [
  {
    name: "Ocean Breeze",
    className: "ocean-breeze",
    mood: "calm",
    feeling: "refreshing",
    description: "A clean, refreshing theme with cool blue tones that evoke a sense of calm and clarity"
  },
  {
    name: "Sunset Glow",
    className: "sunset-glow",
    mood: "warm",
    feeling: "inviting",
    description: "A warm, inviting theme with vibrant oranges and pinks that create a welcoming atmosphere"
  },
  {
    name: "Forest Mist",
    className: "forest-mist",
    mood: "natural",
    feeling: "grounded",
    description: "An earthy, grounded theme with greens and browns that bring a sense of nature and stability"
  },
  {
    name: "Purple Haze",
    className: "purple-haze",
    mood: "creative",
    feeling: "mysterious",
    description: "A creative, mysterious theme with purples and violets that inspire imagination and innovation"
  },
  {
    name: "Midnight Sky",
    className: "midnight-sky",
    mood: "sophisticated",
    feeling: "elegant",
    description: "A sophisticated, elegant theme with deep blues and indigos that convey professionalism and depth"
  }
];

// Track used themes to ensure we don't repeat until all are used
let usedThemes: string[] = [];

/**
 * Returns a random theme from the predefined themes that hasn't been used recently
 * @returns A random theme object
 */
export function getRandomTheme(): Theme {
  // If all themes have been used, reset the used themes array
  if (usedThemes.length >= themes.length) {
    usedThemes = [];
  }
  
  // Filter out used themes
  const availableThemes = themes.filter(theme => !usedThemes.includes(theme.name));
  
  // If no themes are available (shouldn't happen), use all themes
  const selectionPool = availableThemes.length > 0 ? availableThemes : themes;
  
  // Select a random theme from the available pool
  const randomIndex = Math.floor(Math.random() * selectionPool.length);
  const selectedTheme = selectionPool[randomIndex];
  
  // Add the selected theme to the used themes array
  usedThemes.push(selectedTheme.name);
  
  return selectedTheme;
}

/**
 * Apply theme CSS class to the document
 * @param theme The theme to apply
 */
export function applyThemeCssClass(theme: Theme) {
  const root = document.documentElement;
  
  // Remove any existing theme classes
  root.classList.remove(
    "ocean-breeze", 
    "sunset-glow", 
    "forest-mist", 
    "purple-haze", 
    "midnight-sky"
  );
  
  // Add the theme class
  root.classList.add(theme.className);
}