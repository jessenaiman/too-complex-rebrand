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
      
      // Generate initial images with better error handling
      const logoUrl = generatePollinationsImage("minimalist letter R logo with blue gradient, modern tech aesthetic", { isLogo: true });
      const heroUrl = generatePollinationsImage("futuristic digital garden with glowing blue elements, cyberpunk aesthetic, high detail, 8k");
      
      console.log("Generated URLs - Logo:", logoUrl, "Hero:", heroUrl);
      
      // Load logo with better error handling
      const loadLogo = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          console.log("Logo loaded successfully");
          setLogoImage(logoUrl);
          resolve(true);
        };
        img.onerror = (error) => {
          console.error("Error loading logo:", error, "URL:", logoUrl);
          // Try to set the URL anyway - sometimes the image loads even if there's an error
          setLogoImage(logoUrl);
          setTimeout(() => {
            // Try again after a short delay
            const retryImg = new Image();
            retryImg.onload = () => {
              console.log("Logo retry loaded successfully");
              setLogoImage(logoUrl);
            };
            retryImg.onerror = () => {
              console.error("Logo retry also failed");
              // Set a simple fallback
              setLogoImage(null);
            };
            retryImg.src = logoUrl;
          }, 1000);
          resolve(false);
        };
        img.src = logoUrl;
      });
      
      // Load hero image with better error handling
      const loadHero = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          console.log("Hero image loaded successfully");
          setCurrentImage(heroUrl);
          resolve(true);
        };
        img.onerror = (error) => {
          console.error("Error loading hero image:", error, "URL:", heroUrl);
          // Try to set the URL anyway - sometimes the image loads even if there's an error
          setCurrentImage(heroUrl);
          setTimeout(() => {
            // Try again after a short delay
            const retryImg = new Image();
            retryImg.onload = () => {
              console.log("Hero retry loaded successfully");
              setCurrentImage(heroUrl);
            };
            retryImg.onerror = () => {
              console.error("Hero retry also failed");
              // Set a simple fallback
              setCurrentImage(null);
            };
            retryImg.src = heroUrl;
          }, 1000);
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
      // Always set to true since we want to keep the button as "Rebrand"
      setIsRebranded(true);
      
    } catch (error) {
      console.error('Error during rebrand:', error);
      // Keep the state as true since we want to keep the button as "Rebrand"
      setIsRebranded(true);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return {
    isRebranded,
    isLoading,
    currentImage,
    logoImage,
    themeColors,
    handleRebrand
  };
}