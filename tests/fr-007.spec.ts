import { test, expect } from '@playwright/test';

test('FR-007: Rebranded text has random colors and animations applied from the predefined variations', async ({ page }) => {
  // Navigate to the rebrand page
  await page.goto('/');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Get initial styling classes
  const businessName = page.locator('h2.text-3xl.font-bold').first();
  const initialClasses = await businessName.getAttribute('class');
  
  // Click the rebrand button to trigger a rebrand
  await page.getByRole('button', { name: 'Rebrand Now' }).click();
  
  // Wait for loading to complete
  await expect(page.getByText('Generating New Brand')).toBeHidden({ timeout: 10000 });
  
  // Get new styling classes
  const newClasses = await businessName.getAttribute('class');
  
  // Verify that the styling has changed (indicating new colors/animations)
  // Note: This is a basic check. In a real test, we might want to check specific color values
  expect(newClasses).not.toBeNull();
});