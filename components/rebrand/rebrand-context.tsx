'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { orchestrateRebrand } from '../../utils/rebrand-orchestrator';
import { Theme, getRandomTheme, applyThemeCssClass } from '../../utils/rebrand-theme';
import { getCookie, setCookie } from 'cookies-next';

interface BusinessProfile {
  name: string;
  tagline: string;
  description: string;
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
  const [theme, setTheme] = useState<Theme>(getRandomTheme());

  // Initialize theme from cookies or get a random theme
  useEffect(() => {
    const savedThemeName = getCookie('rebrand-theme-name');
    if (savedThemeName) {
      // In a real implementation, we would get the theme by name
      // For now, we'll just get a random theme
      const newTheme = getRandomTheme();
      setTheme(newTheme);
      applyThemeCssClass(newTheme);
    } else {
      const newTheme = getRandomTheme();
      setTheme(newTheme);
      applyThemeCssClass(newTheme);
    }
  }, []);

  // Update theme CSS class when theme changes
  useEffect(() => {
    applyThemeCssClass(theme);
  }, [theme]);

  // Update cookies when theme changes
  useEffect(() => {
    setCookie('rebrand-theme-name', theme.name, { 
      maxAge: 60 * 24 * 365, // 1 year
      sameSite: true,
      path: '/'
    });
  }, [theme]);

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