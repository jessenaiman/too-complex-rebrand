import { useState, useCallback } from "react";
import { orchestrateRebrand, generateSingleAsset } from "../utils/rebrand-orchestrator";
import { Theme } from "../utils/rebrand-theme";

/**
 * Convert Theme interface to the format expected by the hook
 */
function convertThemeToHookFormat(theme: Theme): {
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
} {
  // Map theme name to appropriate color palette based on theme name
  const colorPalettes: Record<string, {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
  }> = {
    "Ocean Breeze": {
      primary: "#0077BE",
      secondary: "#00A8CC",
      accent: "#40E0D0",
      background: "#E0F7FA",
      foreground: "#0D47A1",
      muted: "#B3E5FC",
      border: "#26C6DA"
    },
    "Sunset Glow": {
      primary: "#FF6F00",
      secondary: "#FF8F00",
      accent: "#FFC107",
      background: "#FFF8E1",
      foreground: "#E65100",
      muted: "#FFE082",
      border: "#FFCC02"
    },
    "Forest Mist": {
      primary: "#2E7D32",
      secondary: "#388E3C",
      accent: "#4CAF50",
      background: "#E8F5E8",
      foreground: "#1B5E20",
      muted: "#A5D6A7",
      border: "#66BB6A"
    },
    "Purple Haze": {
      primary: "#7B1FA2",
      secondary: "#8E24AA",
      accent: "#9C27B0",
      background: "#F3E5F5",
      foreground: "#4A148C",
      muted: "#CE93D8",
      border: "#AB47BC"
    },
    "Midnight Sky": {
      primary: "#1565C0",
      secondary: "#1976D2",
      accent: "#2196F3",
      background: "#E3F2FD",
      foreground: "#0D47A1",
      muted: "#90CAF9",
      border: "#42A5F5"
    }
  };

  return {
    name: theme.name,
    colors: colorPalettes[theme.name] || colorPalettes["Ocean Breeze"],
    fontFamily: "Inter, sans-serif",
    borderRadius: "0.5rem"
  };
}

type UseRebrandableResult = {
  isRebranded: boolean;
  isLoading: boolean;
  currentImage: string;
  logoImage: string;
  businessProfile: {
    name: string;
    tagline: string;
    description: string;
  };
  theme: {
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
  };
  triggerGlobalRebrand: () => Promise<void>;
  triggerLocalRebrand: (componentType: string) => Promise<void>;
};

export function useRebrandable(): UseRebrandableResult {
  const [isRebranded, setIsRebranded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [logoImage, setLogoImage] = useState("");
  const [businessProfile, setBusinessProfile] = useState({
    name: "Nimbus Analytics",
    tagline: "See Beyond the Numbers",
    description: "Nimbus Analytics empowers small businesses with real-time, AI-driven insights to make smarter decisions and grow faster."
  });
  const [theme, setTheme] = useState({
    name: "Sunrise",
    colors: {
      primary: "#FFB300",
      secondary: "#FF7043",
      accent: "#29B6F6",
      background: "#FFF8E1",
      foreground: "#212121",
      muted: "#FFE082",
      border: "#FFD54F"
    },
    fontFamily: "Inter, sans-serif",
    borderRadius: "0.5rem"
  });

  const triggerGlobalRebrand = useCallback(async () => {
    setIsLoading(true);

    try {
      // Use the orchestrator to follow the theme → content → assets sequence
      const rebrandData = await orchestrateRebrand();

      // Update state with the new data
      setTheme(convertThemeToHookFormat(rebrandData.theme));
      setBusinessProfile(rebrandData.businessProfile);
      setCurrentImage(rebrandData.assets.backgroundImage);
      setLogoImage(rebrandData.assets.logoImage);

      setIsRebranded(prev => !prev);
    } catch (error) {
      console.error("Error during global rebrand:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const triggerLocalRebrand = useCallback(async (componentType: string) => {
    setIsLoading(true);

    try {
      // Generate a single asset based on the current theme and content
      const assetUrl = await generateSingleAsset(
        componentType as 'background' | 'logo',
        convertThemeToHookFormat(theme), // Convert theme to orchestrator format
        businessProfile
      );

      if (componentType === "logo") {
        setLogoImage(assetUrl);
      } else if (componentType === "background") {
        setCurrentImage(assetUrl);
      }
    } catch (error) {
      console.error("Error during local rebrand:", error);
    } finally {
      setIsLoading(false);
    }
  }, [theme, businessProfile]);

  return {
    isRebranded,
    isLoading,
    currentImage,
    logoImage,
    businessProfile,
    theme,
    triggerGlobalRebrand,
    triggerLocalRebrand,
  };
}