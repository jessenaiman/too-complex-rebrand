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
          <span className="text-sm text-muted-foreground">{message}</span>
        </div>
      );
      
    case 'image':
      return (
        <BlurFade delay={0.25} inView>
          <div className="flex flex-col items-center space-y-2" aria-live="polite">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground">{message}</span>
          </div>
        </BlurFade>
      );
      
    case 'text':
      return (
        <BlurFade delay={0.25} inView>
          <div className="flex flex-col items-center space-y-2" aria-live="polite">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm text-muted-foreground">{message}</span>
          </div>
        </BlurFade>
      );
      
    case 'default':
    default:
      return (
        <div className="w-full space-y-2" aria-live="polite">
          <Progress value={66} className="w-full" />
          <span className="text-sm text-muted-foreground">{message}</span>
        </div>
      );
  }
};

export default LoadingState;