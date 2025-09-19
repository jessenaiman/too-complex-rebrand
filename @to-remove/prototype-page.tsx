import React, { useState, useEffect, useCallback } from 'react';
import { motion } from "motion/react";
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { Loading } from '@/components/loading';
import Layout from './layout';

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
        `https://text.pollinations.ai/Generate%20a%20color%20theme%20for%20a%20${isRebranded ? 'futuristic%20tech' : 'vibrant%20creative'}%20website.%20Respond%20only%20with%20a%20JSON%20object%20with%20these%20properties:%20primaryGradient%20(string%20with%20Tailwind%20classes%20like%20'from-color-500%20to-color-600'),%20secondaryGradient%20(string),%20textColor%20(string%20like%20'text-color-300'),%20borderColor%20(string%20in%20rgba%20format),%20backgroundGradient%20(string).%20Use%20${isRebranded ? 'cool%20blues%20and%20cyans' : 'vibrant%20pinks%20and%20purples'}%20for%20theme.`
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
   const generateImage = useCallback((prompt: string, isLogo = false) => {
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

  const scrollToSection = useCallback((sectionId: string) => {
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

  return (
    <Layout 
      themeColors={themeColors} 
      handleRebrand={handleRebrand} 
      isRebranded={isRebranded} 
      logoImage={logoImage} 
      isLogoLoading={isLogoLoading} 
      scrollToSection={scrollToSection}
    >
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <AnimatedGradientText>
          Dynamic Rebrand Experience
        </AnimatedGradientText>
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
          className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center space-x-3 relative overflow-hidden bg-linear-to-r ${themeColors.primary} text-white shadow-lg hover:from-${themeColors.primary.split(' ')[1] || 'blue-600'} hover:to-${themeColors.primary.split(' ')[3] || 'cyan-700'} shadow-${themeColors.text.replace('text-', '')}/30`}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <span>{isRebranded ? 'Switch Back' : 'Rebrand Now'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
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
        <div className={`bg-linear-to-br ${themeColors.primary.replace('500', '500/20').replace('600', '600/20')} backdrop-blur-xl rounded-3xl p-8 shadow-2xl transform transition-all duration-700 hover:scale-105 overflow-hidden relative`}
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
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center bg-linear-to-br ${themeColors.primary}">
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
                className={`h-2 rounded-full bg-linear-to-r ${themeColors.primary}`}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
              ></motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  className={`p-4 rounded-xl text-center backdrop-blur-sm bg-linear-to-br ${themeColors.primary.replace('500', '500/30').replace('600', '600/30')} border ${randomBorderColor}`}
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
              className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105 bg-linear-to-br ${themeColors.secondary.replace('400', '500/20').replace('600', '600/20')} border ${randomBorderColor}`}
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
              className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105 bg-linear-to-br ${themeColors.primary.replace('500', '500/20').replace('600', '600/20')} border ${randomBorderColor}`}
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
              className={`block p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105 bg-linear-to-br ${themeColors.secondary.replace('400', '500/20').replace('600', '600/20')} border ${randomBorderColor}`}
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
        className={`mt-16 p-8 rounded-3xl backdrop-blur-sm border bg-linear-to-br ${themeColors.primary.replace('500', '500/20').replace('600', '600/20')} border-${themeColors.text.replace('text-', '')}/30`}
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
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 bg-linear-to-r ${themeColors.primary} text-white shadow-lg hover:from-${themeColors.primary.split(' ')[1] || 'blue-600'} hover:to-${themeColors.primary.split(' ')[3] || 'cyan-700'} shadow-${themeColors.text.replace('text-', '')}/30`}
          >
            <span>Visit Pollinations.AI</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
          <a 
            href="https://github.com/pollinations" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 bg-linear-to-r ${themeColors.secondary} text-white shadow-lg hover:from-${themeColors.secondary.split(' ')[1] || 'blue-600'} hover:to-${themeColors.secondary.split(' ')[3] || 'cyan-700'} shadow-${themeColors.text.replace('text-', '')}/30`}
          >
            <span>View on GitHub</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
              <path d="M10 4a1 1 0 011 1v4h4a1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
            </svg>
          </a>
        </div>
      </motion.div>
    </Layout>
  );
};

export default App;