'use client'
import ImageHandler from '@/components/ui/image-handler';
import RebrandFooter from '@/components/rebrand/rebrand-footer';
import { useState, useCallback, useEffect } from "react";
import { Loading } from "@/components/loading";
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { useDemoRebrand } from "@/hooks/use-demo-rebrand";

const App = () => {
  const { 
    isRebranded, 
    isLoading, 
    currentImage, 
    logoImage, 
    themeColors, 
    handleRebrand 
  } = useDemoRebrand();
  
  const [randomBorderColor, setRandomBorderColor] = useState("");
  const [randomBorderWidth, setRandomBorderWidth] = useState(2);
  const [shimmerKey, setShimmerKey] = useState(0);

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

  // Load initial random border
  useEffect(() => {
    generateRandomBorder();
  }, [generateRandomBorder]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);



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
      <nav 
        className={`px-6 py-4 flex items-center justify-between border-b backdrop-blur-xl z-20 relative border ${themeColors.text.replace('text-', 'border-')}/40 bg-black/30`}
      >
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 rounded-lg overflow-hidden border cursor-pointer"
            onClick={handleRebrand}
            style={{
              border: `2px solid ${themeColors.border}`
            }}
          >
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <AnimatedCircularProgressBar
                  max={100}
                  min={0}
                  value={33}
                  gaugePrimaryColor={themeColors.primary}
                  gaugeSecondaryColor={themeColors.secondary}
                />
              </div>
            ) : logoImage ? (
              <img 
                src={logoImage} 
                alt="Brand Logo" 
                width={40}
                height={40}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Error loading logo image:", e);
                  // Show a fallback letter
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center font-bold ${themeColors.text}">R</div>`;
                }}
              />
            ) : (
              <div className={`w-full h-full flex items-center justify-center font-bold ${themeColors.text}`}>
                R
              </div>
            )}
          </div>
          <h1 className={`text-xl font-bold ${themeColors.text}`}>
            Pollinations Rebrand
          </h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <button
            onClick={() => scrollToSection('features')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${themeColors.text} hover:${themeColors.text.replace('300', '100')} border-b-2 border-${themeColors.text.replace('text-', '')}/40`}
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${themeColors.text} hover:${themeColors.text.replace('300', '100')} border-b-2 border-${themeColors.text.replace('text-', '')}/40`}
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('community')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${themeColors.text} hover:${themeColors.text.replace('300', '100')} border-b-2 border-${themeColors.text.replace('text-', '')}/40`}
          >
            Community
          </button>
        </div>
      </nav>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12">
        <div 
          className="text-center mb-12"
        >
          <h1 
            key={shimmerKey}
            className={`text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${themeColors.primary}`}
          >
            Dynamic Rebrand Experience
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Powered by Pollinations.AI - Click the logo or button below to transform the entire experience with AI-generated imagery
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <button
            onClick={handleRebrand}
            disabled={isLoading}
            className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center space-x-3 relative overflow-hidden bg-gradient-to-r ${themeColors.primary} text-white shadow-lg hover:from-${themeColors.primary.split(' ')[1] || 'blue-600'} hover:to-${themeColors.primary.split(' ')[3] || 'cyan-700'} shadow-${themeColors.text.replace('text-', '')}/30`}
          >
            {isLoading ? (
              <>
                <Loading />
                <span>Rebranding...</span>
              </>
            ) : (
              <>
                <span>Rebrand</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </div>

        <div
          key={isRebranded ? 'rebranded' : 'original'}
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
                          {isLoading ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-700">
                <div className="text-center">
                  <AnimatedCircularProgressBar
                    max={100}
                    min={0}
                    value={66}
                    gaugePrimaryColor={themeColors.primary}
                    gaugeSecondaryColor={themeColors.secondary}
                  />
                  <p className="text-white font-semibold">Generating New Theme...</p>
                </div>
              </div>
            ) : currentImage ? (
              <img
                src={currentImage}
                alt="AI Generated Background"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-opacity duration-1000"
                onError={(e) => {
                  console.error("Error loading background image:", e);
                  // Set a fallback background
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"><div class="text-center"><div class="text-4xl mb-4">📷</div><p class="text-gray-400">Background image unavailable</p></div></div>';
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📷</div>
                  <p className="text-white font-semibold mb-2">Background Loading</p>
                  <Loading />
                </div>
              </div>
            )}
              
              {isLoading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                  <div className="text-center bg-black/80 p-6 rounded-2xl backdrop-blur-sm">
                    <AnimatedCircularProgressBar
                      max={100}
                      min={0}
                      value={100}
                      gaugePrimaryColor={themeColors.primary}
                      gaugeSecondaryColor={themeColors.secondary}
                    />
                    <p className="text-white font-semibold">Rebranding...</p>
                    <p className="text-gray-300 text-sm mt-2">Completing rebrand</p>
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
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${themeColors.primary}`}
                ></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className={`p-4 rounded-xl text-center backdrop-blur-sm bg-gradient-to-br ${themeColors.primary.replace('500', '500/30').replace('600', '600/30')} border ${randomBorderColor}`}
                    style={{ borderWidth: randomBorderWidth - 1 }}
                  >
                    <div className={`text-2xl font-bold mb-2 ${themeColors.text}`}>
                      {item * 25}%
                    </div>
                    <div className="text-sm text-gray-300">
                      Feature {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section 
          id="features"
          className="mb-16"
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
              <div
                key={index}
                className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105 bg-gradient-to-br ${themeColors.secondary.replace('400', '500/20').replace('600', '600/20')} border ${randomBorderColor}`}
                style={{ borderWidth: randomBorderWidth }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-bold mb-3 ${themeColors.text}`}>{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section 
          id="projects"
          className="mb-16"
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
              <div
                key={index}
                className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105 bg-gradient-to-br ${themeColors.primary.replace('500', '500/20').replace('600', '600/20')} border ${randomBorderColor}`}
                style={{ borderWidth: randomBorderWidth }}
              >
                <div className={`text-sm font-semibold mb-2 ${themeColors.text}`}>{project.category}</div>
                <h3 className={`text-lg font-bold mb-3 ${themeColors.text}`}>{project.name}</h3>
                <p className="text-gray-300">{project.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Community Section */}
        <section 
          id="community"
          className="mb-16"
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
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105 bg-gradient-to-br ${themeColors.secondary.replace('400', '500/20').replace('600', '600/20')} border ${randomBorderColor}`}
                style={{ borderWidth: randomBorderWidth }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className={`text-xl font-bold mb-3 ${themeColors.text}`}>{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Info Section */}
        <div
          className={`mt-16 p-8 rounded-3xl backdrop-blur-sm border bg-gradient-to-br ${themeColors.primary.replace('500', '500/20').replace('600', '600/20')} border-${themeColors.text.replace('text-', '')}/30`}
          style={{ borderWidth: randomBorderWidth + 1 }}
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
        </div>

        {/* Individual Rebranding Demo Section */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 text-center ${themeColors.text}`}>Try Individual Component Rebranding</h2>
          <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            Click on any of the components below to rebrand them individually. Each component can be rebranded independently of the others.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <IndividualRebrandable 
              componentId="demo-card-1" 
              componentType="card"
            >
              <h3 className="text-xl font-bold mb-3">Card 1</h3>
              <p>Click this card to rebrand it independently. Notice how it gets its own AI-generated background.</p>
            </IndividualRebrandable>
            
            <IndividualRebrandable 
              componentId="demo-image-1" 
              componentType="image"
            />
            
            <IndividualRebrandable 
              componentId="demo-card-2" 
              componentType="card"
            >
              <h3 className="text-xl font-bold mb-3">Card 2</h3>
              <p>This card can be rebranded separately from Card 1 and the image component.</p>
            </IndividualRebrandable>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IndividualRebrandable 
              componentId="demo-feature-1" 
              componentType="card"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${themeColors.primary} flex items-center justify-center flex-shrink-0`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Feature One</h3>
                  <p className="text-sm opacity-80">Click this feature box to rebrand it independently.</p>
                </div>
              </div>
            </IndividualRebrandable>
            
            <IndividualRebrandable 
              componentId="demo-feature-2" 
              componentType="card"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${themeColors.secondary} flex items-center justify-center flex-shrink-0`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Feature Two</h3>
                  <p className="text-sm opacity-80">Each component maintains its own rebranding state.</p>
                </div>
              </div>
            </IndividualRebrandable>
          </div>
        </div>
      </div>

      {/* Footer */}
      <RebrandFooter />
    </div>
  );
};

export default App;