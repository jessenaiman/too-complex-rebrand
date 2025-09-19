// app/data/rebrand-content.ts
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

// Business profiles data - converted from YAML to TypeScript array
const businessProfiles: BusinessProfile[] = [
  {
    name: "Nimbus Analytics",
    tagline: "See Beyond the Numbers",
    description: "Nimbus Analytics empowers small businesses with real-time, AI-driven insights to make smarter decisions and grow faster."
  },
  {
    name: "Petal & Stem",
    tagline: "Nature Delivered",
    description: "Petal & Stem is a modern floral studio offering bespoke arrangements and eco-friendly delivery for every occasion."
  },
  {
    name: "Bytewise Tutors",
    tagline: "Unlock Your Potential",
    description: "Bytewise Tutors connects students with top-tier educators for personalized, online learning in STEM subjects."
  },
  {
    name: "Urban Grind Café",
    tagline: "Fuel Your Day",
    description: "Urban Grind Café serves ethically sourced coffee and fresh, local fare in a vibrant, community-focused space."
  },
  {
    name: "Atlas Fitness",
    tagline: "Stronger Every Day",
    description: "Atlas Fitness provides tailored training programs, nutrition coaching, and a supportive environment for all fitness levels."
  },
  {
    name: "TechFlow Solutions",
    tagline: "Streamline Your Success",
    description: "TechFlow Solutions provides cutting-edge software tools and IT consulting services to help businesses optimize their operations."
  },
  {
    name: "EcoVibe Products",
    tagline: "Live Sustainably",
    description: "EcoVibe offers eco-friendly household products made from recycled materials to help you reduce your environmental footprint."
  },
  {
    name: "SkillBridge Academy",
    tagline: "Build Your Future",
    description: "SkillBridge Academy offers online courses and certifications in high-demand tech skills to help professionals advance their careers."
  },
  {
    name: "Bloom Wellness",
    tagline: "Nurture Your Wellbeing",
    description: "Bloom Wellness provides natural health products and mindfulness resources to support holistic wellness and self-care."
  },
  {
    name: "UrbanEats Delivery",
    tagline: "Food You Love, Delivered",
    description: "UrbanEats connects you with local restaurants and delivers delicious meals fast, supporting your community's culinary scene."
  },
  {
    name: "PixelForge Studios",
    tagline: "Crafting Digital Dreams",
    description: "PixelForge Studios specializes in creative digital solutions, from web design to immersive AR/VR experiences for brands of all sizes."
  },
  {
    name: "GreenSprout Landscaping",
    tagline: "Grow Beautifully",
    description: "GreenSprout Landscaping transforms outdoor spaces with sustainable designs, expert gardening, and eco-friendly maintenance."
  },
  {
    name: "AquaPure Filters",
    tagline: "Clean Water, Healthy Life",
    description: "AquaPure Filters delivers advanced water purification systems for homes and businesses, ensuring safe, great-tasting water."
  },
  {
    name: "Mindful Moves",
    tagline: "Move with Purpose",
    description: "Mindful Moves offers yoga, pilates, and wellness coaching to help individuals achieve balance, flexibility, and inner peace."
  }
];

// Track used profiles to ensure we don't repeat until all are used
let usedProfiles: BusinessProfile[] = [];

/**
 * Returns business profiles from the static array.
 */
function loadBusinessProfiles(): BusinessProfile[] {
  return businessProfiles;
}

/**
 * Returns a random business profile from the YAML file that hasn't been used recently.
 */
export function getRandomBusinessProfile(): BusinessProfile {
  const profiles = loadBusinessProfiles();
  const allProfiles = [...profiles, ...additionalMarketingTexts];
  
  // If all profiles have been used, reset the used profiles array
  if (usedProfiles.length >= allProfiles.length) {
    usedProfiles = [];
  }
  
  // Filter out used profiles
  const availableProfiles = allProfiles.filter(profile =>
    !usedProfiles.some(used => used.name === profile.name)
  );
  
  // If no profiles are available (shouldn't happen), use all profiles
  const selectionPool = availableProfiles.length > 0 ? availableProfiles : allProfiles;
  
  if (selectionPool.length === 0) {
    return {
      name: "Default Business",
      tagline: "Innovate Your Future",
      description: "A default business profile for demonstration purposes."
    };
  }
  
  const idx = Math.floor(Math.random() * selectionPool.length);
  const selectedProfile = selectionPool[idx];
  
  // Add the selected profile to the used profiles array
  usedProfiles.push(selectedProfile);
  
  return selectedProfile;
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