'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { orchestrateRebrand } from '../../utils/rebrand-orchestrator';

interface BusinessProfile {
  name: string;
  tagline: string;
  description: string;
}

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

interface RebrandContextType {
  isRebranded: boolean;
  isLoading: boolean;
  triggerGlobalRebrand: () => Promise<void>;
  currentImage: string;
  logoImage: string;
  businessProfile: BusinessProfile;
  theme: Theme;
}

const RebrandContext = createContext<RebrandContextType | undefined>(undefined);

export function RebrandProvider({ children }: { children: ReactNode }) {
  const [isRebranded, setIsRebranded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [logoImage, setLogoImage] = useState("");
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({
    name: "Nimbus Analytics",
    tagline: "See Beyond the Numbers",
    description: "Nimbus Analytics empowers small businesses with real-time, AI-driven insights to make smarter decisions and grow faster."
  });
  const [theme, setTheme] = useState<Theme>({
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

  const triggerGlobalRebrand = async () => {
    setIsLoading(true);
    
    try {
      // Use the orchestrator to follow the theme → content → assets sequence
      const rebrandData = await orchestrateRebrand();
      
      // Update state with the new data
      setTheme(rebrandData.theme);
      setBusinessProfile(rebrandData.businessProfile);
      setCurrentImage(rebrandData.assets.backgroundImage);
      setLogoImage(rebrandData.assets.logoImage);
      
      setIsRebranded(!isRebranded);
    } catch (error) {
      console.error("Error during global rebrand:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RebrandContext.Provider
      value={{
        isRebranded,
        isLoading,
        triggerGlobalRebrand,
        currentImage,
        logoImage,
        businessProfile,
        theme
      }}
    >
      {children}
    </RebrandContext.Provider>
  );
}

export function useRebrand() {
  const context = useContext(RebrandContext);
  if (context === undefined) {
    throw new Error('useRebrand must be used within a RebrandProvider');
  }
  return context;
}