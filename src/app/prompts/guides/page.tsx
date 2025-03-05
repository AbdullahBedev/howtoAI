import { SiteLayout } from "@/components/layout/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, Code, FileText, Lightbulb, MessageSquare, Sparkles, Target, Wand2, ExternalLink, Lock } from "lucide-react";

export default function GuidesPage() {
  return (
    <SiteLayout>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Prompt Engineering Guides
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master the art of prompt crafting with our comprehensive guides for every skill level
          </p>
        </div>

        {/* Skill level tabs */}
        <Tabs defaultValue="beginner" className="mb-16">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
          </div>

          {/* Beginner content */}
          <TabsContent value="beginner">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Prompt Fundamentals
                  </CardTitle>
                  <CardDescription>
                    Learn the basic structure of effective prompts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Understand the essential components that make up a well-crafted prompt and how to structure your requests for optimal results.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Clear instruction formatting</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Context setting techniques</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Output format specification</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline-green" className="gap-2 w-full">
                    Start Learning <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Clarity & Specificity
                  </CardTitle>
                  <CardDescription>
                    Craft precise prompts that get exactly what you want
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learn how to eliminate ambiguity and create prompts that consistently deliver the results you're looking for.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Avoiding ambiguous language</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Quantitative specifications</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Example-driven clarification</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline-green" className="gap-2 w-full">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Role-Based Prompting
                  </CardTitle>
                  <CardDescription>
                    Enhance responses by assigning specific roles to the AI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Discover how to frame your prompts by assigning specific roles or personas to the AI, resulting in more focused and specialized responses.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Expert role assignment</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Domain-specific knowledge</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Multi-perspective analysis</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline-green" className="gap-2 w-full" asChild>
                    <Link href="/prompts/guides/role-based-prompting">
                      Explore Technique <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Prompt Templates
                  </CardTitle>
                  <CardDescription>
                    Ready-to-use templates for common scenarios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Access a library of beginner-friendly templates that you can immediately use for various everyday tasks.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Content creation templates</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Research assistance formats</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Creative writing frameworks</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline-green" className="gap-2 w-full">
                    View Templates <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Intermediate content */}
          <TabsContent value="intermediate">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-primary" />
                    Chain-of-Thought Prompting
                  </CardTitle>
                  <CardDescription>
                    Guide the AI through step-by-step reasoning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learn how to structure prompts that encourage the AI to break down complex problems and show its reasoning process step by step.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Step-by-step reasoning</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Complex problem solving</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Logical deduction techniques</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline-green" className="gap-2 w-full">
                    Master This Technique <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Few-Shot Learning
                  </CardTitle>
                  <CardDescription>
                    Teach by example for consistent formatting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Discover how to provide examples within your prompts to establish patterns and get consistently formatted responses.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Example pair construction</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Pattern recognition enhancement</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Format consistency techniques</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline-green" className="gap-2 w-full">
                    Master Examples <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Chain-of-Thought
                  </CardTitle>
                  <CardDescription>
                    Guide AI through complex reasoning processes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Master the technique of breaking down complex problems into step-by-step reasoning paths for more accurate solutions.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Step-by-step reasoning</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Logical progression cues</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Verification checkpoints</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline-green" className="gap-2 w-full">
                    Learn Method <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Advanced content */}
          <TabsContent value="advanced">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5 text-primary" />
                    System-Level Prompting
                  </CardTitle>
                  <CardDescription>
                    Advanced configuration for AI behavior
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learn how to use system-level instructions to fundamentally shape AI behavior and create custom assistants.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Behavioral constraint design</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Personality customization</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Response format control</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline-green" className="gap-2 w-full">
                    Advanced Guide <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Multi-Step Reasoning
                  </CardTitle>
                  <CardDescription>
                    Complex problem-solving frameworks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Master advanced techniques for breaking down complex problems into multiple reasoning stages for superior results.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Recursive reasoning patterns</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Self-critique frameworks</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Iterative refinement loops</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline-green" className="gap-2 w-full">
                    Expert Techniques <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-primary" />
                    Hybrid Prompting Strategies
                  </CardTitle>
                  <CardDescription>
                    Combine techniques for optimal results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Discover how to strategically combine multiple prompting techniques to solve the most challenging AI tasks.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Technique fusion frameworks</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Context-aware selection</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Adaptive prompting systems</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline-green" className="gap-2 w-full">
                    Master Strategies <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured guide */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Featured Guide</h2>
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4">The Ultimate Prompt Engineering Workflow</h3>
                <p className="text-lg mb-6">
                  Learn our proven 5-step workflow for crafting perfect prompts every time, from initial concept to final refinement.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-background/80 p-4 rounded-lg border">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="bg-primary/20 text-primary w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                      Define Objective
                    </h4>
                    <p className="text-sm text-muted-foreground">Clearly articulate what you want to achieve with your prompt</p>
                  </div>
                  <div className="bg-background/80 p-4 rounded-lg border">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="bg-primary/20 text-primary w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                      Structure Format
                    </h4>
                    <p className="text-sm text-muted-foreground">Organize your prompt with clear sections and formatting</p>
                  </div>
                  <div className="bg-background/80 p-4 rounded-lg border">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="bg-primary/20 text-primary w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                      Add Context
                    </h4>
                    <p className="text-sm text-muted-foreground">Provide relevant background information and examples</p>
                  </div>
                  <div className="bg-background/80 p-4 rounded-lg border">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="bg-primary/20 text-primary w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
                      Test & Iterate
                    </h4>
                    <p className="text-sm text-muted-foreground">Refine your prompt based on the results you receive</p>
                  </div>
                </div>
                <Button variant="outline-green" className="gap-2">
                  <ExternalLink className="h-4 w-4" /> Read Full Guide
                </Button>
              </div>
              <div className="md:w-1/3 bg-card rounded-md p-4 border shadow-sm">
                <div className="text-sm font-mono bg-muted p-3 rounded mb-3">
                  <div className="text-xs text-muted-foreground mb-2">Example Prompt Structure</div>
                  <div className="text-primary mb-1"># Objective</div>
                  <div className="mb-1">Create a comprehensive analysis of...</div>
                  <div className="text-primary mb-1"># Context</div>
                  <div className="mb-1">This is for a technical audience with...</div>
                  <div className="text-primary mb-1"># Format</div>
                  <div>Structure as follows: 1) Introduction, 2) Key findings...</div>
                </div>
                <div className="text-xs text-muted-foreground flex items-center">
                  <Sparkles className="h-3 w-3 mr-1" /> Premium templates available
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming guides */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Industry-Specific Prompt Engineering</CardTitle>
                <CardDescription>Specialized techniques for different sectors</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn how to adapt prompt engineering techniques for specific industries including healthcare, finance, legal, education, and creative fields.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline-green" className="gap-2 w-full">
                  <ExternalLink className="h-4 w-4" /> Read Full Guide
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Multimodal Prompt Engineering</CardTitle>
                <CardDescription>Working with text, images, and audio</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Master the art of crafting prompts for multimodal AI systems that can process and generate content across different formats.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline-green" className="gap-2 w-full">
                  <ExternalLink className="h-4 w-4" /> Read Full Guide
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
} 