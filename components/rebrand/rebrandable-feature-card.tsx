'use client';

import React from 'react';
import Rebrandable from '@/components/rebrand/rebrandable';

/**
 * Example component showing how to make any page element rebrandable with AI content
 * This can be added to any page that uses the rebranding system
 * 
 * @returns React component with rebrandable content
 */
const RebrandableFeatureCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {[1, 2, 3].map((item) => (
        <Rebrandable 
          key={item} 
          componentType="card" 
          className="p-6 rounded-2xl text-center backdrop-blur-sm transition-all duration-500 hover:scale-105"
        >
          <div className="text-3xl mb-4">✨</div>
          <Rebrandable componentType="text" className="text-xl font-bold mb-3">
            Feature {item}
          </Rebrandable>
          <Rebrandable componentType="text" className="opacity-80">
            This feature description will change with the theme and can be enhanced with AI-generated content
          </Rebrandable>
        </Rebrandable>
      ))}
    </div>
  );
};

export default RebrandableFeatureCard;