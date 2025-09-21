'use client'

import React, { useEffect, useState } from 'react';
import { motion } from "motion/react";
import { RebrandProvider, useRebrand } from './rebrand-context';
import { ShinyButton } from '@/components/ui/shiny-button';
import { ShimmerButton } from '@/components/buttons/shimmer-button';
import { RainbowButton } from '@/components/ui/rainbow-button';
import Rebrand from './rebrand';
import { orchestrateRebrand, orchestrateElementRebrand, rebrandEventEmitter, RebrandData } from '@/utils/rebrand-orchestrator';

//TODO: Add jsdoc comments
//NOTE: Always use Image from 'next/image' for optimized images
import Image from 'next/image';

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
    } = useRebrand();

 const [rebrandableElements, setRebrandableElements] = useState<RebrandableElement[]>([]);


  // Query DOM for all Rebrand elements on the page
  useEffect(() => {
    const queryRebrandableElements = () => {
      // Query for all elements with data-rebrand-component attribute
      const rebrandElements = document.querySelectorAll('[data-rebrand-component]');

      const elements: RebrandableElement[] = [];

      rebrandElements.forEach((element, index) => {
        const componentId = element.getAttribute('data-rebrand-id') || `rebrand-${index}`;
        const componentType = element.getAttribute('data-rebrand-type') || 'card';

        elements.push({
          id: componentId,
          type: componentType
        });
      });

      return elements;
    };

    // Initial scan
    setRebrandableElements(queryRebrandableElements());

    // Set up observer for dynamic content
    const observer = new MutationObserver(() => {
      setRebrandableElements(queryRebrandableElements());
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-rebrand-component', 'data-rebrand-id', 'data-rebrand-type']
    });

    return () => observer.disconnect();
  }, []);

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  };

  

  const spinnerVariants = {
    animate: {
      rotate: 360
    }
  };

  // Handle page-wide rebrand with proper orchestrator integration
  const handlePageRebrand = async () => {
    try {
      // Trigger global rebrand first (theme → content → assets sequence)
      const rebrandData: RebrandData = await orchestrateRebrand();

      // Update global state first
      // This will trigger the global rebrand context update
      await triggerGlobalRebrand();

      // Process all rebrandable elements sequentially
      for (const element of rebrandableElements) {
        try {
          await orchestrateElementRebrand({
            elementType: element.type as 'logo' | 'button' | 'card' | 'text-block' | 'background' | 'theme',
            currentThemeId: rebrandData.theme.name,
            companyContext: rebrandData.businessProfile
          });

          // Small delay to respect rate limits
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
          console.error(`Failed to rebrand element ${element.id}:`, error);
          // Continue with other elements even if one fails
        }
      }

      // Emit page rebrand completed event
      rebrandEventEmitter.emit('pageRebrandCompleted', {
        rebrandedElements: rebrandableElements.length,
        rebrandData
      });

    } catch (error) {
      console.error('Page-wide rebrand failed:', error);
      rebrandEventEmitter.emit('pageRebrandError', { error });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 bg-background`}>
      {/* Navbar with theme toggler */}
      <nav className="flex justify-between items-center p-6">
        <Rebrand elementType="logo" componentId="navbar-logo">
          {logoImage ? (
            <Image src={logoImage} alt="Company Logo" width={128} height={48} className="h-12 w-auto" />
          ) : (
            <div className="h-12 w-32 bg-muted/20 rounded-lg"></div>
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

      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-foreground`}>
            Dynamic Rebrand Experience
          </h1>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl sm:max-w-3xl mx-auto text-muted-foreground`}>
            Powered by Pollinations.AI - Click the logo or button below to transform the entire experience with AI-generated imagery
          </p>
        </motion.div>

        <div className="flex justify-center mb-8 sm:mb-12">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <ShinyButton
              onClick={handlePageRebrand}
              className={`px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 flex items-center space-x-2 sm:space-x-3 bg-primary text-primary-foreground shadow-lg`}
              data-testid="rebrand-button"
            >
              {isLoading ? (
                <>
                  <motion.div
                    variants={spinnerVariants}
                    animate="animate"
                    className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                  <span className="text-sm sm:text-base">Generating New Brand</span>
                </>
              ) : (
                <>
                  <span className="text-sm sm:text-base">{isRebranded ? 'Switch Back' : 'Rebrand Now'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
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
          <div className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl transform transition-all duration-700 hover:scale-[1.02] overflow-hidden bg-card border border-border`}>
            
            {/* AI Generated Background Image */}
            <div className="relative mb-6 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden h-48 sm:h-80">
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt="AI Generated Background"
                  fill
                  className="object-cover transition-opacity duration-1000"
                  style={{ opacity: isLoading ? 0.5 : 1 }}
                  data-testid="ai-background-image"
                />
              ) : (
                <div className="w-full h-full bg-muted/20 flex items-center justify-center border border-border/40 rounded-xl">
                  <motion.div
                    variants={spinnerVariants}
                    animate="animate"
                    className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-foreground border-t-transparent rounded-full"
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
                      className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-foreground border-t-transparent rounded-full mx-auto mb-3 sm:mb-4"
                      data-testid="logo-loading-spinner"
                    />
                    <p className="text-foreground font-semibold text-sm sm:text-base">Generating New Brand</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center">
              <h2
                className={`text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-foreground`}
              >
                {isRebranded ? 'Reimagined Brand' : 'Original Experience'}
              </h2>
              <p
                className={`text-center mb-4 sm:mb-6 text-sm sm:text-base text-muted-foreground`}
                data-testid="marketing-text"
              >
                {isRebranded
                  ? 'Experience the vibrant new look with our AI-generated brand identity and modern aesthetic.'
                  : 'Discover our original design crafted with attention to detail and powered by Pollinations.AI.'
                }
              </p>
              
              <div className="w-full bg-muted rounded-full h-1.5 sm:h-2 mb-4 sm:mb-6">
                <motion.div
                  className={`h-1.5 sm:h-2 rounded-full bg-primary`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                ></motion.div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
                {[1, 2, 3].map((item) => (
                  <Rebrand key={item} elementType="card" componentId={`feature-card-${item}`}>
                    <motion.div
                      className={`p-3 sm:p-4 rounded-lg sm:rounded-xl text-center bg-card border border-border`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 * item }}
                    >
                      <h3
                        className={`text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-foreground`}
                      >
                        {item * 25}%
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
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
          className="mt-12 sm:mt-16 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground`}>
            Powered by Pollinations.AI
          </h3>
          <p className={`mb-4 text-sm sm:text-base text-muted-foreground`}>
            All images are dynamically generated using the Pollinations.AI API, an open-source gen AI platform
            providing free text and image generation without requiring signups or API keys.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <ShimmerButton
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors bg-primary text-primary-foreground text-sm sm:text-base`}
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
              className="px-3 py-2 sm:px-4 sm:py-2 bg-muted hover:bg-muted/80 rounded-lg text-foreground font-medium transition-colors text-sm sm:text-base"
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
        <div className="absolute top-16 sm:top-20 left-4 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-pink-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-10 w-32 sm:w-48 h-32 sm:h-48 bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-2 sm:left-5 w-16 sm:w-24 h-16 sm:h-24 bg-purple-50/10 rounded-full blur-xl sm:blur-2xl animate-bounce"></div>
        <div className="absolute bottom-8 sm:bottom-10 left-1/4 sm:left-1/3 w-16 sm:w-20 h-16 sm:h-20 bg-cyan-500/10 rounded-full blur-lg sm:blur-xl animate-pulse delay-700"></div>
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