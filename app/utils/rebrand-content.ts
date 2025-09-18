// app/data/rebrand-content.ts
import fs from "fs";
import path from "path";

export interface BusinessProfile {
  name: string;
  tagline: string;
  description: string;
}

// Additional marketing texts for randomization
const additionalMarketingTexts = [
  {
    name: "TechFlow Solutions",
    tagline: "Streamline Your Success",
    description: "TechFlow Solutions provides cutting-edge software tools that help businesses automate workflows and boost productivity."
  },
  {
    name: "EcoVibe Products",
    tagline: "Sustainable Living Made Simple",
    description: "EcoVibe offers eco-friendly household products that make sustainable living accessible and affordable for everyone."
  },
  {
    name: "SkillBridge Academy",
    tagline: "Build Your Future",
    description: "SkillBridge Academy offers online courses and certifications in high-demand tech skills to help you advance your career."
  },
  {
    name: "Bloom Wellness",
    tagline: "Nurture Your Wellbeing",
    description: "Bloom Wellness provides natural health products and mindfulness resources to support your holistic wellbeing journey."
  },
  {
    name: "UrbanEats Delivery",
    tagline: "Flavor Delivered",
    description: "UrbanEats connects you with local restaurants and delivers delicious meals from the comfort of your home."
  }
];

/**
 * Loads business profiles from the YAML file and returns them as an array.
 * Parses the YAML structure manually without external dependencies.
 */
function loadBusinessProfiles(): BusinessProfile[] {
  const filePath = path.join(process.cwd(), "app/data/marketing-text.yml");
  const fileContent = fs.readFileSync(filePath, "utf8");
  
  try {
    // Parse the YAML manually
    const profiles: BusinessProfile[] = [];
    const lines = fileContent.split('\n');
    let currentProfile: Partial<BusinessProfile> | null = null;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Skip empty lines
      if (!trimmedLine) continue;
      
      // Start of a new profile
      if (trimmedLine.startsWith('- name:')) {
        // Save previous profile if exists
        if (currentProfile && currentProfile.name && currentProfile.tagline && currentProfile.description) {
          profiles.push(currentProfile as BusinessProfile);
        }
        
        // Start new profile
        currentProfile = {
          name: trimmedLine.replace('- name:', '').trim().replace(/^["']|["']$/g, ''),
          tagline: '',
          description: ''
        };
        continue;
      }
      
      // Parse tagline
      if (trimmedLine.startsWith('tagline:') && currentProfile) {
        currentProfile.tagline = trimmedLine.replace('tagline:', '').trim().replace(/^["']|["']$/g, '');
        continue;
      }
      
      // Parse description
      if (trimmedLine.startsWith('description:') && currentProfile) {
        currentProfile.description = trimmedLine.replace('description:', '').trim().replace(/^["']|["']$/g, '');
        continue;
      }
    }
    
    // Add the last profile
    if (currentProfile && currentProfile.name && currentProfile.tagline && currentProfile.description) {
      profiles.push(currentProfile as BusinessProfile);
    }
    
    return profiles;
  } catch (error) {
    console.error("Error parsing YAML file:", error);
    return [];
  }
}

/**
 * Returns a random business profile from the YAML file.
 */
export function getRandomBusinessProfile(): BusinessProfile {
  const profiles = loadBusinessProfiles();
  const allProfiles = [...profiles, ...additionalMarketingTexts];
  
  if (allProfiles.length === 0) {
    return {
      name: "Default Business",
      tagline: "Innovate Your Future",
      description: "A default business profile for demonstration purposes."
    };
  }
  
  const idx = Math.floor(Math.random() * allProfiles.length);
  return allProfiles[idx];
}

/**
 * Returns a random marketing text (name, tagline, or description) from all available profiles.
 */
export function getRandomMarketingText(): { type: 'name' | 'tagline' | 'description', text: string } {
  const profiles = loadBusinessProfiles();
  const allProfiles = [...profiles, ...additionalMarketingTexts];
  
  if (allProfiles.length === 0) {
    return {
      type: 'description',
      text: "A default business profile for demonstration purposes."
    };
  }
  
  const randomProfile = allProfiles[Math.floor(Math.random() * allProfiles.length)];
  const textTypes: Array<'name' | 'tagline' | 'description'> = ['name', 'tagline', 'description'];
  const randomType = textTypes[Math.floor(Math.random() * textTypes.length)];
  
  return {
    type: randomType,
    text: randomProfile[randomType]
  };
}