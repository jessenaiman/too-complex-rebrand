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

  return `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&nologo=true&seed=${seed}`;
}