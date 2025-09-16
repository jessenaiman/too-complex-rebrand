// Theme definition for rebrand feature

export type RebrandTheme = {
  name: string
  colors: {
    primary: string
    secondary: string
    background: string
    accent: string
    gradient: string
  }
  button: {
    background: string
    color: string
    border: string
    shadow: string
    hover: string
  }
  text: {
    color: string
    shadow?: string
    style?: React.CSSProperties
  }
}

export const rebrandThemes: RebrandTheme[] = [
  {
    name: "Sunset Pulse",
    colors: {
      primary: "#FF6B6B",
      secondary: "#FFD93D",
      background: "linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)",
      accent: "#6BCB77",
      gradient: "linear-gradient(90deg, #FF6B6B 0%, #FFD93D 100%)"
    },
    button: {
      background: "linear-gradient(90deg, #FF6B6B 0%, #FFD93D 100%)",
      color: "#fff",
      border: "2px solid #FFD93D",
      shadow: "0 2px 8px rgba(255,107,107,0.2)",
      hover: "linear-gradient(90deg, #FFD93D 0%, #FF6B6B 100%)"
    },
    text: {
      color: "#FF6B6B",
      shadow: "1px 1px 8px #FFD93D"
    }
  },
  {
    name: "Aurora Dream",
    colors: {
      primary: "#43C6AC",
      secondary: "#191654",
      background: "linear-gradient(135deg, #43C6AC 0%, #191654 100%)",
      accent: "#F8FFAE",
      gradient: "linear-gradient(90deg, #43C6AC 0%, #191654 100%)"
    },
    button: {
      background: "linear-gradient(90deg, #43C6AC 0%, #191654 100%)",
      color: "#fff",
      border: "2px solid #F8FFAE",
      shadow: "0 2px 8px rgba(67,198,172,0.2)",
      hover: "linear-gradient(90deg, #191654 0%, #43C6AC 100%)"
    },
    text: {
      color: "#43C6AC",
      shadow: "1px 1px 8px #191654"
    }
  },
  {
    name: "Neon Night",
    colors: {
      primary: "#00F2FE",
      secondary: "#4A00E0",
      background: "linear-gradient(135deg, #4A00E0 0%, #00F2FE 100%)",
      accent: "#F7971E",
      gradient: "linear-gradient(90deg, #4A00E0 0%, #00F2FE 100%)"
    },
    button: {
      background: "linear-gradient(90deg, #00F2FE 0%, #4A00E0 100%)",
      color: "#fff",
      border: "2px solid #F7971E",
      shadow: "0 2px 8px rgba(74,0,224,0.2)",
      hover: "linear-gradient(90deg, #F7971E 0%, #00F2FE 100%)"
    },
    text: {
      color: "#00F2FE",
      shadow: "1px 1px 8px #4A00E0"
    }
  },
  {
    name: "Minty Fresh",
    colors: {
      primary: "#3CA55C",
      secondary: "#B5AC49",
      background: "linear-gradient(135deg, #3CA55C 0%, #B5AC49 100%)",
      accent: "#FDEB71",
      gradient: "linear-gradient(90deg, #3CA55C 0%, #B5AC49 100%)"
    },
    button: {
      background: "linear-gradient(90deg, #3CA55C 0%, #B5AC49 100%)",
      color: "#fff",
      border: "2px solid #FDEB71",
      shadow: "0 2px 8px rgba(60,165,92,0.2)",
      hover: "linear-gradient(90deg, #B5AC49 0%, #3CA55C 100%)"
    },
    text: {
      color: "#3CA55C",
      shadow: "1px 1px 8px #B5AC49"
    }
  },
  {
    name: "Candy Pop",
    colors: {
      primary: "#FFB6C1",
      secondary: "#8EC5FC",
      background: "linear-gradient(135deg, #FFB6C1 0%, #8EC5FC 100%)",
      accent: "#F9F871",
      gradient: "linear-gradient(90deg, #FFB6C1 0%, #8EC5FC 100%)"
    },
    button: {
      background: "linear-gradient(90deg, #FFB6C1 0%, #8EC5FC 100%)",
      color: "#222",
      border: "2px solid #F9F871",
      shadow: "0 2px 8px rgba(255,182,193,0.2)",
      hover: "linear-gradient(90deg, #8EC5FC 0%, #FFB6C1 100%)"
    },
    text: {
      color: "#FFB6C1",
      shadow: "1px 1px 8px #8EC5FC"
    }
  }
]

// Utility to get a random theme
export function getRandomTheme(excludeThemeName?: string): RebrandTheme {
  const available = excludeThemeName
    ? rebrandThemes.filter(t => t.name !== excludeThemeName)
    : rebrandThemes
  const idx = Math.floor(Math.random() * available.length)
  return available[idx]
}

// React hook to use a random theme (optionally with previous theme exclusion)
import { useState } from "react"

export function useRandomRebrandTheme(initialThemeName?: string) {
  const [theme, setTheme] = useState<RebrandTheme>(() =>
    initialThemeName
      ? rebrandThemes.find(t => t.name === initialThemeName) || getRandomTheme()
      : getRandomTheme()
  )

  const randomizeTheme = () => {
    setTheme(prev =>
      getRandomTheme(prev?.name)
    )
  }

  return { theme, randomizeTheme }
}