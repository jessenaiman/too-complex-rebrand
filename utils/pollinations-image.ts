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

/**
 * Generates a Pollinations.AI image by actually fetching from the API
 * @param prompt - The text prompt for image generation.
 * @param options - Options for image type.
 * @returns A promise that resolves to the image URL
 */
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
    
    if (response.ok) {
      return url;
    } else {
      throw new Error(`Failed to generate image: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}