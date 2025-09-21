'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Rebrand from '@/components/rebrand/rebrand';

/**
 * Example component showing how to make any page element rebrandable with AI content
 * This can be added to any page that uses the rebranding system
 *
 * @returns React component with rebrandable content
 */
const RebrandableFeatureCard = () => {
  const features = [
    {
      icon: '✨',
      title: 'AI-Powered',
      description: 'Dynamic content generation using advanced AI models for personalized branding'
    },
    {
      icon: '🎨',
      title: 'Theme Engine',
      description: 'Seamless theme switching with professional color schemes and animations'
    },
    {
      icon: '⚡',
      title: 'Real-Time',
      description: 'Instant rebranding with live preview and responsive design updates'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {features.map((feature, index) => (
        <Rebrand
          key={index}
          elementType="card"
          componentId={`feature-card-${index}`}
        >
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <CardTitle className="text-lg">
                <Rebrand elementType="text-block" componentId={`feature-title-${index}`}>
                  {feature.title}
                </Rebrand>
              </CardTitle>
              <CardDescription>
                <Rebrand elementType="text-block" componentId={`feature-desc-${index}`}>
                  {feature.description}
                </Rebrand>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Rebrand elementType="text-block" componentId={`feature-content-${index}`}>
                <Badge variant="outline" className="w-full justify-center">
                  Feature {index + 1}
                </Badge>
              </Rebrand>
            </CardContent>
          </Card>
        </Rebrand>
      ))}
    </div>
  );
};

export default RebrandableFeatureCard;