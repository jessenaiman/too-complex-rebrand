// utils/rebrand-image.ts
// Module for generating images with Pollinations API

import { processPollinationsPromptsSequentially } from "@/utils/pollinations-image";

// Construct prompt from various inputs
export const constructImagePrompt = (
  companyInfo: any,
  themeMood: string,
  elementType: string,
  stylesheetTokens: any
) => {
  // Extract colors from stylesheet
  const primaryColor = stylesheetTokens?.primary || 'professional';
  const secondaryColor = stylesheetTokens?.secondary || 'modern';
  
  // Create prompt based on element type
  let prompt = '';
  
  switch (elementType) {
    case 'logo':
      prompt = `${companyInfo.name} logo with ${themeMood} mood, ${primaryColor} and ${secondaryColor} color scheme, minimalist, professional, vector style`;
      break;
    case 'background':
      prompt = `Modern ${themeMood} themed background with ${companyInfo.description}, professional, high quality, 4k`;
      break;
    case 'card':
      prompt = `${themeMood} themed card design for ${companyInfo.name}, ${primaryColor} accent, professional, clean layout`;
      break;
    default:
      prompt = `${themeMood} themed ${elementType} for ${companyInfo.name}, ${companyInfo.description}, professional design`;
  }
  
  return prompt;
};

// Generate image with Pollinations API
export const generateRebrandImage = async (
  companyInfo: any,
  themeMood: string,
  elementType: string,
  stylesheetTokens: any
) => {
  try {
    // Construct the prompt
    const prompt = constructImagePrompt(companyInfo, themeMood, elementType, stylesheetTokens);
    
    // Determine if it's a logo (smaller, square image)
    const isLogo = elementType === 'logo';
    
    // Generate image using sequential processing
    const [imageUrl] = await processPollinationsPromptsSequentially([
      { 
        prompt, 
        options: { isLogo } 
      }
    ]);
    
    return imageUrl;
  } catch (error) {
    console.error(`Error generating ${elementType} image:`, error);
    throw error;
  }
};

// Wrap image in BlurFade on load
export const wrapImageWithBlurFade = (imageUrl: string) => {
  // This would be implemented in the component itself
  // Returning the URL for now
  return imageUrl;
};

export default {
  constructImagePrompt,
  generateRebrandImage,
  wrapImageWithBlurFade
};