// app/utils/rebrand-ai.ts
// AI Generation Service for Pollinations API

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

  const url = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&nologo=true&seed=${seed}`;
  
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

/**
 * Generates marketing text using the Pollinations text API
 * @param prompt - The prompt for text generation
 * @param options - Options for text generation
 * @returns A promise that resolves to the generated text
 */
export async function generatePollinationsTextAsync(
  prompt: string,
  options?: { seed?: number }
): Promise<string> {
  const seed = options?.seed ?? Math.floor(Math.random() * 1000);
  
  const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?seed=${seed}`;
  
  try {
    const response = await fetch(url);
    
    if (response.ok) {
      return await response.text();
    } else {
      throw new Error(`Failed to generate text: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
}