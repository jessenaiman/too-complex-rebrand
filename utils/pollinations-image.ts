/**
 * Pollinations Image Generation Utility
 * Handles image generation using the Pollinations AI API
 */

interface ImageOptions {
  width?: number;
  height?: number;
  seed?: number | string;
  model?: string;
  nologo?: boolean;
}

/**
 * Generates an image using Pollinations AI API
 * @param prompt - The image generation prompt
 * @param options - Image generation options
 * @returns Promise<string> - URL of the generated image
 */
export async function generatePollinationsImageAsync(
  prompt: string,
  options: ImageOptions = {}
): Promise<string> {
  const {
    width = 512,
    height = 512,
    seed = Math.floor(Math.random() * 1000000),
    model = 'flux',
    nologo = true
  } = options;

  try {
    // Create the base URL with prompt
    const baseUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    // Build query parameters
    const params = new URLSearchParams({
      width: width.toString(),
      height: height.toString(),
      seed: seed.toString(),
      model: model,
      nologo: nologo.toString()
    });

    const imageUrl = `${baseUrl}?${params.toString()}`;

    console.log(`Generating image with URL: ${imageUrl}`);

    // Test the URL by making a HEAD request first
    try {
      const response = await fetch(imageUrl, {
        method: 'HEAD',
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });

      if (!response.ok) {
        throw new Error(`Image generation failed with status: ${response.status}`);
      }

      // Check content type
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('image/')) {
        throw new Error(`Invalid content type: ${contentType}`);
      }

      console.log(`Image generation successful: ${response.status}`);
      return imageUrl;

    } catch (fetchError) {
      console.warn(`Image generation failed, trying fallback:`, fetchError);

      // Fallback: Try with a simpler prompt and flux model
      const fallbackPrompt = prompt.split(' ').slice(0, 5).join(' ') + ' abstract background professional';
      const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fallbackPrompt)}?width=${width}&height=${height}&model=flux&nologo=true&seed=${seed}`;

      console.log(`Using fallback URL: ${fallbackUrl}`);

      // Test fallback URL
      const fallbackResponse = await fetch(fallbackUrl, {
        method: 'HEAD',
        signal: AbortSignal.timeout(10000)
      });

      if (!fallbackResponse.ok) {
        throw new Error(`Fallback image generation also failed with status: ${fallbackResponse.status}`);
      }

      return fallbackUrl;
    }

  } catch (error) {
    console.error(`Pollinations image generation error:`, error);

    // Return a placeholder or fallback URL
    const fallbackPrompt = prompt.split(' ').slice(0, 3).join(' ');
    const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fallbackPrompt + ' abstract background')}`;

    console.log(`Using final fallback URL: ${fallbackUrl}`);
    return fallbackUrl;
  }
}

/**
 * Validates if a Pollinations image URL is accessible
 * @param imageUrl - The image URL to validate
 * @returns Promise<boolean> - Whether the image is accessible
 */
export async function validatePollinationsImage(imageUrl: string): Promise<boolean> {
  try {
    const response = await fetch(imageUrl, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000)
    });

    const contentType = response.headers.get('content-type');
    return response.ok && contentType?.includes('image/') === true;
 } catch (error) {
    console.warn(`Image validation failed:`, error);
    return false;
  }
}

/**
 * Generates multiple image variations with different seeds
 * @param prompt - The image generation prompt
 * @param count - Number of variations to generate
 * @param options - Image generation options
 * @returns Promise<string[]> - Array of image URLs
 */
export async function generateImageVariations(
  prompt: string,
  count: number = 3,
  options: ImageOptions = {}
): Promise<string[]> {
  const variations: string[] = [];

  for (let i = 0; i < count; i++) {
    const variationOptions = {
      ...options,
      seed: options.seed ? Number(options.seed) + i : Math.floor(Math.random() * 1000000) + i
    };

    try {
      const imageUrl = await generatePollinationsImageAsync(prompt, variationOptions);
      variations.push(imageUrl);
    } catch (error) {
      console.warn(`Failed to generate variation ${i + 1}:`, error);
    }
  }

  return variations;
}

/**
 * Processes an array of prompts sequentially with rate limiting
 * @param prompts - Array of prompt objects with prompt string and options
 * @returns Promise<string[]> - Array of generated image URLs
 */
export async function processPollinationsPromptsSequentially(
  prompts: Array<{ prompt: string; options?: ImageOptions }>
): Promise<string[]> {
  const results: string[] = [];
  
  // Process prompts sequentially with a delay between each
  for (let i = 0; i < prompts.length; i++) {
    try {
      const { prompt, options = {} } = prompts[i];
      const imageUrl = await generatePollinationsImageAsync(prompt, options);
      results.push(imageUrl);
      
      // Add a small delay between requests to respect rate limits
      if (i < prompts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`Failed to process prompt ${i + 1}:`, error);
      // Add a fallback URL for failed prompts
      results.push('https://image.pollinations.ai/prompt/placeholder');
    }
  }
  
  return results;
}