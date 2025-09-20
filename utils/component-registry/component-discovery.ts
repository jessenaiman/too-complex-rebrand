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
    // Check if we're running on the server side
    if (typeof window !== 'undefined') {
      console.warn('[COMPONENT DISCOVERY] This service only works server-side');
      return [];
    }

    const cacheKey = directory;

    if (this.componentCache.has(cacheKey)) {
      return this.componentCache.get(cacheKey)!;
    }

    // Discover components from the file system
    const components = await this.discoverComponentsFromFileSystem(directory);
    this.componentCache.set(cacheKey, components);
    return components;
  }

  /**
   * Discover components from the file system
   * @param directory - Directory to scan for components
   * @returns Array of component metadata
   */
  private async discoverComponentsFromFileSystem(directory: string): Promise<ComponentMetadata[]> {
    const components: ComponentMetadata[] = [];
    
    // Dynamically import fs and path only on the server side
    if (typeof window === 'undefined') {
      try {
        const fs = await import('fs');
        const path = await import('path');
        
        // Resolve the full path relative to the project root
        const fullPath = path.resolve(process.cwd(), directory);
        
        // Check if directory exists
        if (!fs.existsSync(fullPath)) {
          console.warn(`[COMPONENT DISCOVERY] Directory not found: ${fullPath}`);
          return components;
        }
        
        // Read directory contents
        const files = fs.readdirSync(fullPath);
        
        // Process each file
        for (const file of files) {
          // Only process .tsx files
          if (file.endsWith('.tsx')) {
            const filePath = path.join(fullPath, file);
            const stat = fs.statSync(filePath);
            
            // Only process files, not directories
            if (stat.isFile()) {
              // Extract component name from filename (remove .tsx extension)
              const componentName = file.replace('.tsx', '');
              
              // Generate display name by converting kebab-case to Title Case
              const displayName = componentName
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
              
              // Determine category from directory path
              const category = this.determineCategoryFromPath(directory);
              
              // Create relative path from components directory
              const relativePath = path.relative('components', directory) || directory;
              
              components.push({
                name: componentName,
                displayName,
                description: `${displayName} component`,
                category,
                path: `${relativePath}/${file}`
              });
            }
          }
        }
      } catch (error) {
        console.error(`[COMPONENT DISCOVERY] Error discovering components in ${directory}:`, error);
      }
    }
    
    return components;
  }

  /**
   * Clears the component cache
   */
  /**
   * Determine component category from directory path
   * @param directory - Directory path
   * @returns Category name
   */
  private determineCategoryFromPath(directory: string): string {
    // Handle special cases for category determination
    if (directory.includes('animate-ui/primitives/texts')) {
      return 'text';
    }
    
    if (directory.includes('rebrand') && (directory.includes('card') || directory.includes('testimonial'))) {
      return 'card';
    }
    
    if (directory.includes('backgrounds')) {
      return 'background';
    }
    
    // Default category from directory name
    return directory.split('/').pop() || 'unknown';
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