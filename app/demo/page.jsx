import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [isRebranded, setIsRebranded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isThemeLoading, setIsThemeLoading] = useState(false);
  const [isLogoLoading, setIsLogoLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [logoImage, setLogoImage] = useState("");
  const [randomBorderColor, setRandomBorderColor] = useState("");
  const [randomBorderWidth, setRandomBorderWidth] = useState(2);
  const [shimmerKey, setShimmerKey] = useState(0);
  const [themeColors, setThemeColors] = useState({
    primary: 'from-blue-500 to-cyan-600',
    secondary: 'from-blue-400 to-cyan-600',
    text: 'text-blue-300',
    border: 'rgba(59, 130, 246, 0.5)',
    background: 'from-gray-900 via-slate-800 to-blue-900'
  });

  // Generate random border properties
  const generateRandomBorder = useCallback(() => {
    const colors = [
      'border-pink-400', 'border-purple-400', 'border-blue-400', 
      'border-cyan-400', 'border-indigo-400', 'border-violet-400',
      'border-rose-400', 'border-fuchsia-400', 'border-emerald-400',
      'border-teal-400', 'border-amber-400', 'border-orange-400'
    ];
    const widths = [1, 2, 3, 4, 5];
    
    setRandomBorderColor(colors[Math.floor(Math.random() * colors.length)]);
    setRandomBorderWidth(widths[Math.floor(Math.random() * widths.length)]);
  }, []);

  // Fetch theme from Pollinations text API
  const fetchNewTheme = useCallback(async () => {
    setIsThemeLoading(true);
    
    try {
      const response = await fetch(
        `https://text.pollinations.ai/Generate%20a%20color%20theme%20for%20a%20${isRebranded ? 'futuristic%20tech' : 'vibrant%20creative'}%20website.%20Respond%20only%20with%20a%20JSON%20object%20with%20these%20properties:%20primaryGradient%20(string%20with%20Tailwind%20classes%20like%20'from-color-500%20to-color-600'),%20secondaryGradient%20(string),%20textColor%20(string%20like%20'text-color-300'),%20borderColor%20(string%20in%20rgba%20format),%20backgroundGradient%20(string).%20Use%20${isRebranded ? 'cool%20blues%20and%20cyans' : 'vibrant%20pinks%20and%20purples'}%20for%20the%20theme.`
      );
      
      const text = await response.text();
      
      // Try to extract JSON from response
      let themeData;
      try {
        // Look for JSON in the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          themeData = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found');
        }
        
        // Validate the theme data
        if (themeData.primaryGradient && themeData.secondaryGradient && 
            themeData.textColor && themeData.borderColor && themeData.backgroundGradient) {
          setThemeColors({
            primary: themeData.primaryGradient,
            secondary: themeData.secondaryGradient,
            text: themeData.textColor,
            border: themeData.borderColor,
            background: themeData.backgroundGradient
          });
        } else {
          throw new Error('Invalid theme format');
        }
      } catch (e) {
        // Fallback to predefined theme if parsing fails
        const fallbackTheme = isRebranded ? {
          primary: 'from-blue-500 to-cyan-600',
          secondary: 'from-blue-400 to-cyan-600',
          text: 'text-blue-300',
          border: 'rgba(59, 130, 246, 0.5)',
          background: 'from-gray-900 via-slate-800 to-blue-900'
        } : {
          primary: 'from-pink-500 to-purple-600',
          secondary: 'from-pink-400 to-purple-600',
          text: 'text-pink-300',
          border: 'rgba(236, 72, 153, 0.5)',
          background: 'from-purple-900 via-pink-900 to-indigo-900'
        };
        setThemeColors(fallbackTheme);
      }
    } catch (error) {
      console.error('Error fetching theme:', error);
      // Use fallback theme
      const fallbackTheme = isRebranded ? {
        primary: 'from-blue-500 to-cyan-600',
        secondary: 'from-blue-400 to-cyan-600',
        text: 'text-blue-300',
        border: 'rgba(59, 130, 246, 0.5)',
        background: 'from-gray-900 via-slate-800 to-blue-900'
      } : {
        primary: 'from-pink-500 to-purple-600',
        secondary: 'from-pink-400 to-purple-600',
        text: 'text-pink-300',
        border: 'rgba(236, 72, 153, 0.5)',
        background: 'from-purple-900 via-pink-900 to-indigo-900'
      };
      setThemeColors(fallbackTheme);
    } finally {
      setIsThemeLoading(false);
    }
  }, [isRebranded]);

  // Generate image URLs from Pollinations API with error handling
  const generateImage = useCallback((prompt, isLogo = false) => {
    const width = isLogo ? 200 : 800;
    const height = isLogo ? 200 : 600;
    const seed = Math.floor(Math.random() * 1000);
    return `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&nologo=true&seed=${seed}`;
  }, []);

  // Load initial images and theme
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      
      // Set initial theme
      const initialTheme = {
        primary: 'from-blue-500 to-cyan-600',
        secondary: 'from-blue-400 to-cyan-600',
        text: 'text-blue-300',
        border: 'rgba(59, 130, 246, 0.5)',
        background: 'from-gray-900 via-slate-800 to-blue-900'
      };
      setThemeColors(initialTheme);
      
      // Generate initial images
      const logoUrl = generateImage("minimalist letter R logo with blue gradient, modern tech aesthetic", true);
      const heroUrl = generateImage("futuristic digital garden with glowing blue elements, cyberpunk aesthetic, high detail, 8k");
      
      // Load logo
      const loadLogo = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          setLogoImage(logoUrl);
          resolve(true);
        };
        img.onerror = () => {
          setLogoImage(""); // Set empty if fails
          resolve(false);
        };
        img.src = logoUrl;
      });
      
      // Load hero image
      const loadHero = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          setCurrentImage(heroUrl);
          resolve(true);
        };
        img.onerror = () => {
          setCurrentImage(""); // Set empty if fails
          resolve(false);
        };
        img.src = heroUrl;
      });
      
      await Promise.all([loadLogo, loadHero]);
      generateRandomBorder();
      setIsLoading(false);
    };
    
    init();
  }, [generateImage, generateRandomBorder]);

  const handleRebrand = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setShimmerKey(prev => prev + 1); // Trigger shimmer effect
    generateRandomBorder();
    
    try {
      // Step 1: Fetch new theme
      await fetchNewTheme();
      
      // Step 2: Generate new logo based on theme
      setIsLogoLoading(true);
      const logoPrompt = isRebranded 
        ? "minimalist letter R logo with blue gradient, modern tech aesthetic, professional design" 
        : "stylized letter R+ logo with pink to purple gradient, artistic, modern, creative design";
      const newLogoUrl = generateImage(logoPrompt, true);
      
      const logoLoaded = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          setLogoImage(newLogoUrl);
          resolve(true);
        };
        img.onerror = () => {
          // Fallback logo text
          setLogoImage("");
          resolve(false);
        };
        img.src = newLogoUrl;
      });
      
      setIsLogoLoading(false);
      
      // Step 3: Generate new hero image based on theme
      setIsImageLoading(true);
      const imagePrompt = isRebranded 
        ? "futuristic digital garden with glowing blue elements, cyberpunk aesthetic, high detail, 8k, professional tech design" 
        : "vibrant surreal landscape with pink and purple elements, dreamlike, magical, 8k, creative artistic design";
      const newImageUrl = generateImage(imagePrompt);
      
      const imageLoaded = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          setCurrentImage(newImageUrl);
          resolve(true);
        };
        img.onerror = () => {
          setCurrentImage("");
          resolve(false);
        };
        img.src = newImageUrl;
      });
      
      setIsImageLoading(false);
      
      // Complete rebrand
      setIsRebranded(!isRebranded);
      
    } catch (error) {
      console.error('Error during rebrand:', error);
      // Still toggle the state even if there are errors
      setIsRebranded(!isRebranded);
    } finally {
      setIsLoading(false);
      setIsThemeLoading(false);
      setIsLogoLoading(false);
      setIsImageLoading(false);
    }
  }, [isRebranded, isLoading, fetchNewTheme, generateImage, generateRandomBorder]);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // Card animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Spinner animation
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

  // Nav icon animation
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

  // Shimmer effect for text
  const shimmerVariants = {
    initial: {
      backgroundPosition: "200% 0"
    },
    animate: {
      backgroundPosition: "-200% 0",
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Animated border effect
  const animatedBorderVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: [
        `0 0 0 0 ${themeColors.border}`,
        `0 0 0 15px ${themeColors.border.replace('0.5', '0')}`,
        `0 0 0 0 ${themeColors.border}`
      ],
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 bg-gradient-to-br ${themeColors.background}`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-30 animate-pulse bg-gradient-to-r ${themeColors.secondary}`}></div>
        <div className={`absolute top-3/4 right-1/4 w-80 h-80 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000 bg-gradient-to-r ${themeColors.secondary}`}></div>
        <div className={`absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full filter blur-2xl opacity-25 animate-bounce bg-gradient-to-r ${themeColors.primary}`}></div>
        <div className={`absolute top-1/3 right-1/3 w-72 h-72 rounded-full filter blur-3xl opacity-15 animate-pulse delay-700 bg-gradient-to-r ${themeColors.secondary}`}></div>
      </div>

      {/* RadixUI-style Navbar */}
      <motion.nav 
        className={`px-6 py-4 flex items-center justify-between border-b backdrop-blur-xl z-20 relative border ${themeColors.text.replace('text-', 'border-')}/40 bg-black/30`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-10 h-10 rounded-lg overflow-hidden border cursor-pointer"
            variants={navIconVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleRebrand}
            style={{
              border: `2px solid ${themeColors.border}`
            }}
          >
            {isLogoLoading ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <motion.div
                  variants={spinnerVariants}
                  animate="animate"
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                />
              </div>
            ) : logoImage ? (
              <img 
                src={logoImage} 
                alt="Brand Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = isRebranded ? 'R' : 'R+';
                }}
              />
            ) : (
              <div className={`w-full h-full flex items-center justify-center font-bold ${themeColors.text}`}>
                {isRebranded ? 'R' : 'R+'}
              </div>
            )}
          </motion.div>
          <h1 className={`text-xl font-bold ${themeColors.text}`}>
            Pollinations Rebrand
          </h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <motion.button
            whileHover="hover"
            variants={animatedBorderVariants}
            onClick={() => scrollToSection('features')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${themeColors.text} hover:${themeColors.text.replace('300', '100')} border-b-2 border-${themeColors.text.replace('text-', '')}/40`}
          >
            Features
          </motion.button>
          <motion.button
            whileHover="hover"
            variants={animatedBorderVariants}
            onClick={() => scrollToSection('projects')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${themeColors.text} hover:${themeColors.text.replace('300', '100')} border-b-2 border-${themeColors.text.replace('text-', '')}/40`}
          >
            Projects
          </motion.button>
          <motion.button
            whileHover="hover"
            variants={animatedBorderVariants}
            onClick={() => scrollToSection('community')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${themeColors.text} hover:${themeColors.text.replace('300', '100')} border-b-2 border-${themeColors.text.replace('text-', '')}/40`}
          >
            Community
          </motion.button>
        </div>
      </motion.nav>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            key={shimmerKey}
            className={`text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${themeColors.primary}`}
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
          >
            Dynamic Rebrand Experience
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Powered by Pollinations.AI - Click the logo or button below to transform the entire experience with AI-generated imagery
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <motion.button
            onClick={handleRebrand}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center space-x-3 relative overflow-hidden bg-gradient-to-r ${themeColors.primary} text-white shadow-lg hover:from-${themeColors.primary.split(' ')[1] || 'blue-600'} hover:to-${themeColors.primary.split(' ')[3] || 'cyan-700'} shadow-${themeColors.text.replace('text-', '')}/30`}
          >
            {isLoading ? (
              <>
                <motion.div
                  variants={spinnerVariants}
                  animate="animate"
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Rebranding...</span>
              </>
            ) : (
              <>
                <span>{isRebranded ? 'Switch Back' : 'Rebrand Now'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </motion.button>
        </div>

        <motion.div
          key={isRebranded ? 'rebranded' : 'original'}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto mb-16"
        >
          <div className={`bg-gradient-to-br ${themeColors.primary.replace('500', '500/20').replace('600', '600/20')} backdrop-blur-xl rounded-3xl p-8 shadow-2xl transform transition-all duration-700 hover:scale-105 overflow-hidden relative`}
          style={{ 
            borderWidth: randomBorderWidth, 
            borderStyle: 'solid',
            borderColor: themeColors.border
          }}
          >
            
            {/* AI Generated Background Image */}
            <div className="relative mb-8 rounded-2xl overflow-hidden h-80 bg-gray-800">
              {isImageLoading ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-700">
                  <div className="text-center">
                    <motion.div
                      variants={spinnerVariants}
                      animate="animate"
                      className="w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-white font-semibold">Generating New Theme...</p>
                  </div>
                </div>
              ) : currentImage ? (
                <img 
                  src={currentImage} 
                  alt="AI Generated Background" 
                  className="w-full h-full object-cover transition-opacity duration-1000"
                  style={{ opacity: isLoading ? 0.5 : 1 }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br ${themeColors.primary}">
                        <div class="text-center">
                          <div class="text-6xl mb-4">🎨</div>
                          <p class="text-xl font-semibold text-white">Image Generation Failed</p>
                          <p class="text-sm mt-2 text-gray-300">Try again or check your connection</p>
                        </div>
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🤖</div>
                    <p className="text-white font-semibold mb-2">Loading AI Content</p>
                    <motion.div
                      variants={spinnerVariants}
                      animate="animate"
                      className="w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto"
                    />
                  </div>
                </div>
              )}
              
              {(isLoading || isThemeLoading || isLogoLoading || isImageLoading) && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                  <div className="text-center bg-black/80 p-6 rounded-2xl backdrop-blur-sm">
                    <motion.div
                      variants={spinnerVariants}
                      animate="animate"
                      className="w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-white font-semibold">
                      {isThemeLoading ? 'Generating Theme...' : 
                       isLogoLoading ? 'Creating Logo...' : 
                       isImageLoading ? 'Generating Image...' : 'Rebranding...'}
                    </p>
                    <p className="text-gray-300 text-sm mt-2">
                      {isThemeLoading ? 'AI is creating a new color scheme' : 
                       isLogoLoading ? 'Designing a new logo' : 
                       isImageLoading ? 'Creating hero image' : 'Completing rebrand'}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center">
              <h2 className={`text-3xl font-bold mb-4 ${themeColors.text}`}>
                {isRebranded ? 'Reimagined Brand' : 'Original Experience'}
              </h2>
              
              <p className="text-gray-300 text-center mb-6">
                {isRebranded 
                  ? 'Experience the vibrant new look with our AI-generated brand identity and modern aesthetic.' 
                  : 'Discover our original design crafted with attention to detail and powered by Pollinations.AI.'
                }
              </p>
              
              <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                <motion.div 
                  className={`h-2 rounded-full bg-gradient-to-r ${themeColors.primary}`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                ></motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    className={`p-4 rounded-xl text-center backdrop-blur-sm bg-gradient-to-br ${themeColors.primary.replace('500', '500/30').replace('600', '600/30')} border ${randomBorderColor}`}
                    style={{ borderWidth: randomBorderWidth - 1 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 * item }}
                  >
                    <div className={`text-2xl font-bold mb-2 ${themeColors.text}`}>
                      {item * 25}%
                    </div>
                    <div className="text-sm text-gray-300">
                      Feature {item}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.section 
          id="features"
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`text-3xl font-bold mb-8 text-center ${themeColors.text}`}>Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "🔓 100% Open Source",
                description: "No signups or API keys required. We prioritize your privacy with zero data storage and completely anonymous usage.",
                icon: "🔓"
              },
              {
                title: "🖼️ Image Generation",
                description: "Generate stunning AI images from text descriptions with our simple API. Just visit pollinations.ai and start creating!",
                icon: "🖼️"
              },
              {
                title: "🎵 Audio Generation",
                description: "New text-to-speech and speech-to-text capabilities are now available! Try the openai-audio model.",
                icon: "🎵"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105 bg-gradient-to-br ${themeColors.secondary.replace('400', '500/20').replace('600', '600/20')} border ${randomBorderColor}`}
                style={{ borderWidth: randomBorderWidth }}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-bold mb-3 ${themeColors.text}`}>{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          id="projects"
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`text-3xl font-bold mb-8 text-center ${themeColors.text}`}>Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "MoneyPrinterTurbo (⭐ 38.0k)",
                description: "Simply provide a topic or keyword for a video, and it will automatically generate engaging content.",
                category: "Creative"
              },
              {
                name: "tgpt (⭐ 2.7k)",
                description: "ChatGPT in terminal without requiring API keys. Uses Pollinations API endpoints for text generation.",
                category: "Hack & Build"
              },
              {
                name: "Mindcraft (⭐ 3.5k)",
                description: "A web-based Minecraft-inspired game where players can use natural language to generate and modify the game world.",
                category: "Games"
              },
              {
                name: "LobeChat (⭐ 21.0k)",
                description: "An open-source, extensible chat UI framework supporting multiple models and plugins.",
                category: "Chat"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105 bg-gradient-to-br ${themeColors.primary.replace('500', '500/20').replace('600', '600/20')} border ${randomBorderColor}`}
                style={{ borderWidth: randomBorderWidth }}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className={`text-sm font-semibold mb-2 ${themeColors.text}`}>{project.category}</div>
                <h3 className={`text-lg font-bold mb-3 ${themeColors.text}`}>{project.name}</h3>
                <p className="text-gray-300">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Community Section */}
        <motion.section 
          id="community"
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`text-3xl font-bold mb-8 text-center ${themeColors.text}`}>Join Our Community</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "GitHub",
                description: "Contribute to our open-source project or submit your own creations built with Pollinations.AI",
                link: "https://github.com/pollinations/pollinations",
                icon: "🐙"
              },
              {
                title: "Discord",
                description: "Join our vibrant community to share creations, get support, and collaborate with fellow AI enthusiasts",
                link: "https://discord.gg/k9F7SyTgqn",
                icon: "💬"
              },
              {
                title: "Documentation",
                description: "Explore our comprehensive API documentation and learn how to integrate Pollinations into your projects",
                link: "https://pollinations.ai/docs",
                icon: "📚"
              }
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105 bg-gradient-to-br ${themeColors.secondary.replace('400', '500/20').replace('600', '600/20')} border ${randomBorderColor}`}
                style={{ borderWidth: randomBorderWidth }}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className={`text-xl font-bold mb-3 ${themeColors.text}`}>{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Info Section */}
        <motion.div
          className={`mt-16 p-8 rounded-3xl backdrop-blur-sm border bg-gradient-to-br ${themeColors.primary.replace('500', '500/20').replace('600', '600/20')} border-${themeColors.text.replace('text-', '')}/30`}
          style={{ borderWidth: randomBorderWidth + 1 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">Powered by Pollinations.AI</h3>
          <p className="text-gray-300 mb-6">
            All images are dynamically generated using the Pollinations.AI API, an open-source gen AI platform 
            providing free text and image generation without requiring signups or API keys.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://pollinations.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 bg-gradient-to-r ${themeColors.primary} text-white shadow-lg hover:from-${themeColors.primary.split(' ')[1] || 'blue-600'} hover:to-${themeColors.primary.split(' ')[3] || 'cyan-700'} shadow-${themeColors.text.replace('text-', '')}/30`}
            >
              <span>Visit Pollinations.AI</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            <a 
              href="https://github.com/pollinations/pollinations" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 bg-gradient-to-r ${themeColors.secondary} text-white shadow-lg hover:from-${themeColors.secondary.split(' ')[1] || 'blue-600'} hover:to-${themeColors.secondary.split(' ')[3] || 'cyan-700'} shadow-${themeColors.text.replace('text-', '')}/30`}
            >
              <span>View on GitHub</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className={`py-8 px-6 border-t backdrop-blur-xl bg-gradient-to-r ${themeColors.background.replace('900', '900/50')} border-${themeColors.text.replace('text-', '')}/30`}
        style={{ borderWidth: randomBorderWidth }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className={`text-lg font-bold mb-4 ${themeColors.text}`}>Pollinations.AI</h4>
              <p className="text-gray-400 text-sm">
                Open-source gen AI startup providing free text and image generation API.
              </p>
            </div>
            <div>
              <h4 className={`text-lg font-bold mb-4 ${themeColors.text}`}>Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`text-lg font-bold mb-4 ${themeColors.text}`}>Features</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Image Generation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Text Generation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Audio Generation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">MCP Server</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`text-lg font-bold mb-4 ${themeColors.text}`}>Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className={`p-2 rounded-full transition-colors hover:bg-${themeColors.text.replace('text-', '')}/20`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className={`p-2 rounded-full transition-colors hover:bg-${themeColors.text.replace('text-', '')}/20`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className={`p-2 rounded-full transition-colors hover:bg-${themeColors.text.replace('text-', '')}/20`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>© 2023 Pollinations.AI. Open-source software licensed under the MIT license.</p>
            <p className="mt-2">Made with ❤️ by the Pollinations.AI team</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default App;