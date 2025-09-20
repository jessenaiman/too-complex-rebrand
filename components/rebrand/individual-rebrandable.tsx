'use client';

import React, { useState, useEffect } from 'react';
import { useDemoRebrand } from '@/hooks/use-demo-rebrand';
import { generateSingleAsset, rebrandEventEmitter } from '@/utils/rebrand-orchestrator';

/**
 * Individual rebrandable component that can be selected and rebranded independently
 * 
 * @param children - Content to display in the component
 * @param className - Additional CSS classes
 * @param componentId - Unique identifier for the component
 * @returns React component with individual rebranding capability
 */
interface IndividualRebrandableProps {
  children: React.ReactNode;
  className?: string;
  componentId: string;
  componentType?: 'card' | 'text' | 'image';
}

const IndividualRebrandable: React.FC<IndividualRebrandableProps> = ({ 
  children, 
  className = '',
  componentId,
  componentType = 'card'
}) => {
  const { isLoading, themeColors, currentImage } = useDemoRebrand();
  const [localImage, setLocalImage] = useState<string | null>(null);
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  // Listen for orchestrator events to coordinate animations
  useEffect(() => {
    const handleElementRebranded = (data?: unknown) => {
      if (data && typeof data === 'object' && 'elementType' in data && data.elementType === 'logo' && 'imageUrl' in data && typeof data.imageUrl === 'string') {
        setLocalImage(data.imageUrl);
        setIsLocalLoading(false);
      }
    };

    rebrandEventEmitter.on('elementRebranded', handleElementRebranded);

    return () => {
      rebrandEventEmitter.off('elementRebranded', handleElementRebranded);
    };
  }, []);

  // Apply theme-based styling
  const getThemedClassName = () => {
    switch (componentType) {
      case 'card':
        return `p-6 rounded-2xl bg-gradient-to-br ${themeColors.primary.replace('500', '500/20').replace('600', '600/20')} backdrop-blur-xl border ${themeColors.text.replace('text-', 'border-')}/40 ${className}`;
      case 'text':
        return `${themeColors.text} ${className}`;
      case 'image':
        return `rounded-xl ${className}`;
      default:
        return className;
    }
  };

  // Handle individual rebranding of this component using orchestrator
  const handleIndividualRebrand = async () => {
    setIsLocalLoading(true);

    try {
      // Use orchestrator to generate asset following theme → content → assets sequence
      const assetUrl = await generateSingleAsset(
        'logo', // Generate a logo-type asset for individual components
        {
          name: 'Ocean Breeze', // This would come from current theme
          className: 'ocean-breeze',
          mood: 'calm',
          feeling: 'refreshing',
          description: 'A clean, refreshing theme with cool blue tones that evoke a sense of calm and clarity'
        },
        {
          name: 'Nimbus Analytics',
          tagline: 'See Beyond the Numbers',
          description: 'AI-driven business insights'
        }
      );

      setLocalImage(assetUrl);
    } catch (error) {
      console.error('Error generating individual component asset:', error);
      setLocalImage(null);
      setIsLocalLoading(false);
    }
  };

  return (
    <div
      className={`${getThemedClassName()} cursor-pointer relative`}
      onClick={handleIndividualRebrand}
    >
      {componentType === 'image' && (isLocalLoading || isLoading) ? (
        <div className="w-full h-48 flex items-center justify-center bg-gray-800 rounded-xl">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-400">Rebranding...</p>
          </div>
        </div>
      ) : componentType === 'image' && localImage ? (
        <img 
          src={localImage} 
          alt="Rebranded component" 
          className="w-full h-48 object-cover rounded-xl"
          onError={(e) => {
            console.error("Error loading individual component image:", e);
            // Show fallback
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center"><div class="text-center"><div class="text-2xl mb-2">📷</div><p class="text-gray-400">Image unavailable</p></div></div>';
          }}
        />
      ) : componentType === 'image' ? (
        <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <p className="text-gray-400">Click to rebrand</p>
          </div>
        </div>
      ) : (
        children
      )}
      
      {/* Overlay to indicate this component is selectable */}
      <div 
        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
        title="Click to rebrand this component"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default IndividualRebrandable;