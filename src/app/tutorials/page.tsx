'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BookOpen, Clock, Star, Lock, Sparkles, Zap, Crown, BadgeCheck, Search, Filter, ChevronDown } from "lucide-react";
import { advancedTutorials } from "@/data/advanced-tutorials";
import { industryTracks } from '@/data/industry-tracks';
import { AdvancedTutorialCard } from "@/components/tutorials/advanced-tutorial-card";
import { TutorialCard } from "@/components/tutorials/tutorial-card";
import { IndustryTrackCard } from "@/components/tutorials/industry-track-card";
import { motion } from "framer-motion";

// Mock data for tutorials with premium indicators
const tutorials = [
  {
    id: "write-blog-post",
    title: "Write a Blog Post with AI",
    description: "Learn how to use ChatGPT to write engaging blog content in minutes.",
    category: "writing",
    difficulty: "beginner",
    duration: "10 min",
    rating: 4.8,
    image: "/tutorials/blog-post.jpg",
    tool: "ChatGPT",
    isPremium: false
  },
  {
    id: "create-logo",
    title: "Design a Professional Logo",
    description: "Create stunning logos for your business using Midjourney.",
    category: "design",
    difficulty: "intermediate",
    duration: "15 min",
    rating: 4.7,
    image: "/tutorials/logo-design.jpg",
    tool: "Midjourney",
    isPremium: true
  },
  {
    id: "creating-images-with-dall-e",
    title: "Creating Images with DALL-E",
    description: "Learn how to generate stunning images using OpenAI's DALL-E model.",
    category: "design",
    difficulty: "intermediate",
    duration: "15 min",
    rating: 4.9,
    image: "/tutorials/dall-e-images.jpg",
    tool: "DALL-E",
    isPremium: true
  },
  {
    id: "prompt-engineering-masterclass",
    title: "Prompt Engineering Masterclass",
    description: "Master the art of crafting effective prompts to get the best results from AI models.",
    category: "advanced",
    difficulty: "intermediate",
    duration: "25 min",
    rating: 4.9,
    image: "/tutorials/prompt-engineering.jpg",
    tool: "ChatGPT, Claude, Gemini",
    isPremium: true
  },
  {
    id: "ai-model-fine-tuning",
    title: "AI Model Fine-Tuning Guide",
    description: "Learn how to customize AI models for your specific use cases through fine-tuning.",
    category: "advanced",
    difficulty: "advanced",
    duration: "40 min",
    rating: 4.8,
    image: "/tutorials/fine-tuning.jpg",
    tool: "OpenAI API, Hugging Face",
    isPremium: true
  },
  {
    id: "rag-implementation",
    title: "Building RAG Systems",
    description: "Learn how to implement Retrieval-Augmented Generation (RAG) to enhance AI responses with external knowledge.",
    category: "advanced",
    difficulty: "advanced",
    duration: "45 min",
    rating: 4.9,
    image: "/tutorials/rag-implementation.jpg",
    tool: "LangChain, OpenAI, Vector Databases",
    isPremium: true
  },
  {
    id: "ai-agent-development",
    title: "Building AI Agents",
    description: "Learn how to develop autonomous AI agents that can reason, plan, and execute tasks to achieve specific goals.",
    category: "advanced",
    difficulty: "advanced",
    duration: "50 min",
    rating: 4.8,
    image: "/tutorials/ai-agents.jpg",
    tool: "LangChain, AutoGPT, OpenAI",
    isPremium: true
  },
  {
    id: "social-media-calendar",
    title: "Generate a Social Media Calendar",
    description: "Plan a month of social media content in just 15 minutes with AI.",
    category: "marketing",
    difficulty: "beginner",
    duration: "15 min",
    rating: 4.9,
    image: "/tutorials/social-calendar.jpg",
    tool: "ChatGPT",
    isPremium: false
  },
  {
    id: "product-description",
    title: "Write Compelling Product Descriptions",
    description: "Create persuasive product descriptions that convert browsers into buyers.",
    category: "writing",
    difficulty: "beginner",
    duration: "8 min",
    rating: 4.6,
    image: "/tutorials/product-desc.jpg",
    tool: "ChatGPT",
    isPremium: false
  },
  {
    id: "email-templates",
    title: "Create Email Marketing Templates",
    description: "Design effective email templates for your marketing campaigns.",
    category: "marketing",
    difficulty: "intermediate",
    duration: "12 min",
    rating: 4.5,
    image: "/tutorials/email-templates.jpg",
    tool: "ChatGPT",
    isPremium: true
  },
  {
    id: "image-editing",
    title: "Edit Photos with AI",
    description: "Learn how to enhance and edit photos using AI tools.",
    category: "design",
    difficulty: "intermediate",
    duration: "20 min",
    rating: 4.7,
    image: "/tutorials/image-editing.jpg",
    tool: "Adobe Firefly",
    isPremium: true
  }
];

export default function TutorialsPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">AI Tutorials & Learning Paths</h1>
          <p className="text-xl text-muted-foreground">
            Master AI tools and techniques with our comprehensive tutorials and industry-specific learning paths.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <Tabs defaultValue="quick-start" className="w-full">
            <TabsList className="w-full max-w-[400px]">
              <TabsTrigger value="quick-start" className="w-full">Quick Start</TabsTrigger>
              <TabsTrigger value="advanced" className="w-full">Advanced</TabsTrigger>
              <TabsTrigger value="industry" className="w-full">Industry Tracks</TabsTrigger>
            </TabsList>

            <TabsContent value="quick-start" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutorials.map((tutorial) => (
                  <TutorialCard key={tutorial.id} tutorial={tutorial} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {advancedTutorials.map((tutorial) => (
                  <AdvancedTutorialCard key={tutorial.id} tutorial={tutorial} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="industry" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {industryTracks.map((track) => (
                  <IndustryTrackCard key={track.id} track={track} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
          </div>
        </div>
  );
} 