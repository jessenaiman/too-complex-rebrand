import { test, expect } from '@playwright/test';

test('FR-009: The rebrand button displays "Switch Back" text after rebranding is triggered', async ({ page }) => {
  // Navigate to the rebrand page
  await page.goto('/');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Check initial state - should show "Rebrand Now" button
  const rebrandButton = page.getByRole('button', { name: 'Rebrand Now' });
  await expect(rebrandButton).toBeVisible();
  
  // Click the rebrand button
  await rebrandButton.click();
  
  // Wait for loading to complete
  await expect(page.getByText('Generating New Brand')).toBeHidden({ timeout: 10000 });
  
  // Check that button now shows "Switch Back"
  await expect(page.getByRole('button', { name: 'Switch Back' })).toBeVisible();
  
  // Click "Switch Back" button
  await page.getByRole('button', { name: 'Switch Back' }).click();
  
  // Wait for loading to complete
  await expect(page.getByText('Generating New Brand')).toBeHidden({ timeout: 10000 });
  
  // Check that button now shows "Rebrand Now" again
  await expect(rebrandButton).toBeVisible();
});