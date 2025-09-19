'use client'

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { RebrandProvider, useRebrand } from './rebrand-context';
import { ShinyButton } from '@/components/ui/shiny-button';
import { ShimmerButton } from '@/components/buttons/shimmer-button';
import { RainbowButton } from '@/components/ui/rainbow-button';
import Rebrand from './rebrand';

// Define the type for rebrandable elements
interface RebrandableElement {
  id: string;
  type: string;
}

const RebrandContent = () => {
  const {
    isRebranded,
    isLoading,
    triggerGlobalRebrand,
    currentImage,
    logoImage,
    businessProfile
  } = useRebrand();

 const [rebrandableElements, setRebrandableElements] = useState<RebrandableElement[]>([]);

  // Load initial images
  useEffect(() => {
    triggerGlobalRebrand();
  }, []);

  // Register all rebrandable elements on the page
  useEffect(() => {
    // In a real implementation, we would query the DOM for all Rebrand components
    // For now, we'll just create a mock array
    setRebrandableElements([
      { id: 'logo', type: 'logo' },
      { id: 'card-1', type: 'card' },
      { id: 'card-2', type: 'card' },
      { id: 'button-1', type: 'button' },
      { id: 'text-1', type: 'text-block' }
    ]);
  }, []);

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  };

  const loadingVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1
    }
  };

  const spinnerVariants = {
    animate: {
      rotate: 360
    }
  };

  // Handle page-wide rebrand
  const handlePageRebrand = async () => {
    // Show full-screen loader
    // In a real implementation, we would show a full-screen loader here
    
    // Trigger global rebrand
    await triggerGlobalRebrand();
    
    // Process all rebrandable elements sequentially
    // In a real implementation, we would process each element and wait for success signals
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 bg-background`}>
      {/* Navbar with theme toggler */}
      <nav className="flex justify-between items-center p-6">
        <Rebrand elementType="logo" componentId="navbar-logo">
          {logoImage ? (
            <img src={logoImage} alt="Company Logo" className="h-12" />
          ) : (
            <div className="h-12 w-32 bg-gray-200 rounded-lg"></div>
          )}
        </Rebrand>
        
        <div className="flex items-center space-x-4">
          {/* Theme toggler would go here */}
          <button
            onClick={triggerGlobalRebrand}
            className={`px-4 py-2 rounded-lg text-primary-foreground transition-colors bg-primary hover:opacity-90`}
          >
            Rebrand
          </button>
        </div>
      </nav>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 text-foreground`}>
            Dynamic Rebrand Experience
          </h1>
          <p className={`text-xl max-w-3xl mx-auto text-muted-foreground`}>
            Powered by Pollinations.AI - Click the logo or button below to transform the entire experience with AI-generated imagery
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <ShinyButton
              onClick={handlePageRebrand}
              className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center space-x-3 bg-primary text-primary-foreground shadow-lg`}
              data-testid="rebrand-button"
            >
              {isLoading ? (
                <>
                  <motion.div
                    variants={spinnerVariants}
                    animate="animate"
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                  <span>Generating New Brand</span>
                </>
              ) : (
                <>
                  <span>{isRebranded ? 'Switch Back' : 'Rebrand Now'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 0 102 0V9.414l1.293 1.293a1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </ShinyButton>
          </motion.div>
        </div>

        <motion.div
          key={isRebranded ? 'rebranded' : 'original'}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto"
        >
          <div className={`rounded-3xl p-8 shadow-2xl transform transition-all duration-700 hover:scale-105 overflow-hidden bg-card border border-border`}>
            
            {/* AI Generated Background Image */}
            <div className="relative mb-8 rounded-2xl overflow-hidden h-80">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt="AI Generated Background"
                  className="w-full h-full object-cover transition-opacity duration-1000"
                  style={{ opacity: isLoading ? 0.5 : 1 }}
                  data-testid="ai-background-image"
                />
              ) : (
                <div className="w-full h-full bg-gray-70 flex items-center justify-center">
                  <motion.div
                    variants={spinnerVariants}
                    animate="animate"
                    className="w-8 h-8 border-4 border-foreground border-t-transparent rounded-full"
                  />
                </div>
              )}
              
              {isLoading && (
                <div
                  className="absolute inset-0 bg-black/50 flex items-center justify-center"
                  data-testid="rebrand-loading-overlay"
                >
                  <div className="text-center">
                    <motion.div
                      variants={spinnerVariants}
                      animate="animate"
                      className="w-8 h-8 border-4 border-foreground border-t-transparent rounded-full mx-auto mb-4"
                      data-testid="logo-loading-spinner"
                    />
                    <p className="text-foreground font-semibold">Generating New Brand</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center">
              <h2
                className={`text-3xl font-bold mb-4 text-foreground`}
              >
                {isRebranded ? 'Reimagined Brand' : 'Original Experience'}
              </h2>
              <p
                className={`text-center mb-6 text-muted-foreground`}
                data-testid="marketing-text"
              >
                {isRebranded
                  ? 'Experience the vibrant new look with our AI-generated brand identity and modern aesthetic.'
                  : 'Discover our original design crafted with attention to detail and powered by Pollinations.AI.'
                }
              </p>
              
              <div className="w-full bg-muted rounded-full h-2 mb-6">
                <motion.div
                  className={`h-2 rounded-full bg-primary`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                ></motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {[1, 2, 3].map((item) => (
                  <Rebrand key={item} elementType="card" componentId={`feature-card-${item}`}>
                    <motion.div
                      className={`p-4 rounded-xl text-center bg-card border border-border`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 * item }}
                    >
                      <h3
                        className={`text-2xl font-bold mb-2 text-foreground`}
                      >
                        {item * 25}%
                      </h3>
                      <p className="text-muted-foreground">
                        Feature {item}
                      </p>
                    </motion.div>
                  </Rebrand>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          className="mt-16 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className={`text-2xl font-bold mb-4 text-foreground`}>
            Powered by Pollinations.AI
          </h3>
          <p className={`mb-4 text-muted-foreground`}>
            All images are dynamically generated using the Pollinations.AI API, an open-source gen AI platform
            providing free text and image generation without requiring signups or API keys.
          </p>
          <div className="flex flex-wrap gap-4">
            <ShimmerButton
              className={`px-4 py-2 rounded-lg font-medium transition-colors bg-primary text-primary-foreground`}
            >
              <a
                href="https://pollinations.ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Pollinations.AI
              </a>
            </ShimmerButton>
            <RainbowButton
              asChild
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors"
              variant="outline"
            >
              <a
                href="https://github.com/pollinations/pollinations"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </RainbowButton>
          </div>
        </motion.div>

        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-5 w-24 h-24 bg-purple-50/10 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <RebrandProvider>
      <RebrandContent />
    </RebrandProvider>
  );
};

export default App;