import { test, expect } from '@playwright/test';

test('FR-004: Marketing text is randomly displayed from the predefined set of business descriptions', async ({ page }) => {
  // Navigate to the rebrand page
  await page.goto('/');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Click the rebrand button to trigger a rebrand
  await page.getByRole('button', { name: 'Rebrand Now' }).click();
  
  // Wait for loading state to appear and disappear
  await expect(page.getByText('Generating New Brand')).toBeVisible();
  await expect(page.getByText('Generating New Brand')).toBeHidden({ timeout: 10000 });
  
  // Check that business name, tagline, and description are displayed
  const businessName = page.locator('h2.text-3xl.font-bold');
  const businessDescription = page.locator('p.text-gray-300').first();
  
  await expect(businessName).toBeVisible();
  await expect(businessDescription).toBeVisible();
  
  // Get the text content
  const nameText = await businessName.textContent();
  const descText = await businessDescription.textContent();
  
  // Verify that the text is not empty
  expect(nameText).not.toBeNull();
  expect(nameText?.trim()).not.toEqual('');
  expect(descText).not.toBeNull();
  expect(descText?.trim()).not.toEqual('');
  
  // Verify that the text contains content from our predefined business profiles
  const validBusinessNames = [
    'Nimbus Analytics',
    'Petal & Stem',
    'Bytewise Tutors',
    'Urban Grind Café',
    'Atlas Fitness',
    'TechFlow Solutions',
    'EcoVibe Products',
    'SkillBridge Academy',
    'Bloom Wellness',
    'UrbanEats Delivery'
  ];
  
  const validDescriptions = [
    'Nimbus Analytics empowers small businesses with real-time, AI-driven insights',
    'Petal & Stem is a modern floral studio offering bespoke arrangements',
    'Bytewise Tutors connects students with top-tier educators',
    'Urban Grind Café serves ethically sourced coffee and fresh, local fare',
    'Atlas Fitness provides tailored training programs, nutrition coaching',
    'TechFlow Solutions provides cutting-edge software tools',
    'EcoVibe offers eco-friendly household products',
    'SkillBridge Academy offers online courses and certifications',
    'Bloom Wellness provides natural health products and mindfulness resources',
    'UrbanEats connects you with local restaurants and delivers delicious meals'
  ];
  
  let nameFound = false;
  for (const validName of validBusinessNames) {
    if (nameText?.includes(validName)) {
      nameFound = true;
      break;
    }
  }
  expect(nameFound).toBeTruthy();
  
  let descFound = false;
  for (const validDesc of validDescriptions) {
    if (descText?.includes(validDesc)) {
      descFound = true;
      break;
    }
  }
  expect(descFound).toBeTruthy();
});