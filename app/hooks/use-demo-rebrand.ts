// app/hooks/use-demo-rebrand.ts
// Hook that encapsulates the rebranding logic for the demo page

import { useState, useCallback, useEffect } from "react";
import { orchestrateRebrand, RebrandData } from "@/utils/rebrand-orchestrator";
import { generatePollinationsImage } from "@/utils/pollinations-image";

interface ThemeColors {
  primary: string;
  secondary: string;
  text: string;
  border: string;
  background: string;
}

export function useDemoRebrand() {
  const [isRebranded, setIsRebranded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [themeColors, setThemeColors] = useState<ThemeColors>({
    primary: 'from-blue-500 to-cyan-600',
    secondary: 'from-blue-400 to-cyan-600',
    text: 'text-blue-300',
    border: 'rgba(59, 130, 246, 0.5)',
    background: 'from-gray-900 via-slate-800 to-blue-900'
  });

  // Load initial images
  useEffect(() => {
    const init = async () => {
      console.log("Initializing demo rebrand hook");
      setIsLoading(true);
      
      // Generate initial images
      const logoUrl = generatePollinationsImage("minimalist letter R logo with blue gradient, modern tech aesthetic", { isLogo: true });
      const heroUrl = generatePollinationsImage("futuristic digital garden with glowing blue elements, cyberpunk aesthetic, high detail, 8k");
      
      console.log("Generated URLs - Logo:", logoUrl, "Hero:", heroUrl);
      
      // Load logo
      const loadLogo = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          console.log("Logo loaded successfully");
          setLogoImage(logoUrl);
          resolve(true);
        };
        img.onerror = (error) => {
          console.error("Error loading logo:", error, "URL:", logoUrl);
          setLogoImage(""); // Set empty if fails
          resolve(false);
        };
        img.src = logoUrl;
      });
      
      // Load hero image
      const loadHero = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          console.log("Hero image loaded successfully");
          setCurrentImage(heroUrl);
          resolve(true);
        };
        img.onerror = (error) => {
          console.error("Error loading hero image:", error, "URL:", heroUrl);
          setCurrentImage(""); // Set empty if fails
          resolve(false);
        };
        img.src = heroUrl;
      });
      
      await Promise.all([loadLogo, loadHero]);
      console.log("Finished loading images, setting isLoading to false");
      setIsLoading(false);
    };
    
    init();
  }, []);

  const handleRebrand = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      // Use the orchestrator to handle the complete rebranding process
      const rebrandData: RebrandData = await orchestrateRebrand();
      
      // Update state with new data
      setLogoImage(rebrandData.assets.logoImage);
      setCurrentImage(rebrandData.assets.backgroundImage);
      setIsRebranded(!isRebranded);
      
    } catch (error) {
      console.error('Error during rebrand:', error);
      // Still toggle the state even if there are errors
      setIsRebranded(!isRebranded);
    } finally {
      setIsLoading(false);
    }
  }, [isRebranded, isLoading]);

  return {
    isRebranded,
    isLoading,
    currentImage,
    logoImage,
    themeColors,
    handleRebrand
  };
}