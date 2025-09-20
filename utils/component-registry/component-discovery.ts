/**
 * Component Discovery Service
 *
 * Automatically discovers and loads components from the file system,
 * enabling dynamic component swapping without manual registration.
 *
 * Note: This service only works server-side due to file system access requirements.
 */

// Define a simple interface for component metadata
interface ComponentMetadata {
  name: string;
  displayName: string;
  description: string;
  category: string;
  path: string;
}

// Hardcoded component registry for now - will be replaced with dynamic discovery
const HARDCODED_COMPONENTS = {
  buttons: [
    {
      name: 'shimmer-button',
      displayName: 'Shimmer Button',
      description: 'Animated shimmer effect button',
      category: 'button'
    }
  ]
};

/**
 * Service for discovering components dynamically from the file system
 */
export class ComponentDiscoveryService {
  private componentCache: Map<string, ComponentMetadata[]> = new Map();

  /**
   * Discovers all components in a given directory
   * @param directory - Directory path to scan for components
   * @returns Promise resolving to discovered components
   */
  async discoverComponents(directory: string): Promise<ComponentMetadata[]> {
    const cacheKey = directory;

    if (this.componentCache.has(cacheKey)) {
      return this.componentCache.get(cacheKey)!;
    }

    // For now, return hardcoded components
    // TODO: Implement actual file system scanning for production
    const components = this.getHardcodedComponents(directory);
    this.componentCache.set(cacheKey, components);
    return components;
  }

  /**
   * Get hardcoded components for the given directory
   * @param directory - Directory to get components for
   * @returns Array of component metadata
   */
  private getHardcodedComponents(directory: string): ComponentMetadata[] {
    const dirName = directory.split('/').pop() || '';

    switch (dirName) {
      case 'buttons':
        return HARDCODED_COMPONENTS.buttons;
      default:
        return [];
    }
  }

  /**
   * Clears the component cache
   */
  clearCache(): void {
    this.componentCache.clear();
  }
}

/**
 * Global instance of the component discovery service
 */
export const componentDiscovery = new ComponentDiscoveryService();