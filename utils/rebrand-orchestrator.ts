// app/utils/rebrand-orchestrator.ts
// Service that orchestrates the theme → content → assets sequence for rebranding

import { getRandomTheme, Theme } from "@/utils/rebrand-theme";
import { getRandomBusinessProfile, BusinessProfile } from "@/utils/rebrand-content";
import { processPollinationsPromptsSequentially } from "@/utils/pollinations-image";
import { componentDiscovery } from "@/utils/component-registry/component-discovery";

// Create event emitter for animation sync
class RebrandEventEmitter {
  private listeners: { [key: string]: ((data?: unknown) => void)[] } = {};

  on(event: string, callback: (data?: unknown) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  emit(event: string, data?: unknown) {
    console.log(`[REBRAND] Emitting event: ${event}`, data);
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  off(event: string, callback: (data?: unknown) => void) {
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
export async function orchestrateElementRebrand(input: OrchestratorInput): Promise<unknown> {
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
        // For logo images, call rebrand-image.ts
        const logoImageUrl = await generateSingleAsset('logo', currentTheme, currentContent);
        rebrandEventEmitter.emit('elementRebranded', {
          elementType: 'logo',
          imageUrl: logoImageUrl
        });
        return { imageUrl: logoImageUrl };
        
      case 'background':
        // For background, use dynamic component discovery to get available variants
        const availableBackgroundComponents = await componentDiscovery.discoverComponents('components/backgrounds');

        if (availableBackgroundComponents.length === 0) {
          console.warn('[REBRAND] No background components found');
          // Fallback to a default background
          rebrandEventEmitter.emit('elementRebranded', {
            elementType: 'background',
            componentType: 'background',
            variant: 'default-background',
            displayName: 'Default Background'
          });
          return {
            componentType: 'background',
            variant: 'default-background',
            displayName: 'Default Background',
            props: {}
          };
        }

        // Select a random component variant
        const randomBackgroundComponent = availableBackgroundComponents[Math.floor(Math.random() * availableBackgroundComponents.length)];

        rebrandEventEmitter.emit('elementRebranded', {
          elementType: 'background',
          componentType: 'background',
          variant: randomBackgroundComponent.name,
          displayName: randomBackgroundComponent.displayName
        });

        return {
          componentType: 'background',
          variant: randomBackgroundComponent.name,
          displayName: randomBackgroundComponent.displayName,
          props: {}
        };
        
      case 'text-block':
        // For text, call rebrand-content.ts
        // In a real implementation, we would generate new text content
        const textContent = currentContent.description;
        rebrandEventEmitter.emit('elementRebranded', {
          elementType: 'text-block',
          textContent
        });
        return { textContent };
        
      case 'button':
        // For buttons, use dynamic component discovery to get available variants
        const availableButtonComponents = await componentDiscovery.discoverComponents('components/buttons');

        if (availableButtonComponents.length === 0) {
          console.warn('[REBRAND] No button components found');
          // Fallback to a default button
          rebrandEventEmitter.emit('elementRebranded', {
            elementType: 'button',
            componentType: 'button',
            variant: 'default-button',
            displayName: 'Default Button'
          });
          return {
            componentType: 'button',
            variant: 'default-button',
            displayName: 'Default Button',
            props: {}
          };
        }

        // Select a random component variant
        const randomButtonComponent = availableButtonComponents[Math.floor(Math.random() * availableButtonComponents.length)];

        rebrandEventEmitter.emit('elementRebranded', {
          elementType: 'button',
          componentType: 'button',
          variant: randomButtonComponent.name,
          displayName: randomButtonComponent.displayName
        });

        return {
          componentType: 'button',
          variant: randomButtonComponent.name,
          displayName: randomButtonComponent.displayName,
          props: {
            // Add theme-aware props
            shimmerColor: '#ffffff', // Use a default color for now
          }
        };
        
      case 'card':
        // For cards, use dynamic component discovery to get available variants
        const availableCardComponents = await componentDiscovery.discoverComponents('components/rebrand');

        // Filter for card-like components
        const cardComponents = availableCardComponents.filter(component =>
          component.name.includes('card') || component.name.includes('testimonial')
        );

        if (cardComponents.length === 0) {
          console.warn('[REBRAND] No card components found');
          // Fallback to a default card
          rebrandEventEmitter.emit('elementRebranded', {
            elementType: 'card',
            componentType: 'card',
            variant: 'default-card',
            displayName: 'Default Card'
          });
          return {
            componentType: 'card',
            variant: 'default-card',
            displayName: 'Default Card',
            props: {}
          };
        }

        // Select a random component variant
        const randomCardComponent = cardComponents[Math.floor(Math.random() * cardComponents.length)];

        rebrandEventEmitter.emit('elementRebranded', {
          elementType: 'card',
          componentType: 'card',
          variant: randomCardComponent.name,
          displayName: randomCardComponent.displayName
        });

        return {
          componentType: 'card',
          variant: randomCardComponent.name,
          displayName: randomCardComponent.displayName,
          props: {}
        };
        
      case 'text-block':
        // For text components, use dynamic component discovery to get available variants
        // Check both text directories
        const textComponentsFromTextDir = await componentDiscovery.discoverComponents('components/text');
        const textComponentsFromAnimateDir = await componentDiscovery.discoverComponents('components/animate-ui/primitives/texts');
        
        // Combine text components from both directories
        const allTextComponents = [...textComponentsFromTextDir, ...textComponentsFromAnimateDir];

        if (allTextComponents.length === 0) {
          console.warn('[REBRAND] No text components found');
          // Fallback to default text content
          const textContent = currentContent.description;
          rebrandEventEmitter.emit('elementRebranded', {
            elementType: 'text-block',
            textContent
          });
          return { textContent };
        }

        // Select a random component variant
        const randomTextComponent = allTextComponents[Math.floor(Math.random() * allTextComponents.length)];

        rebrandEventEmitter.emit('elementRebranded', {
          elementType: 'text-block',
          componentType: 'text',
          variant: randomTextComponent.name,
          displayName: randomTextComponent.displayName,
          textContent: currentContent.description
        });

        return {
          componentType: 'text',
          variant: randomTextComponent.name,
          displayName: randomTextComponent.displayName,
          textContent: currentContent.description,
          props: {}
        };
        
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