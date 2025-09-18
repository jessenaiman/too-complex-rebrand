// app/themes/rebrand-theme.ts
import { theme1 } from "./theme-1";
import { theme2 } from "./theme-2";
import { theme3 } from "./theme-3";
import { theme4 } from "./theme-4";
import { theme5 } from "./theme-5";

// Define the theme structure
interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
  };
  fontFamily: string;
  borderRadius: string;
}

// Array of all available themes
const themes: Theme[] = [
  theme1,
  theme2,
  theme3,
  theme4,
  theme5
];

// Additional themes for more variety
const additionalThemes: Theme[] = [
  {
    name: "Ocean Breeze",
    colors: {
      primary: "#0077be",
      secondary: "#00a8cc",
      accent: "#5ce1e6",
      background: "#e0f7fa",
      foreground: "#012030",
      muted: "#b2ebf2",
      border: "#80deea"
    },
    fontFamily: "Roboto, sans-serif",
    borderRadius: "0.75rem"
  },
  {
    name: "Sunset Glow",
    colors: {
      primary: "#ff6b35",
      secondary: "#f7931e",
      accent: "#ffd23f",
      background: "#fff9e5",
      foreground: "#1a1a1a",
      muted: "#ffeaa7",
      border: "#ffd166"
    },
    fontFamily: "Montserrat, sans-serif",
    borderRadius: "0.5rem"
  },
  {
    name: "Forest Whisper",
    colors: {
      primary: "#2d5016",
      secondary: "#618c56",
      accent: "#a3c1ad",
      background: "#f0f7f4",
      foreground: "#001a00",
      muted: "#c1d8c3",
      border: "#95b8a5"
    },
    fontFamily: "Lato, sans-serif",
    borderRadius: "1rem"
  }
];

/**
 * Returns a random theme from the available themes.
 */
export function getRandomTheme(): Theme {
  const allThemes = [...themes, ...additionalThemes];
  const idx = Math.floor(Math.random() * allThemes.length);
  return allThemes[idx];
}

/**
 * Adjusts the hue and intensity of a hex color.
 * @param hexColor - The hex color to adjust (e.g., "#FF0000")
 * @param hueShift - Amount to shift hue (-180 to 180 degrees)
 * @param intensityFactor - Factor to adjust intensity (0.5 = 50% darker, 1.5 = 50% lighter)
 * @returns The adjusted hex color
 */
function adjustColor(hexColor: string, hueShift: number = 0, intensityFactor: number = 1): string {
  // Remove # if present
  let hex = hexColor.replace("#", "");
  
  // Expand 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex.split("").map(char => char + char).join("");
  }
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Convert RGB to HSL
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  
  let h = 0, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
      case gNorm: h = (bNorm - rNorm) / d + 2; break;
      case bNorm: h = (rNorm - gNorm) / d + 4; break;
    }
    
    h = h / 6;
  }
  
  // Apply hue shift
  h = (h * 360 + hueShift) % 360;
  if (h < 0) h += 360;
  
  // Apply intensity adjustment
  l = Math.min(1, Math.max(0, l * intensityFactor));
  
  // Convert HSL back to RGB
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  
  const rNew = hue2rgb(p, q, (h / 360 + 1/3));
  const gNew = hue2rgb(p, q, h / 360);
  const bNew = hue2rgb(p, q, (h / 360 - 1/3));
  
  // Convert RGB back to hex
  const toHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  
  return `#${toHex(rNew)}${toHex(gNew)}${toHex(bNew)}`;
}

/**
 * Returns a random theme with randomized hues and intensity within the color palette.
 */
export function getRandomizedTheme(): Theme {
  const baseTheme = getRandomTheme();
  
  // Create a deep copy of the theme to avoid modifying the original
  const randomizedTheme: Theme = JSON.parse(JSON.stringify(baseTheme));
  
  // Randomize hues and intensity for each color
  const hueShift = (Math.random() * 60) - 30; // -30 to 30 degrees
  const intensityFactor = 0.8 + (Math.random() * 0.4); // 0.8 to 1.2
  
  Object.keys(randomizedTheme.colors).forEach(colorKey => {
    const key = colorKey as keyof Theme["colors"];
    randomizedTheme.colors[key] = adjustColor(
      randomizedTheme.colors[key],
      hueShift,
      intensityFactor
    );
  });
  
  return randomizedTheme;
}