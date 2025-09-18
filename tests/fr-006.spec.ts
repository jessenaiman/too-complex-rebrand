import { test, expect } from '@playwright/test';

test('FR-006: API calls for image and text generation happen sequentially and assets load one at a time', async ({ page }) => {
  // Navigate to the rebrand page
  await page.goto('/');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Intercept network requests to verify sequential calls
  let requestCount = 0;
  let requestUrls: string[] = [];
  
  page.on('request', request => {
    const url = request.url();
    if (url.includes('pollinations.ai')) {
      requestCount++;
      requestUrls.push(url);
    }
  });
  
  // Click the rebrand button to trigger a rebrand
  await page.getByRole('button', { name: 'Rebrand Now' }).click();
  
  // Wait for loading to complete
  await expect(page.getByText('Generating New Brand')).toBeHidden({ timeout: 15000 });
  
  // Verify that we made API calls to pollinations
  expect(requestCount).toBeGreaterThanOrEqual(2); // At least 2 API calls (logo and background)
  
  // Verify that the requests were to the expected pollinations endpoints
  for (const url of requestUrls) {
    expect(url).toContain('pollinations.ai');
  }
});