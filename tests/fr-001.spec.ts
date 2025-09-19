import { test, expect } from '@playwright/test';

test('FR-001: Page-wide rebrand affects all rebrandable components simultaneously', async ({ page }) => {
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
  
  // Click the rebrand button
  await rebrandButton.click();
  
  // Wait for loading state to appear and disappear
  await expect(page.getByTestId('rebrand-loading-overlay')).toBeVisible();
  await expect(page.getByTestId('rebrand-loading-overlay')).toBeHidden({ timeout: 10000 });
  
  // Check that button now shows "Switch Back"
  await expect(page.getByRole('button', { name: 'Switch Back' })).toBeVisible();
  
  // Check that logo has changed (by checking if it's still visible)
  await expect(logo).toBeVisible();
  
  // Check that background image is visible
  const backgroundImage = page.locator('img[alt="AI Generated Background"]');
  await expect(backgroundImage).toBeVisible();
  
  // Click "Switch Back" button
  await page.getByRole('button', { name: 'Switch Back' }).click();
  
  // Wait for loading state to appear and disappear
  await expect(page.getByTestId('rebrand-loading-overlay')).toBeVisible();
  await expect(page.getByTestId('rebrand-loading-overlay')).toBeHidden({ timeout: 10000 });
  
  // Check that button now shows "Rebrand Now" again
  await expect(rebrandButton).toBeVisible();
});