import { SiteLayout } from "@/components/layout/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, GreenCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, BookOpen, Code, FileText, Lightbulb, MessageSquare, Sparkles, Wand2, ExternalLink } from "lucide-react";

export default function PromptsPage() {
  return (
    <SiteLayout>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Prompt Engineering <span className="bg-gradient-to-r from-primary via-green to-secondary bg-clip-text text-transparent">Mastery</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unlock the full potential of AI with advanced prompt engineering techniques, templates, and strategies.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Badge variant="green" className="px-3 py-1 text-sm">GPT-4</Badge>
            <Badge variant="green" className="px-3 py-1 text-sm">Claude</Badge>
            <Badge variant="green" className="px-3 py-1 text-sm">Midjourney</Badge>
            <Badge variant="green" className="px-3 py-1 text-sm">DALL-E</Badge>
            <Badge variant="green" className="px-3 py-1 text-sm">Gemini</Badge>
          </div>
        </div>

        {/* Featured sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Link href="/prompts/introduction" className="group">
            <GreenCard className="h-full transition-all hover:shadow-green">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-green" />
                  Introduction to Prompt Engineering
                </CardTitle>
                <CardDescription>
                  Learn the fundamentals and why they matter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Understand what prompt engineering is, why it's crucial for effective AI interactions, and the key principles that make prompts work.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline-green" className="group-hover:bg-green/10 gap-2">
                  Get Started <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </GreenCard>
          </Link>

          <Link href="/prompts/guides" className="group">
            <Card className="h-full transition-all hover:border-green/50 hover:shadow-green">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green" />
                  Comprehensive Guides
                </CardTitle>
                <CardDescription>
                  Step-by-step tutorials for every skill level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  From basic prompt structure to advanced techniques like chain-of-thought and system-level prompting, our guides cover it all.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline-green" className="group-hover:bg-green/10 gap-2">
                  Explore Guides <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </div>

        {/* Secondary sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Link href="/prompts/guides/vibe-coding" className="group">
            <Card className="h-full transition-all hover:border-green/50 hover:shadow-green">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Code className="h-5 w-5 text-green" />
                  Vibe Coding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Master the art of crafting effective prompts for AI coding assistants to generate high-quality code.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline-green" size="sm" className="gap-2">
                  Learn More <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/prompts/techniques" className="group">
            <Card className="h-full transition-all hover:border-green/50 hover:shadow-green">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wand2 className="h-5 w-5 text-green" />
                  Advanced Techniques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Cutting-edge strategies to maximize AI performance and overcome common limitations.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline-green" size="sm" className="gap-2">
                  Learn More <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/prompts/cheat-sheets" className="group">
            <GreenCard className="h-full transition-all hover:shadow-green">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-green" />
                  Cheat Sheets & Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Ready-to-use templates and quick reference guides for different models and use cases.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline-green" size="sm" className="gap-2">
                  View Resources <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </GreenCard>
          </Link>

          <Link href="/prompts/community" className="group">
            <Card className="h-full transition-all hover:border-green/50 hover:shadow-green">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageSquare className="h-5 w-5 text-green" />
                  Community Contributions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Discover and share prompt engineering techniques with our global community of practitioners.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline-green" size="sm" className="gap-2">
                  See Free Prompts <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </div>

        {/* All sections */}
        <h2 className="text-3xl font-bold mb-6">Prompt Engineering Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Prompt Cheat Sheets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Quick reference guides and templates for different AI models and use cases.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Model-specific prompt patterns</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Domain-optimized templates</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Downloadable resources</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/prompts/cheat-sheets">
                <Button variant="outline-green" className="gap-2">
                  <ExternalLink className="h-4 w-4" /> View All Cheat Sheets
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-primary" />
                Innovative Techniques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Advanced strategies and lesser-known tricks to enhance your prompt engineering skills.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Parameter optimization</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Token efficiency techniques</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Real-world case studies</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/prompts/techniques">
                <Button variant="outline-green" className="gap-2">
                  <ExternalLink className="h-4 w-4" /> View All Techniques
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Community Contributions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                User-generated prompts, feedback, and collaborative improvement of prompt strategies.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Community prompt showcase</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Peer reviews and ratings</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Collaborative improvement</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/prompts/community">
                <Button variant="outline-green" className="gap-2">
                  <ExternalLink className="h-4 w-4" /> Join Community
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Playground teaser */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Interactive Prompt Playground</h2>
              <p className="text-lg mb-6">
                Experiment with different prompt techniques in our interactive sandbox environment. Test, refine, and perfect your prompts in real-time.
              </p>
              <Link href="/playground?mode=prompt">
                <Button size="lg" className="gap-2">
                  Try the Playground <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="md:w-1/3 bg-card rounded-md p-4 border shadow-sm">
              <div className="text-sm font-mono bg-muted p-3 rounded mb-3">
                <span className="text-primary">{">"}</span> You are an expert in climate science...
              </div>
              <div className="bg-primary/5 p-3 rounded text-sm font-mono">
                <span className="text-primary font-bold">AI:</span> I'll analyze the climate data...
              </div>
              <div className="mt-3 flex items-center text-xs text-muted-foreground">
                <Code className="h-3 w-3 mr-1" /> Try different models and parameters
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
} 