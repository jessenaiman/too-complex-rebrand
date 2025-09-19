'use client'

import React from 'react';
import RebrandPage from '@/components/rebrand/rebrand-page';
import { RebrandProvider } from '@/components/rebrand/rebrand-context';
import Rebrand from '@/components/rebrand/rebrand';
import { ShimmerButton } from '@/components/buttons/shimmer-button';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { ShinyButton } from '@/components/ui/shiny-button';

export default function Home() {
  return (
    <RebrandProvider>
      <main className="min-h-screen w-full">
        {/* First Page - Main Rebrand Page */}
        <RebrandPage />
        
        {/* Second Page - Component Showcase */}
        <section className="py-16 px-4 w-full">
          <div className="max-w-6xl mx-auto">
            <Rebrand elementType="text-block" componentId="showcase-title">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Component Showcase
              </h2>
            </Rebrand>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Logo Component */}
              <div className="rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Logo</h3>
                <Rebrand elementType="logo" componentId="showcase-logo">
                  <div className="h-32 flex items-center justify-center rounded-lg">
                    <span>Company Logo</span>
                  </div>
                </Rebrand>
              </div>
              
              {/* Button Components */}
              <div className="rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Buttons</h3>
                <div className="space-y-4">
                  <Rebrand elementType="button" componentId="showcase-button-1">
                    <ShimmerButton className="w-full">
                      Shimmer Button
                    </ShimmerButton>
                  </Rebrand>
                  <Rebrand elementType="button" componentId="showcase-button-2">
                    <RainbowButton className="w-full">
                      Rainbow Button
                    </RainbowButton>
                  </Rebrand>
                  <Rebrand elementType="button" componentId="showcase-button-3">
                    <ShinyButton className="w-full">
                      Shiny Button
                    </ShinyButton>
                  </Rebrand>
                </div>
              </div>
              
              {/* Card Component */}
              <div className="rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Card</h3>
                <Rebrand elementType="card" componentId="showcase-card">
                  <div className="rounded-lg p-6 text-white">
                    <h4 className="text-lg font-bold mb-2">Feature Card</h4>
                    <p className="mb-4">This is an example of a rebrandable card component.</p>
                    <Rebrand elementType="button" componentId="card-button">
                      <ShimmerButton size="sm">
                        Learn More
                      </ShimmerButton>
                    </Rebrand>
                  </div>
                </Rebrand>
              </div>
              
              {/* Text Component */}
              <div className="rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Text Block</h3>
                <Rebrand elementType="text-block" componentId="showcase-text">
                  <p>
                    This is a rebrandable text block. Click on it to see it transform with different themes.
                  </p>
                </Rebrand>
              </div>
              
              {/* Background Component */}
              <div className="rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Background</h3>
                <Rebrand elementType="background" componentId="showcase-background">
                  <div className="h-40 rounded-lg flex items-center justify-center">
                    <span className="font-bold">Background Area</span>
                  </div>
                </Rebrand>
              </div>
              
              {/* Theme Switcher */}
              <div className="rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Theme Switcher</h3>
                <Rebrand elementType="theme" componentId="showcase-theme">
                  <div className="rounded-lg p-4 text-white text-center">
                    <p className="mb-2">Click to switch themes</p>
                    <ShinyButton size="sm">
                      Rebrand Theme
                    </ShinyButton>
                  </div>
                </Rebrand>
              </div>
            </div>
            
            {/* Full Page Rebrand Button */}
            <div className="mt-12 text-center">
              <Rebrand elementType="theme" componentId="full-page-rebrand">
                <ShinyButton className="px-6 py-3 text-lg font-bold">
                  Rebrand Entire Page
                </ShinyButton>
              </Rebrand>
            </div>
          </div>
        </section>
      </main>
    </RebrandProvider>
  );
}