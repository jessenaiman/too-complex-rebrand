/**
 * Dynamic Component Renderer
 *
 * Renders components dynamically based on the component discovery system.
 * Handles loading states, errors, and smooth transitions between components.
 */

'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { componentDiscovery } from '@/utils/component-registry/component-discovery';
import LoadingState from './loading-state';

interface DynamicComponentRendererProps {
  category: 'button' | 'text' | 'card' | 'background';
  variant: string;
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

/**
 * Dynamically renders components discovered by the component discovery service
 * @param props - Component props including category, variant, and children
 * @returns JSX element with the dynamically loaded component or loading/error state
 */
export const DynamicComponentRenderer: React.FC<DynamicComponentRendererProps> = ({
  category,
  variant,
  children,
  className,
  ...props
}) => {
  const [Component, setComponent] = useState<React.ComponentType<Record<string, unknown>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadComponent = async () => {
      setLoading(true);
      setError(null);

      try {
        const directory = `components/${category}s`;
        const components = await componentDiscovery.discoverComponents(directory);

        const component = components.find(c => c.name === variant);

        if (component) {
          // Dynamically import the component from its path
          const ComponentModule = await import(`@/components/${component.path}`);
          setComponent(() => ComponentModule.default || ComponentModule[component.name]);
        } else {
          setError(`Component '${variant}' not found in category '${category}'`);
        }
      } catch (err) {
        setError(`Failed to load component: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    loadComponent();
  }, [category, variant]);

  // Loading state
  if (loading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <LoadingState elementType="button" />
      </div>
    );
  }

  // Error state
  if (error || !Component) {
    console.warn('Component loading error:', error);
    return (
      <div className={`px-4 py-2 bg-destructive/20 text-destructive-foreground rounded ${className}`}>
        Error: {error}
      </div>
    );
  }

  // Render the component with Suspense fallback
  return (
    <Suspense fallback={<LoadingState elementType="button" />}>
      <Component className={className} {...props}>
        {children}
      </Component>
    </Suspense>
  );
};