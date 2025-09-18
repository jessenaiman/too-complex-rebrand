import { useState, useCallback } from "react";
import { orchestrateRebrand, generateSingleAsset } from "../utils/rebrand-orchestrator";

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
      setTheme(rebrandData.theme);
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
        theme,
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