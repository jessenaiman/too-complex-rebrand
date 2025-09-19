'use client';

import { useState, useCallback } from 'react';
import { generatePollinationsImageAsync, generatePollinationsTextAsync } from '@/utils/rebrand-ai';
import { useDemoRebrand } from '@/hooks/use-demo-rebrand';

/**
 * Hook for generating AI content with current theme context
 * 
 * @returns Object containing AI content generation functions and state
 * 
 * @example
 * ```tsx
 * const { generateImage, generateText, isGenerating, error } = useAIContent();
 * 
 * const handleGenerate = async () => {
 *   try {
 *     const image = await generateImage('modern business background');
 *     const text = await generateText('short marketing slogan');
 *   } catch (err) {
 *     console.error('Failed to generate content:', err);
 *   }
 * };
 * ```
 */
interface UseAIContentResult {
  /** Function to generate an AI image with the current theme context */
  generateImage: (prompt: string) => Promise<string>;
  /** Function to generate AI text with the current theme context */
  generateText: (prompt: string) => Promise<string>;
  /** Whether content is currently being generated */
  isGenerating: boolean;
  /** Error message if generation failed */
  error: string | null;
}

/**
 * Custom hook for generating AI content enhanced with current theme and business context
 * 
 * @returns {UseAIContentResult} Object with generation functions and state
 */
export const useAIContent = (): UseAIContentResult => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { themeColors } = useDemoRebrand();

  /**
   * Generate an AI image with the current theme context
   * 
   * @param prompt - Base prompt for image generation
   * @returns Promise resolving to image URL
   */
  const generateImage = useCallback(async (prompt: string): Promise<string> => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Enhance the prompt with current theme context
      const enhancedPrompt = `${prompt} in ${themeColors.primary.replace('from-', '').replace('-500', '')} theme, professional, high quality`;
      const imageUrl = await generatePollinationsImageAsync(enhancedPrompt);
      return imageUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate image';
      setError(errorMessage);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, [themeColors]);

  /**
   * Generate AI text with the current theme context
   * 
   * @param prompt - Base prompt for text generation
   * @returns Promise resolving to generated text
   */
  const generateText = useCallback(async (prompt: string): Promise<string> => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Enhance the prompt with current theme context
      const enhancedPrompt = `${prompt} with ${themeColors.primary.replace('from-', '').replace('-500', '')} theme, professional tone`;
      const text = await generatePollinationsTextAsync(enhancedPrompt);
      return text;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate text';
      setError(errorMessage);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, [themeColors]);

  return {
    generateImage,
    generateText,
    isGenerating,
    error
  };
};