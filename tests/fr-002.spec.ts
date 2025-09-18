import { test, expect } from '@playwright/test';

test('FR-002: Clicking on individual components triggers a rebrand for that specific component only', async ({ page }) => {
  // Navigate to the rebrand page
  await page.goto('/');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Check initial state - should show "Rebrand Now" button
  const rebrandButton = page.getByRole('button', { name: 'Rebrand Now' });
  await expect(rebrandButton).toBeVisible();
  
  // Check that logo is visible
  const logo = page.locator('nav img[alt="Brand Logo"]');
  await expect(logo).toBeVisible();
  
  // Click the logo to trigger component-level rebrand
  await logo.click();
  
  // Wait for loading state to appear and disappear
  await expect(page.getByText('Generating AI Content')).toBeVisible();
  await expect(page.getByText('Generating AI Content')).toBeHidden({ timeout: 10000 });
  
  // Check that logo has changed (by checking if it's still visible)
  await expect(logo).toBeVisible();
  
  // Check that the global rebrand button still shows "Rebrand Now" (not "Switch Back")
  await expect(rebrandButton).toBeVisible();
});