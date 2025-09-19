'use client';

import React, { useState, useEffect } from 'react';
import Rebrandable from '@/components/rebrand/rebrandable';
import { useAIContent } from '@/hooks/use-ai-content';
import { Loading } from '@/components/loading';
import { AnimatedCircularProgressBar } from '@/components/ui/animated-circular-progress-bar';
import ImageHandler from '@/components/ui/image-handler';

/**
 * Example component demonstrating how to add rebrandable AI-generated content to new elements
 * 
 * @returns React component showing rebrandable AI content
 */
const AIContentExample = () => {
  const [aiImage, setAiImage] = useState<string>('');
  const [aiText, setAiText] = useState<string>('');
  const { generateImage, generateText, isGenerating, error } = useAIContent();

  // Generate AI content when component mounts
  useEffect(() => {
    const loadAIContent = async () => {
      try {
        // Generate an image
        const image = await generateImage('modern business card background');
        setAiImage(image);
        
        // Generate some marketing text
        const text = await generateText('short marketing slogan for a tech company');
        setAiText(text);
      } catch (err) {
        console.error('Failed to load AI content:', err);
      }
    };
    
    loadAIContent();
  }, []);

  return (
    <div className="space-y-6">
      {/* Rebrandable card with AI-generated image */}
      <Rebrandable componentType="card" className="p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">AI-Generated Content</h2>
        {isGenerating ? (
          <div className="h-48 flex items-center justify-center">
            <div className="text-center">
              <AnimatedCircularProgressBar
                max={100}
                min={0}
                value={50}
                gaugePrimaryColor="from-blue-500"
                gaugeSecondaryColor="from-cyan-600"
              />
              <span className="text-white font-semibold">Generating...</span>
            </div>
          </div>
        ) : aiImage ? (
          <ImageHandler
            src={aiImage}
            alt="AI Generated"
            width={400}
            height={200}
            className="w-full h-48 object-cover rounded"
          />
        ) : (
          <div className="h-48 bg-gray-200 rounded flex items-center justify-center">
            No image available
          </div>
        )}
      </Rebrandable>
      
      {/* Rebrandable text with AI-generated content */}
      <Rebrandable componentType="text" className="text-xl font-medium">
        {aiText || 'AI-generated marketing text will appear here'}
      </Rebrandable>
      
      {error && (
        <Rebrandable componentType="card" className="p-4 bg-red-500/20 border border-red-500/40 rounded">
          <div className="text-red-300">Error: {error}</div>
        </Rebrandable>
      )}
    </div>
  );
};

export default AIContentExample;