'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Rebrand from '@/components/rebrand/rebrand';
import { useAIContent } from '@/hooks/use-ai-content';
import { Loading } from '@/components/loading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
  }, [generateImage, generateText]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Rebrandable card with AI-generated image */}
      <Rebrand elementType="card" componentId="ai-image-card">
        <Card className="p-6 rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">AI-Generated Branding</CardTitle>
            <CardDescription>Dynamic visual content powered by AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden bg-muted/20 border-border/40">
              {isGenerating ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Loading />
                    <p className="text-foreground mt-2">Generating AI Content...</p>
                  </div>
                </div>
              ) : aiImage ? (
                <Image
                  src={aiImage}
                  alt="AI Generated Background"
                  width={400}
                  height={256}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🤖</div>
                    <p className="text-muted-foreground">AI Content Loading</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Rebrand>

      {/* Rebrandable text with AI-generated content */}
      <Rebrand elementType="card" componentId="ai-text-card">
        <Card className="p-6 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Dynamic Marketing Text</CardTitle>
            <CardDescription>AI-generated messaging</CardDescription>
          </CardHeader>
          <CardContent>
            <Rebrand elementType="text-block" componentId="ai-marketing-text">
              <p className="text-lg md:text-xl">
                {aiText || 'AI-generated marketing message will appear here after rebranding'}
              </p>
            </Rebrand>
          </CardContent>
        </Card>
      </Rebrand>

      {error && (
        <Rebrand elementType="card" componentId="ai-error-card">
          <Card className="p-4 bg-destructive/20 border border-destructive/40 rounded-xl">
            <CardContent>
              <div className="text-destructive-foreground">Error loading AI content: {error}</div>
            </CardContent>
          </Card>
        </Rebrand>
      )}
    </div>
  );
};

export default AIRebrandableContent;