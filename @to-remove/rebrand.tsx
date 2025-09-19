import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const App = () => {
  const [isRebranded, setIsRebranded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRebrand = () => {
    setIsLoading(true);
    // Simulate loading time
    setTimeout(() => {
      setIsRebranded(!isRebranded);
      setIsLoading(false);
    }, 1500);
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: (t: number) => t }, // linear as a valid EasingFunction
    },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
  };

  const loadingVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: (t: number) => t, // linear as a valid EasingFunction
      },
    },
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-8 transition-colors duration-700 ${
        isRebranded
          ? 'bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900'
          : 'bg-linear-to-br from-gray-900 via-slate-800 to-gray-900'
      }`}
    >
      <div className="relative z-10 w-full max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-white to-gray-300">
            Rebrand Experience
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Click the button below to transform the entire experience with a
            stunning rebrand effect
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <motion.button
            onClick={handleRebrand}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center space-x-3 ${
              isRebranded
                ? 'bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg shadow-pink-500/30'
                : 'bg-linear-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/30'
            }`}
          >
            {isLoading ? (
              <>
                <motion.div
                  variants={spinnerVariants}
                  animate="animate"
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Generating New Brand</span>
              </>
            ) : (
              <>
                <span>{isRebranded ? 'Switch Back' : 'Rebrand Now'}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            )}
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={isRebranded ? 'rebranded' : 'original'}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="max-w-2xl mx-auto"
          >
            <div
              className={`${
                isRebranded
                  ? 'bg-linear-to-br from-pink-500/20 to-purple-600/20 backdrop-blur-xl border border-pink-500/30'
                  : 'bg-linear-to-br from-blue-500/20 to-cyan-600/20 backdrop-blur-xl border border-blue-500/30'
              } rounded-3xl p-8 shadow-2xl transform transition-all duration-700 hover:scale-105`}
            >
              <div className="flex flex-col items-center">
                <motion.div
                  className="mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {isRebranded ? (
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0 bg-linear-to-br from-pink-400 to-purple-500 rounded-full blur-lg opacity-70 animate-pulse"></div>
                      <div className="relative w-full h-full bg-linear-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          R+
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-cyan-500 rounded-full blur-lg opacity-70 animate-pulse"></div>
                      <div className="relative w-full h-full bg-linear-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">R</span>
                      </div>
                    </div>
                  )}
                </motion.div>

                <h2
                  className={`text-3xl font-bold mb-4 ${
                    isRebranded ? 'text-pink-300' : 'text-blue-300'
                  }`}
                >
                  {isRebranded ? 'Reimagined Brand' : 'Original Experience'}
                </h2>

                <p className="text-gray-300 text-center mb-6">
                  {isRebranded
                    ? 'Experience the vibrant new look with our refreshed brand identity and modern aesthetic.'
                    : 'Discover our original design crafted with attention to detail and user experience.'}
                </p>

                <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                  <motion.div
                    className={`h-2 rounded-full ${
                      isRebranded
                        ? 'bg-linear-to-r from-pink-500 to-purple-600'
                        : 'bg-linear-to-r from-blue-500 to-cyan-600'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  ></motion.div>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full">
                  {[1, 2, 3].map((item) => (
                    <motion.div
                      key={item}
                      className={`p-4 rounded-xl text-center ${
                        isRebranded
                          ? 'bg-linear-to-br from-pink-500/30 to-purple-600/30 border border-pink-500/30'
                          : 'bg-linear-to-br from-blue-500/30 to-cyan-600/30 border border-blue-500/30'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 * item }}
                    >
                      <div
                        className={`text-2xl font-bold mb-2 ${
                          isRebranded ? 'text-pink-300' : 'text-blue-300'
                        }`}
                      >
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
        </AnimatePresence>

        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-5 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>
    </div>
  );
};

export default App;
