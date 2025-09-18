import Link from 'next/link'
import { useRebrand } from './rebrand/rebrand-context'
import { motion } from "motion/react";

const navItems = {
  '/': {
    name: 'home',
  },
  '/blog': {
    name: 'blog',
  },
  'https://vercel.com/templates/next.js/portfolio-starter-kit': {
    name: 'deploy',
  },
}

export function Navbar() {
  const { isRebranded, isLoading, triggerGlobalRebrand, logoImage } = useRebrand();

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        {/* RadixUI-style Navbar */}
        <motion.nav
          className={`px-6 py-4 flex items-center justify-between border-b backdrop-blur-xl z-20 relative ${
            isRebranded
              ? 'border-pink-500/30 bg-black/20'
              : 'border-blue-500/30 bg-black/20'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-3">
            <motion.div
              className="w-10 h-10 rounded-lg overflow-hidden border cursor-pointer"
              whileHover={{ scale: 1.2, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={triggerGlobalRebrand}
              style={{
                border: isRebranded ? '2px solid rgba(236, 72, 153, 0.5)' : '2px solid rgba(59, 130, 246, 0.5)'
              }}
              data-testid="brand-logo"
            >
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  />
                </div>
              ) : logoImage ? (
                <img
                  src={logoImage}
                  alt="Brand Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center font-bold ${
                  isRebranded ? 'text-pink-300' : 'text-blue-300'
                }`}>
                  {isRebranded ? 'R' : 'R+'}
                </div>
              )}
            </motion.div>
            <h1 className={`text-xl font-bold ${isRebranded ? 'text-pink-300' : 'text-blue-300'}`}>
              Pollinations Rebrand
            </h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={() => {
                const element = document.getElementById('features');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isRebranded ? 'text-purple-300 hover:text-purple-100' : 'text-blue-300 hover:text-blue-100'
              } border-b-2 border-transparent hover:border-${isRebranded ? 'purple' : 'blue'}-300/40`}
            >
              Features
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('projects');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isRebranded ? 'text-purple-300 hover:text-purple-100' : 'text-blue-300 hover:text-blue-100'
              } border-b-2 border-transparent hover:border-${isRebranded ? 'purple' : 'blue'}-300/40`}
            >
              Projects
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('community');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isRebranded ? 'text-purple-300 hover:text-purple-100' : 'text-blue-300 hover:text-blue-100'
              } border-b-2 border-transparent hover:border-${isRebranded ? 'purple' : 'blue'}-300/40`}
            >
              Community
            </button>
          </div>
        </motion.nav>
        
        {/* Original navigation items */}
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative mt-4"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
