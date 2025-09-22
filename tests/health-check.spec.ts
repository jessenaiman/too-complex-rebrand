import { test, expect } from '@playwright/test';

test('health check - dev server starts and loads', async ({ page }) => {
  // Navigate to the application
  await page.goto('/');
  
  // Check if the page loads successfully
  await expect(page).toHaveTitle(/Rebrand/);
  
  // Check for essential elements
  await expect(page.locator('body')).toBeVisible();
  
  // Check for theme switching functionality (if present)
  const themeElements = page.locator('[data-slot*="theme"], [class*="theme"], [aria-label*="theme"]');
  // Don't fail if theme elements aren't found, just log
  const themeCount = await themeElements.count();
  console.log(`Found ${themeCount} potential theme elements`);
  
  // Check for rebrand components
  const rebrandElements = page.locator('[data-slot*="rebrand"], [class*="rebrand"]');
  const rebrandCount = await rebrandElements.count();
  console.log(`Found ${rebrandCount} rebrand elements`);
  
  // Basic check that the page has content
  const bodyText = await page.locator('body').textContent();
  expect(bodyText?.length).toBeGreaterThan(0);
});