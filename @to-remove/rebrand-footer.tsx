import React from 'react';
import { motion } from  "motion/react";
import { useRebrand } from './rebrand-context';

const themeColors = {
  background: 'bg-gray-900',
  text: 'text-gray-100',
};

const borderWidths = ['none', '0.5px', '1px', '2px', 'dashed', 'double'];
const randomBorderWidth = borderWidths[Math.floor(Math.random() * borderWidths.length)];
  
export default function RebrandFooter() {
  return (
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
    );
  }