import { test, expect } from '@playwright/test';

test('FR-005: Loading animations are displayed on all rebrandable components during the rebranding process', async ({ page }) => {
  // Navigate to the rebrand page
  await page.goto('/');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Click the rebrand button to trigger a rebrand
  const rebrandButton = page.getByRole('button', { name: 'Rebrand Now' });
  await rebrandButton.click();
  
  // Check that loading animations are displayed
  await expect(page.getByText('Generating New Brand')).toBeVisible();
  
  // Check that the loading spinner is visible
  const spinner = page.locator('div.w-8.h-8.border-4.border-white.border-t-transparent.rounded-full');
  await expect(spinner).toBeVisible();
  
  // Wait for loading to complete
  await expect(page.getByText('Generating New Brand')).toBeHidden({ timeout: 10000 });
  
  // Verify that loading elements are no longer visible
  await expect(page.getByText('Generating New Brand')).toBeHidden();
});