'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { BlurFade } from '@/components/ui/blur-fade';
import { Loading } from '@/components/loading';

interface LoadingStateProps {
  elementType: 'default' | 'button' | 'image' | 'text';
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  elementType = 'default', 
  message = 'Rebranding...' 
}) => {
  // Render loading state based on element type
  switch (elementType) {
    case 'button':
      return (
        <div className="flex items-center space-x-2" aria-live="polite">
          <Loading />
          <span>{message}</span>
        </div>
      );
      
    case 'image':
      return (
        <BlurFade delay={0.25} inView>
          <div className="flex flex-col items-center space-y-2" aria-live="polite">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-500">{message}</span>
          </div>
        </BlurFade>
      );
      
    case 'default':
    default:
      return (
        <div className="w-full" aria-live="polite">
          <Progress value={66} className="w-full" />
          <span className="text-sm text-gray-500 mt-1">{message}</span>
        </div>
      );
  }
};

export default LoadingState;