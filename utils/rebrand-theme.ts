// utils/rebrand-theme.ts
// Simple theme utility for the rebranding demo

export interface Theme {
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

// Predefined themes
const themes: Theme[] = [
  {
    name: "Ocean Breeze",
    colors: {
      primary: "from-blue-500 to-cyan-600",
      secondary: "from-blue-400 to-cyan-600",
      accent: "from-teal-400 to-emerald-500",
      background: "from-gray-900 via-slate-800 to-blue-900",
      foreground: "text-blue-300",
      muted: "text-blue-500",
      border: "rgba(59, 130, 246, 0.5)"
    },
    fontFamily: "font-sans",
    borderRadius: "rounded-xl"
  },
  {
    name: "Sunset Glow",
    colors: {
      primary: "from-orange-500 to-pink-600",
      secondary: "from-orange-400 to-pink-600",
      accent: "from-amber-400 to-rose-500",
      background: "from-gray-900 via-orange-900 to-rose-900",
      foreground: "text-orange-300",
      muted: "text-orange-500",
      border: "rgba(249, 115, 22, 0.5)"
    },
    fontFamily: "font-sans",
    borderRadius: "rounded-xl"
  },
  {
    name: "Forest Mist",
    colors: {
      primary: "from-green-500 to-emerald-600",
      secondary: "from-green-400 to-emerald-600",
      accent: "from-lime-400 to-green-500",
      background: "from-gray-900 via-emerald-900 to-green-900",
      foreground: "text-green-300",
      muted: "text-green-500",
      border: "rgba(16, 185, 129, 0.5)"
    },
    fontFamily: "font-sans",
    borderRadius: "rounded-xl"
  },
  {
    name: "Purple Haze",
    colors: {
      primary: "from-purple-500 to-fuchsia-600",
      secondary: "from-purple-400 to-fuchsia-600",
      accent: "from-violet-400 to-purple-500",
      background: "from-gray-900 via-purple-900 to-fuchsia-900",
      foreground: "text-purple-300",
      muted: "text-purple-500",
      border: "rgba(168, 85, 247, 0.5)"
    },
    fontFamily: "font-sans",
    borderRadius: "rounded-xl"
  },
  {
    name: "Midnight Sky",
    colors: {
      primary: "from-indigo-500 to-violet-600",
      secondary: "from-indigo-400 to-violet-600",
      accent: "from-blue-400 to-indigo-500",
      background: "from-gray-900 via-indigo-900 to-violet-900",
      foreground: "text-indigo-300",
      muted: "text-indigo-500",
      border: "rgba(99, 102, 241, 0.5)"
    },
    fontFamily: "font-sans",
    borderRadius: "rounded-xl"
  }
];

/**
 * Returns a random theme from the predefined themes
 * @returns A random theme object
 */
export function getRandomTheme(): Theme {
  const randomIndex = Math.floor(Math.random() * themes.length);
  return themes[randomIndex];
}