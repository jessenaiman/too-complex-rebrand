'use client';

import React from 'react';
import { useDemoRebrand } from '@/hooks/use-demo-rebrand';

/**
 * Rebrandable wrapper component that makes any content responsive to theme changes
 * 
 * @param children - The content to make rebrandable
 * @param className - Additional CSS classes to apply
 * @param componentType - Type of component for specific styling ('text' | 'card' | 'button')
 * @returns React component with theme-aware styling
 */
interface RebrandableProps {
  children: React.ReactNode;
  className?: string;
  componentType?: 'text' | 'card' | 'button';
}

const Rebrandable: React.FC<RebrandableProps> = ({ 
  children, 
  className = '',
  componentType = 'text'
}) => {
  const { themeColors } = useDemoRebrand();
  
  // Apply theme-based styling based on component type
  const getThemedClassName = () => {
    const baseClasses = className;
    
    // Apply theme colors based on component type
    switch (componentType) {
      case 'text':
        return `${baseClasses} ${themeColors.text}`;
      case 'card':
        return `${baseClasses} bg-gradient-to-br ${themeColors.primary.replace('500', '500/20').replace('600', '600/20')} backdrop-blur-xl border ${themeColors.text.replace('text-', 'border-')}/40`;
      case 'button':
        return `${baseClasses} bg-gradient-to-r ${themeColors.primary} text-white shadow-lg shadow-${themeColors.text.replace('text-', '')}/30`;
      default:
        return baseClasses;
    }
  };
  
  // Render children with theme applied
  return (
    <div className={getThemedClassName()}>
      {children}
    </div>
  );
};

export default Rebrandable;