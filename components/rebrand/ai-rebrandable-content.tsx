'use client';

import React, { useState, useEffect } from 'react';
import Rebrandable from '@/components/rebrand/rebrandable';
import { useAIContent } from '@/hooks/use-ai-content';
import { Loading } from '@/components/loading';

/**
 * Component that displays AI-generated content with rebranding support
 * 
 * @returns React component showing rebrandable AI content
 */
const AIRebrandableContent = () => {
  const [aiImage, setAiImage] = useState<string>('');
  const [aiText, setAiText] = useState<string>('');
  const { generateImage, generateText, isGenerating, error } = useAIContent();

  // Generate AI content when component mounts
  useEffect(() => {
    const loadAIContent = async () => {
      try {
        // Generate an image
        const image = await generateImage('modern business background');
        setAiImage(image);
        
        // Generate some marketing text
        const text = await generateText('short marketing slogan for a innovative company');
        setAiText(text);
      } catch (err) {
        console.error('Failed to load AI content:', err);
      }
    };
    
    loadAIContent();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Rebrandable card with AI-generated image */}
      <Rebrandable componentType="card" className="p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">AI-Generated Branding</h2>
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-gray-800">
          {isGenerating ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <Loading />
                <p className="text-white mt-2">Generating AI Content...</p>
              </div>
            </div>
          ) : aiImage ? (
            <img 
              src={aiImage} 
              alt="AI Generated Background" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🤖</div>
                <p className="text-gray-300">AI Content Loading</p>
              </div>
            </div>
          )}
        </div>
      </Rebrandable>
      
      {/* Rebrandable text with AI-generated content */}
      <Rebrandable componentType="card" className="p-6 rounded-2xl">
        <h3 className="text-xl font-bold mb-3">Dynamic Marketing Text</h3>
        <Rebrandable componentType="text" className="text-lg md:text-xl">
          {aiText || 'AI-generated marketing message will appear here after rebranding'}
        </Rebrandable>
      </Rebrandable>
      
      {error && (
        <Rebrandable componentType="card" className="p-4 bg-red-500/20 border border-red-500/40 rounded-xl">
          <div className="text-red-300">Error loading AI content: {error}</div>
        </Rebrandable>
      )}
    </div>
  );
};

export default AIRebrandableContent;