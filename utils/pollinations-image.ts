// app/utils/pollinations-image.ts

/**
 * Generates a Pollinations.AI image URL for backgrounds or logos.
 * @param prompt - The text prompt for image generation.
 * @param options - Options for image type.
 *   - isLogo: If true, generates a logo (smaller, square). If false, generates a background.
 *   - seed: Optional. If not provided, a random seed is used.
 * @returns The Pollinations image URL.
 */
export function generatePollinationsImage(
  prompt: string,
  options?: { isLogo?: boolean; seed?: number }
): string {
  const isLogo = options?.isLogo ?? false;
  const width = isLogo ? 200 : 800;
  const height = isLogo ? 200 : 600;
  const seed = options?.seed ?? Math.floor(Math.random() * 1000);

  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&nologo=true&seed=${seed}`;
}

/**\n * Generates a Pollinations.AI image by actually fetching from the API\n * @param prompt - The text prompt for image generation.\n * @param options - Options for image type.\n * @returns A promise that resolves to the image URL\n */
export async function generatePollinationsImageAsync(
  prompt: string,
  options?: { isLogo?: boolean; seed?: number }
): Promise<string> {
  const isLogo = options?.isLogo ?? false;
  const width = isLogo ? 200 : 800;
  const height = isLogo ? 200 : 600;
  const seed = options?.seed ?? Math.floor(Math.random() * 1000);

  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&nologo=true&seed=${seed}`;
  
  try {
    // Make a HEAD request to verify the image is available
    const response = await fetch(url, { method: 'HEAD' });

    // Check if response is null or invalid
    if (!response) {
      console.warn(`No response received from Pollinations API for ${url}`);
      throw new Error('No response from Pollinations API');
    }

    // Check for various error statuses
    if (response.status === 404 || response.status === 500 || response.status === 503) {
      console.warn(`Pollinations API error for ${url}: ${response.status} ${response.statusText}`);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    // For successful responses or other statuses, return the URL
    console.log(`Image generation request sent for ${url} with status ${response.status}`);
    return url;
  } catch (error) {
    console.warn("Error verifying image generation:", error);

    // Generate a fallback data URL or placeholder
    const fallbackPrompt = prompt.split(' ').slice(0, 3).join(' ');
    const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fallbackPrompt + ' abstract background')}`;
    console.log(`Using fallback URL: ${fallbackUrl}`);

    return fallbackUrl;
  }
}

/**
 * Processes an array of Pollinations prompts sequentially, waiting for each image to be ready
 * before proceeding to the next. This ensures reliable, sequential AI image generation.
 *
 * @param prompts - Array of prompt objects with prompt text and options
 * @returns Array of generated image URLs
 */
export async function processPollinationsPromptsSequentially(
  prompts: Array<{ prompt: string; options?: { isLogo?: boolean; seed?: number } }>
): Promise<string[]> {
  console.log("[REBRAND] Starting sequential processing of", prompts.length, "prompts");
  
  const results: string[] = [];
  
  for (let i = 0; i < prompts.length; i++) {
    const { prompt, options } = prompts[i];
    console.log(`[REBRAND] Processing prompt ${i + 1}/${prompts.length}:`, prompt);
    
    try {
      const imageUrl = await generatePollinationsImageAsync(prompt, options);
      results.push(imageUrl);
      console.log(`[REBRAND] Successfully generated image for prompt ${i + 1}:`, imageUrl);
    } catch (error) {
      console.error(`[REBRAND] Error generating image for prompt ${i + 1}:`, error);

      // Create a more robust fallback URL with a simplified prompt
      const simplePrompt = prompt.split(' ').slice(0, 5).join(' ') + ' background';
      const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(simplePrompt)}?width=800&height=600&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;
      results.push(fallbackUrl);
      console.log(`[REBRAND] Using fallback URL for prompt ${i + 1}:`, fallbackUrl);
    }
    
    // Add a small delay between requests to respect rate limits
    if (i < prompts.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log("[REBRAND] Sequential processing completed with", results.length, "results");
  return results;
}