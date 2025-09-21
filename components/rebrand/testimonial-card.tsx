'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import Rebrand from '@/components/rebrand/rebrand';

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
    role: "Product Manager",
    company: "Tech Innovations Inc.",
    rating: 5
  };

  return (
    <Rebrand elementType="card" componentId="testimonial-card">
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Rebrand elementType="card" componentId="testimonial-avatar">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/api/placeholder/48/48" alt={testimonial.author} />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-semibold">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </Rebrand>
            <div className="space-y-1">
              <Rebrand elementType="text-block" componentId="testimonial-author">
                <h4 className="font-semibold text-foreground">{testimonial.author}</h4>
              </Rebrand>
              <Rebrand elementType="text-block" componentId="testimonial-role">
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </Rebrand>
              <Rebrand elementType="text-block" componentId="testimonial-company">
                <Badge variant="outline" className="text-xs">
                  {testimonial.company}
                </Badge>
              </Rebrand>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Rebrand elementType="text-block" componentId="testimonial-quote">
            <blockquote className="text-foreground italic border-l-4 border-primary/20 pl-4">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
          </Rebrand>
          <Rebrand elementType="text-block" componentId="testimonial-rating">
            <div className="flex items-center space-x-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
              <span className="text-sm text-muted-foreground ml-2">
                {testimonial.rating}/5
              </span>
            </div>
          </Rebrand>
        </CardContent>
      </Card>
    </Rebrand>
  );
};

export default TestimonialCard;