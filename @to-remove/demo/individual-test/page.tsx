'use client';

import React from 'react';
import IndividualRebrandable from '@/components/rebrand/individual-rebrandable';
import { RebrandProvider } from '@/components/rebrand/rebrand-context';

/**
 * Simple test page for individual component rebranding
 * 
 * @returns React component for testing individual rebranding
 */
const IndividualRebrandTest = () => {
  return (
    <RebrandProvider>
      <div className="min-h-screen p-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-white">
            Individual Component Rebranding Test
          </h1>
          
          <div className="mb-8 p-4 rounded-xl bg-black/20 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 text-white">Instructions</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Click on any component with the rebrand icon (↻) to rebrand that specific component</li>
              <li>Each component can be rebranded independently of others</li>
              <li>Watch how each component gets its own unique AI-generated content</li>
            </ul>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <IndividualRebrandable 
              componentId="test-card-1" 
              componentType="card"
            >
              <h3 className="text-xl font-bold mb-3 text-white">Card 1</h3>
              <p className="text-gray-300">Click this card to rebrand it independently.</p>
            </IndividualRebrandable>
            
            <IndividualRebrandable 
              componentId="test-image-1" 
              componentType="image"
            />
            
            <IndividualRebrandable 
              componentId="test-card-2" 
              componentType="card"
            >
              <h3 className="text-xl font-bold mb-3 text-white">Card 2</h3>
              <p className="text-gray-300">This card can be rebranded separately.</p>
            </IndividualRebrandable>
          </div>
        </div>
      </div>
    </RebrandProvider>
  );
};

export default IndividualRebrandTest;