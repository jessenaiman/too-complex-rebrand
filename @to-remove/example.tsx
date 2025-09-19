'use client';

import React, { useState, useEffect } from 'react';
import Rebrandable from '@/components/rebrand/rebrandable';
import { useAIContent } from '@/hooks/use-ai-content';

const RebrandableExample = () => {
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
        const text = await generateText('short marketing slogan');
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
        <h2 className="text-2xl font-bold mb-4">AI-Generated Background</h2>
        {isGenerating ? (
          <div className="h-48 flex items-center justify-center">
            <div className="loading-spinner"></div>
            <span>Generating...</span>
          </div>
        ) : aiImage ? (
          <img 
            src={aiImage} 
            alt="AI Generated" 
            className="w-full h-48 object-cover rounded"
          />
        ) : (
          <div className="h-48 bg-gray-200 rounded flex items-center justify-center">
            No image available
          </div>
        )}
      </Rebrandable>
      
      {/* Rebrandable text with AI-generated content */}
      <Rebrandable componentType="text" className="text-xl">
        {aiText || 'AI-generated marketing text will appear here'}
      </Rebrandable>
      
      {error && (
        <div className="text-red-500 p-4 bg-red-50 rounded">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default RebrandableExample;