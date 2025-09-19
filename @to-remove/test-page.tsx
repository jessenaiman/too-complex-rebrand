'use client';

import React from 'react';
import Rebrandable from '@/components/rebrand/rebrandable';
import AIRebrandableContent from '@/components/rebrand/ai-rebrandable-content';
import RebrandableFeatureCard from '@/components/rebrand/rebrandable-feature-card';

/**
 * Test page to verify rebrandable components are working
 * This can be used to test the rebrandable components
 * 
 * @returns React component for testing rebrandable functionality
 */
const RebrandableTestPage = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <Rebrandable componentType="text" className="text-3xl font-bold mb-8 text-center">
          Rebrandable Components Test
        </Rebrandable>
        
        {/* Test basic rebrandable text */}
        <Rebrandable componentType="text" className="text-xl mb-6">
          This text should change color when the theme changes
        </Rebrandable>
        
        {/* Test rebrandable card */}
        <Rebrandable componentType="card" className="p-6 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold mb-4">Rebrandable Card</h2>
          <p>This card should change appearance when the theme changes</p>
        </Rebrandable>
        
        {/* Test AI rebrandable content */}
        <div className="mb-8">
          <Rebrandable componentType="text" className="text-2xl font-bold mb-4">
            AI-Generated Content
          </Rebrandable>
          <AIRebrandableContent />
        </div>
        
        {/* Test feature cards */}
        <div className="mb-8">
          <Rebrandable componentType="text" className="text-2xl font-bold mb-4">
            Feature Cards
          </Rebrandable>
          <RebrandableFeatureCard />
        </div>
      </div>
    </div>
  );
};

export default RebrandableTestPage;