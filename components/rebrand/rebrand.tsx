'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRebrand } from './rebrand-context';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { rebrandEventEmitter, orchestrateElementRebrand } from '@/utils/rebrand-orchestrator';
import { applyTextAnimation } from '@/utils/rebrand-text-design';
import { applyButtonTheme } from '@/utils/rebrand-button';
import LoadingState from './loading-state';

// Define the type for theme colors
interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
}

interface RebrandProps {
  children: React.ReactNode;
  className?: string;
  elementType: 'logo' | 'button' | 'card' | 'text-block' | 'background' | 'theme';
  componentId?: string;
}

const Rebrand: React.FC<RebrandProps> = ({
  children,
  className = '',
  elementType,
  componentId
}) => {
  const {
    isRebranded,
    isLoading,
    triggerGlobalRebrand,
    theme,
    businessProfile
  } = useRebrand();
  
  const [localLoading, setLocalLoading] = useState(false);
  const [localRebranded, setLocalRebranded] = useState(false);
  const [rebrandedContent, setRebrandedContent] = useState<React.ReactNode>(children);
  const componentRef = useRef<HTMLDivElement>(null);

  // Handle rebranding for this specific element
  const handleRebrand = async () => {
    // For theme elements, trigger global rebrand
    if (elementType === 'theme') {
      await triggerGlobalRebrand();
      return;
    }

    // For individual elements, call the orchestrator
    setLocalLoading(true);
    
    try {
      // Call the orchestrator with element type
      const result = await orchestrateElementRebrand({
        elementType,
        currentThemeId: theme.name,
        companyContext: businessProfile
      });
      
      // Update content based on result
      let newContent: React.ReactNode = children;
      
      switch (elementType) {
        case 'logo':
          if (result?.imageUrl) {
            newContent = (
              <img
                src={result.imageUrl}
                alt={`${businessProfile.name} logo`}
                className={className}
              />
            );
          }
          break;
        case 'background':
          if (result?.imageUrl) {
            newContent = (
              <div
                className={`${className} bg-cover bg-center`}
                style={{ backgroundImage: `url(${result.imageUrl})` }}
              >
                {children}
              </div>
            );
          }
          break;
        case 'button':
          // For buttons, we would swap the component
          // This is a simplified implementation
          newContent = (
            <button
              ref={componentRef as React.RefObject<HTMLButtonElement>}
              className={`px-4 py-2 rounded-lg text-primary-foreground transition-all duration-300 bg-primary hover:opacity-90 ${className}`}
            >
              Rebranded Button
            </button>
          );
          break;
        case 'card':
          newContent = (
            <div
              ref={componentRef as React.RefObject<HTMLDivElement>}
              className={`rounded-lg p-6 text-card-foreground bg-card border border-border ${className}`}
            >
              {children}
            </div>
          );
          break;
        case 'text-block':
          newContent = (
            <div
              ref={componentRef as React.RefObject<HTMLDivElement>}
              className={`text-foreground ${className}`}
            >
              {children}
            </div>
          );
          break;
        default:
          // For other elements, keep the original content
          newContent = children;
      }
      
      setRebrandedContent(newContent);
      setLocalRebranded(true);
    } catch (error) {
      console.error(`Error rebranding ${elementType}:`, error);
    } finally {
      setLocalLoading(false);
    }
  };

  // Apply theme-coordinated animations when content is rebranded
  useEffect(() => {
    if (localRebranded && componentRef.current) {
      switch (elementType) {
        case 'text-block':
          applyTextAnimation(componentRef.current, {
            primary: 'var(--primary)',
            secondary: 'var(--secondary)',
            accent: 'var(--accent)',
            background: 'var(--background)',
            foreground: 'var(--foreground)',
            muted: 'var(--muted)',
            border: 'var(--border)'
          });
          break;
        case 'button':
          applyButtonTheme(componentRef.current, {
            primary: 'var(--primary)',
            secondary: 'var(--secondary)',
            accent: 'var(--accent)',
            background: 'var(--background)',
            foreground: 'var(--foreground)',
            muted: 'var(--muted)',
            border: 'var(--border)'
          });
          break;
        case 'card':
          // Apply theme to card
          if (componentRef.current) {
            componentRef.current.className = `${componentRef.current.className} bg-card border-border`;
          }
          break;
      }
    }
  }, [localRebranded, elementType]);

  // Listen for element rebranded events
  useEffect(() => {
    const handleElementRebranded = (data: unknown) => {
      if (typeof data === 'object' && data !== null && 'elementType' in data && componentId) {
        const elementData = data as { elementType: string };
        if (elementData.elementType === elementType) {
          // Update content based on the rebranded element
          setLocalRebranded(true);
        }
      }
    };
    
    rebrandEventEmitter.on('elementRebranded', handleElementRebranded);
    
    return () => {
      rebrandEventEmitter.off('elementRebranded', handleElementRebranded);
    };
  }, [elementType, componentId]);

  // Render loading state
  if (localLoading || isLoading) {
    // Determine loading state type based on element type
    let loadingType: 'default' | 'button' | 'image' | 'text' = 'default';
    
    switch (elementType) {
      case 'button':
        loadingType = 'button';
        break;
      case 'logo':
      case 'card':
        loadingType = 'image';
        break;
      default:
        loadingType = 'default';
    }
    
    return (
      <div
        ref={componentRef}
        className={`flex items-center justify-center ${className}`}
        aria-live="polite"
      >
        <LoadingState elementType={loadingType} />
      </div>
    );
  }

  // Render the component with tooltip
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            ref={componentRef}
            className={`${className} cursor-pointer`}
            onClick={handleRebrand}
            aria-label={`Click to rebrand this ${elementType}`}
            aria-live="polite"
            title="Click to regenerate"
          >
            {rebrandedContent}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to rebrand this element</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Rebrand;