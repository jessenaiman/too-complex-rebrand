// app/utils/rebrand-orchestrator.ts
// Service that orchestrates the theme → content → assets sequence for rebranding

import { getRandomTheme, Theme, getThemeMetadata } from "@/utils/rebrand-theme";
import { getRandomBusinessProfile, BusinessProfile } from "@/utils/rebrand-content";
import { processPollinationsPromptsSequentially } from "@/utils/pollinations-image";
import { generateSingleAsset } from "@/utils/rebrand-orchestrator";

// Create event emitter for animation sync
class RebrandEventEmitter {
  private listeners: { [key: string]: Function[] } = {};

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  emit(event: string, data?: any) {
    console.log(`[REBRAND] Emitting event: ${event}`, data);
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  off(event: string, callback: Function) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }
}

// Create a global event emitter instance
export const rebrandEventEmitter = new RebrandEventEmitter();

// Define types for our rebrand data
export interface RebrandData {
  theme: Theme;
  businessProfile: BusinessProfile;
  assets: {
    backgroundImage: string;
    logoImage: string;
  };
}

// Define types for orchestrator input
export interface OrchestratorInput {
  elementType: 'logo' | 'button' | 'card' | 'text-block' | 'background' | 'theme';
  currentThemeId?: string;
  companyContext?: BusinessProfile;
}

/**\n * Orchestrates the rebranding process following the sequence:\n * 1. Select theme\n * 2. Select content\n * 3. Generate assets\n *\n * @returns Promise that resolves to the complete rebrand data\n */
export async function orchestrateRebrand(): Promise<RebrandData> {
  // Step 1: Select theme
 const theme = getRandomTheme();
  
  // Emit theme changed event
  rebrandEventEmitter.emit('themeChanged', theme);
  
  // Step 2: Select contents
  const businessProfile = getRandomBusinessProfile();
  
  // Step 3: Generate assets using sequential processing
  try {
    // Create prompts for background and logo
    const prompts = [
      {
        prompt: `Modern ${theme.name} themed background with ${businessProfile.description}, professional, high quality, 4k`
      },
      {
        prompt: `${businessProfile.name} logo with ${theme.name} color scheme, minimalist, professional, vector style`,
        options: { isLogo: true }
      }
    ];
    
    // Process prompts sequentially
    const [backgroundImage, logoImage] = await processPollinationsPromptsSequentially(prompts);
    
    // Emit element rebranded event for each asset
    rebrandEventEmitter.emit('elementRebranded', {
      elementType: 'background',
      imageUrl: backgroundImage
    });
    
    rebrandEventEmitter.emit('elementRebranded', {
      elementType: 'logo',
      imageUrl: logoImage
    });
    
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
 * Orchestrates the rebranding process for a specific element
 * Decision Flow:
 * - Image → Call rebrand-image.ts
 * - Text → Call rebrand-content.ts
 * - Button → Swap component/buttons/
 * - Background → Call rebrand-background.ts
 * - Theme → Call rebrand-theme.ts
 *
 * @param input Orchestrator input data
 * @returns Promise that resolves when rebrand task completes
 */
export async function orchestrateElementRebrand(input: OrchestratorInput): Promise<any> {
  const { elementType, currentThemeId, companyContext } = input;
  
  console.log(`[REBRAND] Orchestrating rebrand for element type: ${elementType}`);
  
  try {
    // Get current theme and content if not provided
    const currentTheme = currentThemeId ?
      // In a real implementation, we would get the theme by ID
      getRandomTheme() :
      getRandomTheme();
      
    const currentContent = companyContext || getRandomBusinessProfile();
    
    // Decision flow based on element type
    switch (elementType) {
      case 'logo':
      case 'background':
        // For images, call rebrand-image.ts
        const imageUrl = await generateSingleAsset(elementType, currentTheme, currentContent);
        rebrandEventEmitter.emit('elementRebranded', {
          elementType,
          imageUrl
        });
        return { imageUrl };
        
      case 'text-block':
        // For text, call rebrand-content.ts
        // In a real implementation, we would generate new text content
        const textContent = currentContent.description;
        rebrandEventEmitter.emit('elementRebranded', {
          elementType,
          textContent
        });
        return { textContent };
        
      case 'button':
        // For buttons, swap component
        // In a real implementation, we would return the new button component
        const buttonVariant = 'default'; // This would be randomized
        rebrandEventEmitter.emit('elementRebranded', {
          elementType,
          buttonVariant
        });
        return { buttonVariant };
        
      case 'background':
        // For background, call rebrand-background.ts
        // In a real implementation, we would get a new background component
        const backgroundComponent = 'default'; // This would be randomized
        rebrandEventEmitter.emit('elementRebranded', {
          elementType,
          backgroundComponent
        });
        return { backgroundComponent };
        
      case 'theme':
        // For theme, call rebrand-theme.ts
        const newTheme = getRandomTheme();
        rebrandEventEmitter.emit('themeChanged', newTheme);
        return { newTheme };
        
      default:
        console.warn(`[REBRAND] Unknown element type: ${elementType}`);
        return null;
    }
  } catch (error) {
    console.error(`[REBRAND] Error orchestrating rebrand for ${elementType}:`, error);
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
      const [imageUrl] = await processPollinationsPromptsSequentially([{ prompt }]);
      
      // Emit element rebranded event
      rebrandEventEmitter.emit('elementRebranded', {
        elementType: 'background',
        imageUrl
      });
      
      return imageUrl;
    } else {
      const prompt = `${currentContent.name} logo with ${currentTheme.name} color scheme, minimalist, professional, vector style`;
      const [imageUrl] = await processPollinationsPromptsSequentially([{ prompt, options: { isLogo: true } }]);
      
      // Emit element rebranded event
      rebrandEventEmitter.emit('elementRebranded', {
        elementType: 'logo',
        imageUrl
      });
      
      return imageUrl;
    }
  } catch (error) {
    console.error(`Error generating ${assetType} asset:`, error);
    throw error;
  }
}