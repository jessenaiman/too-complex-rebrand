import React, { useState, useEffect } from 'react';
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyP,
  TypographySmall,
} from "@/components/ui/typography";

const App = () => {
  const [isRebranded, setIsRebranded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [logoImage, setLogoImage] = useState("");

  // Generate image URLs from Pollinations API
  const generateImage = (prompt, isLogo = false) => {
    const width = isLogo ? 200 : 800;
    const height = isLogo ? 200 : 600;
    return `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;
  };

  // Load initial images
  useEffect(() => {
    setCurrentImage(generateImage("futuristic digital garden with glowing blue elements, cyberpunk aesthetic, high detail, 8k"));
    setLogoImage(generateImage("minimalist letter R logo with blue gradient, modern tech aesthetic", true));
  }, []);

  const handleRebrand = () => {
    setIsLoading(true);
    
    if (isRebranded) {
      // Switch back to original
      setCurrentImage(generateImage("futuristic digital garden with glowing blue elements, cyberpunk aesthetic, high detail, 8k"));
      setLogoImage(generateImage("minimalist letter R logo with blue gradient, modern tech aesthetic", true));
    } else {
      // Switch to rebranded
      setCurrentImage(generateImage("vibrant surreal landscape with pink and purple elements, dreamlike, magical, 8k"));
      setLogoImage(generateImage("stylized letter R+ logo with pink to purple gradient, artistic, modern", true));
    }
    
    // Simulate loading time
    setTimeout(() => {
      setIsRebranded(!isRebranded);
      setIsLoading(false);
    }, 2000);
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } }
  };

  const loadingVariants = {
    initial: { scale: 0 },
    animate: { 
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const navIconVariants = {
    hover: { 
      scale: 1.2,
      rotate: 180,
      transition: { duration: 0.3 }
    },
    tap: { 
      scale: 0.9,
      transition: { duration: 0.1 }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${
      isRebranded ? 'bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900' : 'bg-gradient-to-br from-gray-900 via-slate-800 to-blue-900'
    }`}>
      {/* RadixUI-style Navbar */}
      <motion.nav 
        className={`px-6 py-4 flex items-center justify-between border-b ${
          isRebranded 
            ? 'bg-black/20 border-pink-500/30 backdrop-blur-xl' 
            : 'bg-black/20 border-blue-500/30 backdrop-blur-xl'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-10 h-10 rounded-lg overflow-hidden border"
            variants={navIconVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleRebrand}
            style={{
              border: isRebranded ? '2px solid rgba(236, 72, 153, 0.5)' : '2px solid rgba(59, 130, 246, 0.5)'
            }}
          >
            {logoImage && (
              <img 
                src={logoImage} 
                alt="Brand Logo" 
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
          <TypographyH1
            className={`text-xl font-bold ${
              isRebranded ? 'text-pink-300' : 'text-blue-300'
            }`}
          >
            Pollinations Rebrand
          </TypographyH1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="link"
            className={`text-sm px-0 hover:underline shadow-none ${
              isRebranded ? 'text-purple-300' : 'text-blue-300'
            }`}
            asChild
          >
            <a href="#">Features</a>
          </Button>
          <Button
            variant="link"
            className={`text-sm px-0 hover:underline shadow-none ${
              isRebranded ? 'text-purple-300' : 'text-blue-300'
            }`}
            asChild
          >
            <a href="#">Documentation</a>
          </Button>
          <Button
            variant="link"
            className={`text-sm px-0 hover:underline shadow-none ${
              isRebranded ? 'text-purple-300' : 'text-blue-300'
            }`}
            asChild
          >
            <a href="#">Community</a>
          </Button>
        </div>
      </motion.nav>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TypographyH1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Dynamic Rebrand Experience
          </TypographyH1>
          <TypographyP className="text-xl text-gray-300 max-w-3xl mx-auto">
            Powered by Pollinations.AI - Click the logo or button below to transform the entire experience with AI-generated imagery
          </TypographyP>
        </motion.div>

        <div className="flex justify-center mb-12">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleRebrand}
              disabled={isLoading}
              className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center space-x-3 ${
                isRebranded
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/30'
              }`}
            >
              {isLoading ? (
                <>
                  <motion.div
                    variants={spinnerVariants}
                    animate="animate"
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Generating New Brand...</span>
                </>
              ) : (
                <>
                  <span>{isRebranded ? 'Switch Back' : 'Rebrand Now'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </Button>
          </motion.div>
        </div>

        <motion.div
          key={isRebranded ? 'rebranded' : 'original'}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto"
        >
          <div className={`${
            isRebranded 
              ? 'bg-gradient-to-br from-pink-500/20 to-purple-600/20 backdrop-blur-xl border border-pink-500/30' 
              : 'bg-gradient-to-br from-blue-500/20 to-cyan-600/20 backdrop-blur-xl border border-blue-500/30'
          } rounded-3xl p-8 shadow-2xl transform transition-all duration-700 hover:scale-105 overflow-hidden`}>
            
            {/* AI Generated Background Image */}
            <div className="relative mb-8 rounded-2xl overflow-hidden h-80">
              {currentImage ? (
                <img 
                  src={currentImage} 
                  alt="AI Generated Background" 
                  className="w-full h-full object-cover transition-opacity duration-1000"
                  style={{ opacity: isLoading ? 0.5 : 1 }}
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <motion.div
                    variants={spinnerVariants}
                    animate="animate"
                    className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"
                  />
                </div>
              )}
              
              {isLoading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      variants={spinnerVariants}
                      animate="animate"
                      className="w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <TypographyP className="text-white font-semibold">Generating AI Content...</TypographyP>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center">
              <TypographyH2
                className={`text-3xl font-bold mb-4 ${
                  isRebranded ? 'text-pink-300' : 'text-blue-300'
                }`}
              >
                {isRebranded ? 'Reimagined Brand' : 'Original Experience'}
              </TypographyH2>
              <TypographyP className="text-gray-300 text-center mb-6">
                {isRebranded
                  ? 'Experience the vibrant new look with our AI-generated brand identity and modern aesthetic.'
                  : 'Discover our original design crafted with attention to detail and powered by Pollinations.AI.'
                }
              </TypographyP>
              
              <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                <motion.div 
                  className={`h-2 rounded-full ${
                    isRebranded ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-cyan-600'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                ></motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    className={`p-4 rounded-xl text-center ${
                      isRebranded 
                        ? 'bg-gradient-to-br from-pink-500/30 to-purple-600/30 border border-pink-500/30' 
                        : 'bg-gradient-to-br from-blue-500/30 to-cyan-600/30 border border-blue-500/30'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 * item }}
                  >
                    <TypographyH3
                      className={`text-2xl font-bold mb-2 ${
                        isRebranded ? 'text-pink-300' : 'text-blue-300'
                      }`}
                    >
                      {item * 25}%
                    </TypographyH3>
                    <TypographySmall className="text-gray-300">
                      Feature {item}
                    </TypographySmall>
                  </motion.div>
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
          <TypographyH3 className="text-2xl font-bold text-white mb-4">
            Powered by Pollinations.AI
          </TypographyH3>
          <TypographyP className="text-gray-300 mb-4">
            All images are dynamically generated using the Pollinations.AI API, an open-source gen AI platform
            providing free text and image generation without requiring signups or API keys.
          </TypographyP>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
            >
              <a
                href="https://pollinations.ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Pollinations.AI
              </a>
            </Button>
            <Button
              asChild
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors"
              variant="secondary"
            >
              <a
                href="https://github.com/pollinations/pollinations"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-5 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>
    </div>
  );
};

export default App;