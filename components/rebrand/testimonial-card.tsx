'use client';

import React from 'react';
import Rebrandable from '@/components/rebrand/rebrandable';
import { useAIContent } from '@/hooks/use-ai-content';

/**
 * Simple component to demonstrate adding rebrandable AI content to existing pages
 * This can be added to any page that uses the rebranding system
 * 
 * @returns React component with rebrandable AI content
 */
const TestimonialCard = () => {
  // This would typically fetch or generate real content
  const testimonial = {
    quote: "This rebranding system transformed our user experience!",
    author: "Alex Johnson",
    role: "Product Manager"
  };

  return (
    <Rebrandable componentType="card" className="p-6 rounded-xl max-w-md">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
          <span className="font-bold text-gray-700">AJ</span>
        </div>
        <div>
          <Rebrandable componentType="text" className="font-bold">
            {testimonial.author}
          </Rebrandable>
          <Rebrandable componentType="text" className="text-sm opacity-75">
            {testimonial.role}
          </Rebrandable>
        </div>
      <Rebrandable componentType="text" className="italic">
        "{testimonial.quote}"
      </Rebrandable>
      <div className="flex mt-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
      </div>
    </Rebrandable>
  );
};

export default TestimonialCard;