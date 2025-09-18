// app/utils/rebrand-orchestrator.ts
// Service that orchestrates the theme → content → assets sequence for rebranding

import { getRandomTheme } from "../themes/rebrand-theme";
import { getRandomBusinessProfile, BusinessProfile } from "./rebrand-content";
import { generatePollinationsImageAsync } from "./rebrand-ai";

// Define the theme structure to match the one in rebrand-theme.ts
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

// Define types for our rebrand data
export interface RebrandData {
  theme: Theme;
  businessProfile: BusinessProfile;
  assets: {
    backgroundImage: string;
    logoImage: string;
  };
}

/**
 * Orchestrates the rebranding process following the sequence:
 * 1. Select theme
 * 2. Select content
 * 3. Generate assets
 *
 * @returns Promise that resolves to the complete rebrand data
 */
export async function orchestrateRebrand(): Promise<RebrandData> {
  // Step 1: Select theme
  const theme = getRandomTheme();
  
  // Step 2: Select content
  const businessProfile = getRandomBusinessProfile();
  
  // Step 3: Generate assets sequentially
  try {
    // Generate background image first
    const backgroundPrompt = `Modern ${theme.name} themed background with ${businessProfile.description}, professional, high quality, 4k`;
    const backgroundImage = await generatePollinationsImageAsync(backgroundPrompt);
    
    // Generate logo image second
    const logoPrompt = `${businessProfile.name} logo with ${theme.name} color scheme, minimalist, professional, vector style`;
    const logoImage = await generatePollinationsImageAsync(logoPrompt, { isLogo: true });
    
    return {
      theme,
      businessProfile,
      assets: {
        backgroundImage,
        logoImage
      }
    };
 } catch (error) {
    console.error("Error during asset generation:", error);
    throw error;
  }
}

/**
 * Generates a single asset based on the current theme and content
 *
 * @param assetType Type of asset to generate ('background' | 'logo')
 * @param currentTheme Current theme data
 * @param currentContent Current business profile data
 * @returns Promise that resolves to the asset URL
 */
export async function generateSingleAsset(
  assetType: 'background' | 'logo',
  currentTheme: Theme,
  currentContent: BusinessProfile
): Promise<string> {
  try {
    if (assetType === 'background') {
      const prompt = `Modern ${currentTheme.name} themed background with ${currentContent.description}, professional, high quality, 4k`;
      return await generatePollinationsImageAsync(prompt);
    } else {
      const prompt = `${currentContent.name} logo with ${currentTheme.name} color scheme, minimalist, professional, vector style`;
      return await generatePollinationsImageAsync(prompt, { isLogo: true });
    }
  } catch (error) {
    console.error(`Error generating ${assetType} asset:`, error);
    throw error;
  }
}