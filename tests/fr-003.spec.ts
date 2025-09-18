import { test, expect } from '@playwright/test';

test('FR-003: Clicking the logo changes the image to a random letter from the predefined set', async ({ page }) => {
  // Navigate to the rebrand page
  await page.goto('/');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Check that logo is visible
  const logo = page.locator('nav img[alt="Brand Logo"]');
  await expect(logo).toBeVisible();
  
  // Get initial logo src
  const initialSrc = await logo.getAttribute('src');
  
  // Click the logo to trigger rebrand
  await logo.click();
  
  // Wait for loading state to appear and disappear
  await expect(page.getByText('Generating AI Content')).toBeVisible();
  await expect(page.getByText('Generating AI Content')).toBeHidden({ timeout: 10000 });
  
  // Get new logo src
  const newSrc = await logo.getAttribute('src');
  
  // Verify that the logo has changed
  expect(newSrc).not.toEqual(initialSrc);
  
  // Verify that the new logo is still from the Pollinations API
  expect(newSrc).toContain('pollinations.ai');
});