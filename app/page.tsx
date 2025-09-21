'use client'

import React from 'react';
import RebrandPage from '@/components/rebrand/rebrand-page';
import { RebrandProvider } from '@/components/rebrand/rebrand-context';
import Rebrand from '@/components/rebrand/rebrand';
import { ShimmerButton } from '@/components/buttons/shimmer-button';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { ShinyButton } from '@/components/ui/shiny-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <RebrandProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 w-full">
        {/* Main Rebrand Experience */}
        <RebrandPage />

        {/* Component Showcase Section */}
        <section className="py-24 px-4 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            {/* Section Header */}
            <Rebrand elementType="text-block" componentId="showcase-title">
              <div className="text-center mb-16">
                <Badge variant="secondary" className="mb-4 text-sm font-medium">
                  Component Showcase
                </Badge>
                <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">
                  Rebrandable UI Components
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Discover the power of dynamic rebranding with our collection of interactive components
                </p>
              </div>
            </Rebrand>

            {/* Component Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {/* Logo Component */}
              <Rebrand elementType="card" componentId="showcase-logo">
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-2xl">🏢</span>
                    </div>
                    <CardTitle className="text-lg">Logo</CardTitle>
                    <CardDescription>
                      Dynamic company branding
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Rebrand elementType="logo" componentId="logo-preview">
                      <div className="h-24 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/10">
                        <span className="text-muted-foreground font-medium">Logo Preview</span>
                      </div>
                    </Rebrand>
                  </CardContent>
                </Card>
              </Rebrand>
              
              {/* Button Components */}
              <Rebrand elementType="card" componentId="showcase-buttons">
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-2xl">🔘</span>
                    </div>
                    <CardTitle className="text-lg">Buttons</CardTitle>
                    <CardDescription>
                      Interactive button variants
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Rebrand elementType="button" componentId="button-shimmer">
                      <ShimmerButton className="w-full">
                        Shimmer
                      </ShimmerButton>
                    </Rebrand>
                    <Rebrand elementType="button" componentId="button-rainbow">
                      <RainbowButton className="w-full">
                        Rainbow
                      </RainbowButton>
                    </Rebrand>
                    <Rebrand elementType="button" componentId="button-shiny">
                      <ShinyButton className="w-full">
                        Shiny
                      </ShinyButton>
                    </Rebrand>
                  </CardContent>
                </Card>
              </Rebrand>
              
              {/* Card Component */}
              <Rebrand elementType="card" componentId="showcase-card">
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-2xl">📄</span>
                    </div>
                    <CardTitle className="text-lg">Card</CardTitle>
                    <CardDescription>
                      Feature showcase component
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Feature Card</h4>
                      <p className="text-sm text-muted-foreground">
                        This is an example of a rebrandable card component with proper shadcn/ui structure.
                      </p>
                    </div>
                    <Button className="w-full">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Rebrand>
              
              {/* Text Block Component */}
              <Rebrand elementType="card" componentId="showcase-text">
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-2xl">📝</span>
                    </div>
                    <CardTitle className="text-lg">Text Block</CardTitle>
                    <CardDescription>
                      Dynamic content areas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Rebrand elementType="text-block" componentId="text-content">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        This is a rebrandable text block. Click on it to see it transform with different themes and content variations.
                      </p>
                    </Rebrand>
                  </CardContent>
                </Card>
              </Rebrand>
              
              {/* Background Component */}
              <Rebrand elementType="card" componentId="showcase-background">
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-2xl">🎨</span>
                    </div>
                    <CardTitle className="text-lg">Background</CardTitle>
                    <CardDescription>
                      Dynamic visual themes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Rebrand elementType="background" componentId="background-preview">
                      <div className="h-24 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-gradient-to-br from-muted/10 to-muted/5">
                        <span className="text-muted-foreground font-medium text-sm">Background Area</span>
                      </div>
                    </Rebrand>
                  </CardContent>
                </Card>
              </Rebrand>
              
              {/* Theme Switcher Component */}
              <Rebrand elementType="card" componentId="showcase-theme">
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-2xl">🎭</span>
                    </div>
                    <CardTitle className="text-lg">Theme</CardTitle>
                    <CardDescription>
                      Color scheme switching
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground text-center">
                      Click to switch themes
                    </p>
                    <Rebrand elementType="theme" componentId="theme-switch">
                      <Button variant="outline" className="w-full">
                        Rebrand Theme
                      </Button>
                    </Rebrand>
                  </CardContent>
                </Card>
              </Rebrand>

              {/* Full Page Rebrand Component */}
              <Rebrand elementType="card" componentId="showcase-full-page">
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <CardTitle className="text-lg">Full Page</CardTitle>
                    <CardDescription>
                      Complete experience rebrand
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground text-center">
                      Transform the entire page
                    </p>
                    <Rebrand elementType="theme" componentId="page-rebrand">
                      <Button className="w-full">
                        Rebrand Entire Page
                      </Button>
                    </Rebrand>
                  </CardContent>
                </Card>
              </Rebrand>
            </div>

            {/* Action Section */}
            <div className="mt-16 text-center">
              <Separator className="mb-8" />
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-semibold mb-4">
                  Ready to Transform Your Brand?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Experience the power of AI-driven rebranding with our interactive component showcase above.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Rebrand elementType="theme" componentId="cta-button-1">
                    <ShinyButton className="px-8 py-3 text-lg font-semibold">
                      Start Rebranding
                    </ShinyButton>
                  </Rebrand>
                  <Rebrand elementType="theme" componentId="cta-button-2">
                    <Button variant="outline" className="px-8 py-3 text-lg font-semibold">
                      View Examples
                    </Button>
                  </Rebrand>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </RebrandProvider>
  );
}