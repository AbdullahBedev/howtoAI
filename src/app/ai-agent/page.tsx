"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SiteLayout } from "@/components/layout/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Lock, Sparkles, Bot, Code, Zap, BookOpen, Terminal, Rocket, Gift, Star, Users } from "lucide-react";
import { PremiumButton, PremiumBadge } from "@/components/ui/premium-button"
import { PremiumContent } from "@/components/ui/premium-content"

export default function AIAgentPage() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-background/80 pt-16 pb-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <PremiumBadge variant="outline" className="mb-4 px-3 py-1">
            Premium Content
          </PremiumBadge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-[#f85032] to-[#e73827] bg-clip-text text-transparent mb-6">
            AI Agent Development
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Learn how to build, customize, and deploy AI agents for various tasks and applications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PremiumButton size="lg">
              Subscribe Now
            </PremiumButton>
            <Button variant="outline-red" size="lg" className="border-[#e73827] text-[#e73827] hover:bg-[#e73827]/10">
              Learn More
            </Button>
          </div>
          
          <div className="w-full max-w-4xl bg-black/5 backdrop-blur-sm rounded-xl p-4 border border-border/50 shadow-xl">
            <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
                <div className="text-center p-6">
                  <Lock className="h-12 w-12 text-[#e73827] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
                  <p className="text-muted-foreground mb-4">Subscribe to access this exclusive content</p>
                  <Button size="sm" className="bg-[#e73827] hover:bg-[#e73827]/90">
                    Subscribe - $50/month
                  </Button>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <Terminal className="h-32 w-32 text-[#e73827]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-4">
                      <Bot className="h-5 w-5 text-[#e73827]" />
                      <h2 className="text-xl font-semibold">Core Concepts and Foundations</h2>
                    </div>
                    <CardDescription>
                      Comprehensive breakdown of agent types and architectures
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 mt-0.5 flex-shrink-0 rounded-full bg-[#e73827]/10 flex items-center justify-center">
                          <Sparkles className="h-3.5 w-3.5 text-[#e73827]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Autonomous Agents</h4>
                          <p className="text-sm text-muted-foreground">
                            Self-directed AI systems that operate without human intervention
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 mt-0.5 flex-shrink-0 rounded-full bg-[#e73827]/10 flex items-center justify-center">
                          <Sparkles className="h-3.5 w-3.5 text-[#e73827]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Reactive Agents</h4>
                          <p className="text-sm text-muted-foreground">
                            Systems that respond to environmental changes in real-time
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 mt-0.5 flex-shrink-0 rounded-full bg-[#e73827]/10 flex items-center justify-center">
                          <Sparkles className="h-3.5 w-3.5 text-[#e73827]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Goal-Driven Agents</h4>
                          <p className="text-sm text-muted-foreground">
                            AI systems optimized to achieve specific objectives
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="relative w-full h-[120px] rounded-lg overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
                          <Lock className="h-8 w-8 text-[#e73827]" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
                      </div>
                      <p className="text-sm text-center mt-2 text-muted-foreground">
                        <Lock className="h-3 w-3 inline mr-1" /> Premium content includes animated diagrams and insider context
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-green text-green hover:bg-green/10">
                      <Lock className="h-4 w-4 mr-2" /> Unlock Premium Content
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-4">
                      <Code className="h-5 w-5 text-[#e73827]" />
                      <h2 className="text-xl font-semibold">Comprehensive Tutorials</h2>
                    </div>
                    <CardDescription>
                      Step-by-step guides from beginner to advanced
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="px-2 py-0.5 border-[#e73827] text-[#e73827]">Beginner</Badge>
                        <div>
                          <h4 className="text-sm font-medium">Build Your First Agent</h4>
                          <p className="text-sm text-muted-foreground">
                            Complete guide with downloadable code and video walkthrough
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="px-2 py-0.5 border-amber-500 text-amber-500">Intermediate</Badge>
                        <div>
                          <h4 className="text-sm font-medium">Email Sorting Agent with Memory</h4>
                          <p className="text-sm text-muted-foreground">
                            LangChain integration with API setup
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="px-2 py-0.5 border-red-500 text-red-500">Advanced</Badge>
                        <div>
                          <h4 className="text-sm font-medium">Self-Improving Code Review Agent</h4>
                          <p className="text-sm text-muted-foreground">
                            Fine-tuning and feedback loops for continuous improvement
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="relative w-full h-[120px] rounded-lg overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
                        <PremiumContent 
                          title="Premium Tutorials"
                          description="Subscribe to access all tutorials"
                          buttonText="Unlock Now"
                          cardClassName="h-full border-0"
                        />
                      </div>
                      <p className="text-sm text-center mt-2 text-muted-foreground">
                        <Lock className="h-3 w-3 inline mr-1" /> 10+ premium tutorials with code templates and videos
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-green text-green hover:bg-green/10">
                      <Lock className="h-4 w-4 mr-2" /> Unlock Premium Content
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-5 w-5 text-[#e73827]" />
                    <h2 className="text-xl font-semibold">Agent-Building Toolkit</h2>
                  </div>
                  <CardDescription>
                    Exclusive tools and resources to accelerate your agent development
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-[#e73827]" />
                        Framework Guides
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        In-depth guides for LangChain, AutoGen, CrewAI, and more
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Lock className="h-3 w-3 mr-1 text-[#e73827]" />
                        <span>Premium only</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center">
                        <Code className="h-4 w-4 mr-2 text-[#e73827]" />
                        Code Templates
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        20+ downloadable, customizable agent starters
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Lock className="h-3 w-3 mr-1 text-[#e73827]" />
                        <span>Premium only</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center">
                        <Terminal className="h-4 w-4 mr-2 text-[#e73827]" />
                        Prompt Library
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        100+ agent-specific prompts for various use cases
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Lock className="h-3 w-3 mr-1 text-[#e73827]" />
                        <span>Premium only</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-center p-6">
                    <Lock className="h-8 w-8 text-[#e73827]" />
                    <h3 className="text-lg font-semibold mt-2 mb-2">Premium Content</h3>
                    <p className="text-sm text-muted-foreground mb-4">Subscribe to access all tools</p>
                    <Button variant="outline" className="w-full border-[#e73827] text-[#e73827] hover:bg-[#e73827]/10">
                      Subscribe - $50/month
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-4">
                      <Rocket className="h-5 w-5 text-[#e73827]" />
                      <h2 className="text-xl font-semibold">Interactive Playground</h2>
                    </div>
                    <CardDescription>
                      Build, test, and deploy agents in a live environment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                      <PremiumContent 
                        title="Interactive Playground"
                        description="Subscribe to access our interactive AI agent playground"
                        buttonText="Unlock Now"
                        cardClassName="h-full border-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 -z-10" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-30 -z-10">
                        <Terminal className="h-32 w-32 text-[#e73827]" />
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Lock className="h-3 w-3 mr-2 text-[#e73827]" />
                        <span>Agent Sandbox with real AI APIs (GPT-4, Claude)</span>
                      </li>
                      <li className="flex items-center">
                        <Lock className="h-3 w-3 mr-2 text-[#e73827]" />
                        <span>Run simulations and agent vs. agent scenarios</span>
                      </li>
                      <li className="flex items-center">
                        <Lock className="h-3 w-3 mr-2 text-[#e73827]" />
                        <span>Export agents to AWS/Vercel or save configs</span>
                      </li>
                      <li className="flex items-center">
                        <Lock className="h-3 w-3 mr-2 text-[#e73827]" />
                        <span>Real-time metrics and performance stats</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-green text-green hover:bg-green/10">
                      <Lock className="h-4 w-4 mr-2" /> Unlock Playground
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="h-5 w-5 text-[#e73827]" />
                      <h2 className="text-xl font-semibold">Exclusive Deep Dives</h2>
                    </div>
                    <CardDescription>
                      Original, insider content not available elsewhere
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 mt-0.5 flex-shrink-0 rounded-full bg-[#e73827]/10 flex items-center justify-center">
                          <Lock className="h-3.5 w-3.5 text-[#e73827]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Self-Learning Agents 101</h4>
                          <p className="text-sm text-muted-foreground">
                            Techniques for creating agents that improve over time
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 mt-0.5 flex-shrink-0 rounded-full bg-[#e73827]/10 flex items-center justify-center">
                          <Lock className="h-3.5 w-3.5 text-[#e73827]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Multi-Modal Agent Secrets</h4>
                          <p className="text-sm text-muted-foreground">
                            Building agents that work with text, images, and audio
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 mt-0.5 flex-shrink-0 rounded-full bg-[#e73827]/10 flex items-center justify-center">
                          <Lock className="h-3.5 w-3.5 text-[#e73827]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Case Study: The Agent That Auto-Tweets Tech News</h4>
                          <p className="text-sm text-muted-foreground">
                            Full code and metrics for a production-ready agent
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-green text-green hover:bg-green/10">
                      <Lock className="h-4 w-4 mr-2" /> Unlock Deep Dives
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-4">
                    <Gift className="h-5 w-5 text-[#e73827]" />
                    <h2 className="text-xl font-semibold">Premium Perks</h2>
                  </div>
                  <CardDescription>
                    Exclusive benefits for subscribers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center">
                        <Rocket className="h-4 w-4 mr-2 text-[#e73827]" />
                        Early Access
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        New agent tutorials drop here first
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center">
                        <Users className="h-4 w-4 mr-2 text-[#e73827]" />
                        Mentorship
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Monthly 1:1 with an AI expert (limited slots)
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center">
                        <Badge className="h-4 w-4 mr-2 text-[#e73827]" />
                        Certificates
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Earn credentials for completing tutorials
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center">
                        <Star className="h-4 w-4 mr-2 text-[#e73827]" />
                        Spotlight
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Top agents featured in a "Vibe Hall of Fame"
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-primary to-[#e73827] hover:from-primary/90 hover:to-[#e73827]/90 text-white">
                    Subscribe Now - $50/month
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Premium Features</CardTitle>
                  <CardDescription>
                    Exclusive content and tools available only to subscribers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
                      <div className="text-center">
                        <Lock className="h-12 w-12 text-[#e73827] mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Premium Content</h3>
                        <p className="text-gray-300 mb-4">Subscribe to unlock all premium features</p>
                        <Button size="sm" className="bg-green hover:bg-green/90">
                          Unlock Now
                        </Button>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tutorials" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Premium Tutorials</CardTitle>
                  <CardDescription>
                    Step-by-step guides to build powerful AI agents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full h-[120px] rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
                    <PremiumContent 
                      title="Premium Tutorials"
                      description="Subscribe to access all tutorials"
                      buttonText="Unlock Now"
                      cardClassName="h-full border-0"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Premium Tools</CardTitle>
                  <CardDescription>
                    Exclusive tools for building AI agents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full h-[120px] rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
                    <PremiumContent 
                      title="Premium Tools"
                      description="Subscribe to access all tools"
                      buttonText="Unlock Now"
                      cardClassName="h-full border-0"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Free Preview Section */}
      <section className="py-12 bg-black/5">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Free Preview</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get a taste of what's available in our premium AI Agent content
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Agent Types</CardTitle>
                <CardDescription>Basic overview of AI agent categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  AI agents can be categorized into several types based on their capabilities and design:
                </p>
                <ul className="text-sm space-y-2 list-disc pl-4">
                  <li>Simple reflex agents</li>
                  <li>Model-based agents</li>
                  <li>Goal-based agents</li>
                  <li>Utility-based agents</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  <Lock className="h-3 w-3 inline mr-1" /> 
                  Subscribe for detailed explanations, examples, and implementation guides
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Starter Tutorial</CardTitle>
                <CardDescription>Introduction to building a simple agent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Learn the basics of creating a simple AI agent that can respond to user queries:
                </p>
                <div className="bg-black/10 p-3 rounded-md">
                  <code className="text-xs">
                    <pre>{`import openai

def simple_agent(query):
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": 
             "You are a helpful assistant."},
            {"role": "user", "content": query}
        ]
    )
    return response.choices[0].message.content`}</pre>
                  </code>
                </div>
                <p className="text-sm text-muted-foreground">
                  <Lock className="h-3 w-3 inline mr-1" /> 
                  Subscribe for 10+ complete tutorials with advanced features
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Framework Comparison</CardTitle>
                <CardDescription>Overview of popular agent frameworks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Several frameworks exist to simplify AI agent development:
                </p>
                <ul className="text-sm space-y-2 list-disc pl-4">
                  <li>LangChain - Comprehensive framework for LLM applications</li>
                  <li>AutoGPT - Autonomous GPT-4 based agents</li>
                  <li>CrewAI - Multi-agent collaborative systems</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  <Lock className="h-3 w-3 inline mr-1" /> 
                  Subscribe for detailed comparisons, setup guides, and integration tutorials
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <PremiumButton size="lg">
              Unlock All Premium Content
            </PremiumButton>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
} 