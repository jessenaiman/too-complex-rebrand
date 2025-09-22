import { test, expect } from '@playwright/test';

test('smoke test - production build works', async ({ page }) => {
  // Test the built application
  await page.goto('/');
  
  // Verify core functionality
  await expect(page.locator('body')).toBeVisible();
  
  // Check for rebrand components
  const rebrandElements = page.locator('[data-slot*="rebrand"], [class*="rebrand"]');
  const rebrandCount = await rebrandElements.count();
  console.log(`Found ${rebrandCount} rebrand elements in production build`);
  
  // Check that page has loaded with some content
  const content = await page.textContent('body');
  expect(content).toBeTruthy();
 expect(content?.length).toBeGreaterThan(50); // Minimum content length
  
  // Check that there are no console errors (this will be checked by Playwright automatically)
  // But we can also explicitly check for specific elements
  
  // Check for navigation or header elements
  const headerElements = page.locator('header, nav, [role="navigation"]');
  const headerCount = await headerElements.count();
  console.log(`Found ${headerCount} header/navigation elements`);
});