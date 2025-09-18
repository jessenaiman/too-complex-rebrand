import { test, expect } from '@playwright/test';

test('FR-010: Shadcn/ui components are used for button and text designs in the rebranded components', async ({ page }) => {
  // Navigate to the rebrand page
  await page.goto('/');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Check that the rebrand button uses shadcn/ui styling
  const rebrandButton = page.getByRole('button', { name: 'Rebrand Now' });
  await expect(rebrandButton).toBeVisible();
  
  // Check that navigation links use shadcn/ui button styling
  const navLinks = page.locator('nav a');
  const count = await navLinks.count();
  expect(count).toBeGreaterThan(0);
  
  // Check that feature buttons use shadcn/ui
  const featureButtons = page.locator('a:has-text("Visit Pollinations.AI"), a:has-text("View on GitHub")');
  const featureButtonCount = await featureButtons.count();
  expect(featureButtonCount).toBe(2);
});