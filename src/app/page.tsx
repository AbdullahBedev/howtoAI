'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BookOpen, Clock, Star, Lock, Sparkles, Zap, Crown, BadgeCheck, Search, Filter, ChevronDown, Briefcase, Stethoscope, Scale, TrendingUp, ShoppingCart, Megaphone, Award, Bot, Wand2, Users } from "lucide-react";
import { advancedTutorials } from "@/data/advanced-tutorials";
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

// Industry-specific tracks
const industryTracks = [
  {
    id: "healthcare-ai",
    title: "Healthcare AI Implementation",
    description: "Learn how to implement AI solutions in healthcare settings for improved patient outcomes and operational efficiency.",
    image: "/industry/healthcare.jpg",
    color: "from-blue-500 to-cyan-400",
    icon: "stethoscope",
    tutorials: [
      {
        id: "medical-imaging-ai",
        title: "AI in Medical Imaging Analysis",
        isPremium: true
      },
      {
        id: "patient-data-analysis",
        title: "Patient Data Analysis with AI",
        isPremium: true
      },
      {
        id: "healthcare-chatbots",
        title: "Building Healthcare Chatbots",
        isPremium: false
      }
    ]
  },
  {
    id: "legal-ai",
    title: "Legal AI Workflows",
    description: "Discover how AI can transform legal research, document review, and contract analysis for law firms and legal departments.",
    image: "/industry/legal.jpg",
    color: "from-indigo-600 to-purple-500",
    icon: "scale",
    tutorials: [
      {
        id: "legal-document-analysis",
        title: "AI for Legal Document Analysis",
        isPremium: true
      },
      {
        id: "contract-review-automation",
        title: "Automating Contract Review",
        isPremium: true
      },
      {
        id: "legal-research-ai",
        title: "AI-Powered Legal Research",
        isPremium: false
      }
    ]
  },
  {
    id: "finance-ai",
    title: "Financial Services AI Applications",
    description: "Implement AI solutions for risk assessment, fraud detection, and personalized financial advice in banking and finance.",
    image: "/industry/finance.jpg",
    color: "from-green-500 to-emerald-400",
    icon: "trending-up",
    tutorials: [
      {
        id: "fraud-detection-ai",
        title: "AI-Powered Fraud Detection",
        isPremium: true
      },
      {
        id: "risk-assessment-models",
        title: "Building Risk Assessment Models",
        isPremium: true
      },
      {
        id: "financial-chatbots",
        title: "Financial Advisory Chatbots",
        isPremium: false
      }
    ]
  },
  {
    id: "ecommerce-ai",
    title: "E-commerce & Retail AI Solutions",
    description: "Transform your e-commerce business with AI-powered product recommendations, inventory management, and customer service.",
    image: "/industry/ecommerce.jpg",
    color: "from-orange-500 to-amber-400",
    icon: "shopping-cart",
    tutorials: [
      {
        id: "product-recommendation-engines",
        title: "Building Product Recommendation Engines",
        isPremium: true
      },
      {
        id: "inventory-optimization",
        title: "AI for Inventory Optimization",
        isPremium: true
      },
      {
        id: "ecommerce-chatbots",
        title: "E-commerce Customer Service Bots",
        isPremium: false
      }
    ]
  },
  {
    id: "marketing-ai",
    title: "Marketing AI Strategies",
    description: "Leverage AI for content creation, campaign optimization, and customer segmentation to boost your marketing effectiveness.",
    image: "/industry/marketing.jpg",
    color: "from-red-500 to-pink-400",
    icon: "megaphone",
    tutorials: [
      {
        id: "content-generation-at-scale",
        title: "AI Content Generation at Scale",
        isPremium: true
      },
      {
        id: "campaign-optimization",
        title: "AI-Driven Campaign Optimization",
        isPremium: true
      },
      {
        id: "customer-segmentation",
        title: "Advanced Customer Segmentation",
        isPremium: false
      }
    ]
  }
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#f85032] to-[#e73827] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              AI Made Simple. Results Made Yours.
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Master AI tools and techniques with our comprehensive tutorials, industry-specific tracks, and hands-on learning paths.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/tutorials">
                <Button size="lg" className="bg-gradient-to-r from-[#f85032] to-[#e73827] hover:opacity-90">
                  Start Learning
                </Button>
              </Link>
              <Link href="/#features">
                <Button size="lg" variant="outline">
                  Explore Features
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Master AI</h2>
            <p className="text-muted-foreground">Comprehensive learning paths and tools to help you succeed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/tutorials">
              <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                    <CardHeader>
                  <BookOpen className="h-8 w-8 text-[#f85032] mb-4" />
                  <CardTitle>AI Tutorials</CardTitle>
                  <CardDescription>Step-by-step guides for every skill level</CardDescription>
                    </CardHeader>
                    <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Beginner to advanced content</li>
                    <li>• Hands-on practical examples</li>
                    <li>• Industry best practices</li>
                  </ul>
                    </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="gap-2 text-[#f85032]">
                    Browse Tutorials <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
            </Link>

            <Link href="/prompts">
              <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                <CardHeader>
                  <Wand2 className="h-8 w-8 text-[#f85032] mb-4" />
                  <CardTitle>Prompt Engineering</CardTitle>
                  <CardDescription>Master the art of crafting effective prompts</CardDescription>
                    </CardHeader>
                    <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Advanced techniques</li>
                    <li>• Real-world applications</li>
                    <li>• Model-specific strategies</li>
                  </ul>
                    </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="gap-2 text-[#f85032]">
                    Learn Prompting <ArrowRight className="h-4 w-4" />
                        </Button>
                    </CardFooter>
                  </Card>
            </Link>

            <Link href="/ai-agent">
              <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                <CardHeader>
                  <Bot className="h-8 w-8 text-[#f85032] mb-4" />
                  <CardTitle>AI Agents</CardTitle>
                  <CardDescription>Build and deploy autonomous AI agents</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Agent architectures</li>
                    <li>• Custom implementations</li>
                    <li>• Advanced use cases</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="gap-2 text-[#f85032]">
                    Explore Agents <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Join Our AI Community</h2>
              <p className="text-muted-foreground mb-6">
                Connect with fellow learners, share experiences, and get help from our community of AI enthusiasts and experts.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#f85032]" />
                  <span>Active Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#f85032]" />
                  <span>Learning Resources</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-[#f85032]" />
                  <span>Expert Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-[#f85032]" />
                  <span>Certifications</span>
            </div>
              </div>
              <Link href="/community">
                <Button className="gap-2 bg-gradient-to-r from-[#f85032] to-[#e73827] hover:opacity-90">
                  Join Community <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              </div>
            <div className="flex-1 relative">
              <div className="aspect-square bg-gradient-to-br from-[#f85032]/20 to-[#e73827]/20 rounded-3xl p-8">
                {/* Add community illustration or image here */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Master AI?</h2>
            <p className="text-muted-foreground mb-8">
              Start your journey today with our comprehensive learning paths and expert-led tutorials.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-[#f85032] to-[#e73827] hover:opacity-90">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/tutorials">
                <Button size="lg" variant="outline" className="gap-2">
                  Browse Tutorials <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
} 