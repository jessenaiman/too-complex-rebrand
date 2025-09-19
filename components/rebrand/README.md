# Rebrand Components

This directory contains rebranding components that make it easy to add AI-generated, rebrandable content to any element on your page.

## Components

### rebrandable.tsx
A wrapper component that makes any content rebrandable. It automatically applies the current theme colors and handles responsive design.

**Usage:**
```tsx
import Rebrandable from '@/components/rebrand/rebrandable';

<Rebrandable componentType="card" className="p-6 rounded-lg">
  <h2>My Rebrandable Content</h2>
  <p>This content will change when the page is rebranded.</p>
</Rebrandable>
```

**Props:**
- `children`: The content to make rebrandable
- `className`: Additional CSS classes to apply
- `componentType`: Type of component ('text' | 'card' | 'button')

### individual-rebrandable.tsx
Component that can be individually selected and rebranded. Click on the component to rebrand it independently of others.

**Usage:**
```tsx
import IndividualRebrandable from '@/components/rebrand/individual-rebrandable';

<IndividualRebrandable componentId="unique-id" componentType="card">
  <h2>Individually Rebrandable Content</h2>
  <p>Click this component to rebrand it independently.</p>
</IndividualRebrandable>
```

**Props:**
- `children`: The content to make rebrandable
- `className`: Additional CSS classes to apply
- `componentId`: Unique identifier for the component
- `componentType`: Type of component ('card' | 'text' | 'image')

### ai-rebrandable-content.tsx
Complete example component showing AI-generated content with rebranding support.

### rebrandable-feature-card.tsx
Example showing how to make responsive feature cards rebrandable.

### individual-rebrand-demo.tsx
Demonstration page showing how to use individual rebranding.

## How to Add Rebrandable AI Content to New Elements

### 1. Make Any Element Rebrandable
```tsx
import Rebrandable from '@/components/rebrand/rebrandable';

<Rebrandable componentType="card" className="my-custom-styles">
  <YourContent />
</Rebrandable>
```

### 2. Make Elements Individually Rebrandable
```tsx
import IndividualRebrandable from '@/components/rebrand/individual-rebrandable';

<IndividualRebrandable componentId="unique-1" componentType="card">
  <h3>Click me to rebrand just this component</h3>
</IndividualRebrandable>
```

### 3. Use with AI Content Generation
Combine with your existing AI content generation logic to create dynamic, theme-aware content.

### 4. Responsive Design
All components are mobile-responsive and adapt to different screen sizes.

## Component Types

- `text`: Applies theme text colors
- `card`: Applies theme background gradients and borders
- `button`: Applies theme button styles with gradients
- `image`: Creates an image container that can be individually rebranded

## Benefits

- **Simple to use**: Just wrap any content with the Rebrandable component
- **Theme-aware**: Automatically applies current theme colors and styles
- **Individual rebranding**: Click components to rebrand them independently
- **Responsive**: Works on all device sizes
- **Backward compatible**: Works with existing rebranding system
- **Performance optimized**: Minimal overhead