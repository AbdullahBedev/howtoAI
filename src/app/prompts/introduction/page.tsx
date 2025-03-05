import { SiteLayout } from "@/components/layout/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle, LightbulbIcon, Sparkles } from "lucide-react";

export default function PromptEngineeringIntroPage() {
  return (
    <SiteLayout>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Introduction to Prompt Engineering
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn the art and science of crafting effective prompts to get the most out of AI models.
          </p>
        </div>

        {/* Overview section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="col-span-2">
            <h2 className="text-3xl font-bold mb-6">What is Prompt Engineering?</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                Prompt engineering is the process of crafting inputs to AI models to achieve desired outputs. 
                As AI systems like GPT-4, Claude, and others become more capable, the way we communicate with 
                them becomes increasingly important.
              </p>
              <p>
                Effective prompt engineering allows you to:
              </p>
              <ul>
                <li>Get more accurate and relevant responses</li>
                <li>Solve complex problems by breaking them down</li>
                <li>Achieve consistency in AI outputs</li>
                <li>Reduce hallucinations and errors</li>
                <li>Unlock the full potential of AI tools</li>
              </ul>
              <p>
                This discipline combines elements of natural language processing, cognitive psychology, 
                and computer science to create a new field of expertise essential for the AI age.
              </p>
            </div>
          </div>
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Why It Matters</CardTitle>
                <CardDescription>The impact of effective prompt engineering</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">10x Productivity</h3>
                    <p className="text-sm text-muted-foreground">
                      Master prompts to accomplish in minutes what would take hours manually
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Higher Quality Results</h3>
                    <p className="text-sm text-muted-foreground">
                      Get more accurate, creative and useful outputs from AI models
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Universal Skill</h3>
                    <p className="text-sm text-muted-foreground">
                      Apply across different AI models and use cases in any field
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Core concepts section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Core Concepts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Context Setting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Providing background information and parameters that frame the AI's understanding.
                </p>
                <div className="bg-muted p-4 rounded-md text-sm">
                  <p className="font-medium mb-2">Example:</p>
                  <p className="font-mono">
                    "You are an expert physicist specializing in quantum mechanics. Explain the double-slit experiment to an undergraduate student."
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Clear Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Explicitly stating what you want the AI to do, including the format and style.
                </p>
                <div className="bg-muted p-4 rounded-md text-sm">
                  <p className="font-medium mb-2">Example:</p>
                  <p className="font-mono">
                    "Write a 5-point checklist for optimizing website SEO. Format each point as a heading followed by a 2-sentence explanation."
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Iterative Refinement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  The process of improving prompts based on AI responses to get better results.
                </p>
                <div className="bg-muted p-4 rounded-md text-sm">
                  <p className="font-medium mb-2">Process:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Create initial prompt</li>
                    <li>Evaluate response</li>
                    <li>Identify issues</li>
                    <li>Refine prompt</li>
                    <li>Repeat until satisfactory</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Advanced techniques preview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Advanced Techniques</h2>
          <Tabs defaultValue="role">
            <TabsList className="mb-6">
              <TabsTrigger value="role">Role-Based Prompting</TabsTrigger>
              <TabsTrigger value="cot">Chain-of-Thought</TabsTrigger>
              <TabsTrigger value="few-shot">Few-Shot Learning</TabsTrigger>
            </TabsList>
            <TabsContent value="role" className="bg-card rounded-lg p-6 border">
              <h3 className="text-xl font-bold mb-4">Role-Based Prompting</h3>
              <p className="mb-4">
                Assigning a specific role or persona to the AI model to influence its response style, expertise level, and perspective.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted p-4 rounded-md">
                  <p className="font-medium mb-2">Example Prompt:</p>
                  <p className="font-mono text-sm">
                    "You are an experienced pediatrician with 20 years of practice. A parent comes to you worried about their 3-year-old who has a fever of 101°F for the past 24 hours. What advice would you give them?"
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-2">When to Use:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Need expertise in a specific domain</li>
                    <li>Want a specific communication style</li>
                    <li>Need to simulate different perspectives</li>
                    <li>Creating content with a consistent voice</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="cot" className="bg-card rounded-lg p-6 border">
              <h3 className="text-xl font-bold mb-4">Chain-of-Thought Prompting</h3>
              <p className="mb-4">
                Encouraging the AI to break down complex problems into step-by-step reasoning before arriving at a final answer.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted p-4 rounded-md">
                  <p className="font-medium mb-2">Example Prompt:</p>
                  <p className="font-mono text-sm">
                    "Think through this problem step by step: A shirt initially costs $25. During a sale, the price is reduced by 20%. Then, there's an additional discount of $5. What is the final price of the shirt?"
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-2">When to Use:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Solving complex math problems</li>
                    <li>Making logical deductions</li>
                    <li>Debugging or troubleshooting</li>
                    <li>When accuracy is critical</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="few-shot" className="bg-card rounded-lg p-6 border">
              <h3 className="text-xl font-bold mb-4">Few-Shot Learning</h3>
              <p className="mb-4">
                Providing examples of the desired input-output pairs to guide the AI toward the expected format and approach.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted p-4 rounded-md">
                  <p className="font-medium mb-2">Example Prompt:</p>
                  <p className="font-mono text-sm">
                    "Convert these sentences to past tense:<br/><br/>
                    Input: I walk to the store.<br/>
                    Output: I walked to the store.<br/><br/>
                    Input: She sings beautifully.<br/>
                    Output: She sang beautifully.<br/><br/>
                    Input: They build a new house.<br/>
                    Output:"
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-2">When to Use:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Consistent formatting is required</li>
                    <li>Complex or unusual patterns</li>
                    <li>When explicit instructions are unclear</li>
                    <li>For creative generation in specific styles</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Master Prompt Engineering?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Dive deeper into our comprehensive guides and start creating more effective prompts today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/prompts/guides">
              <Button size="lg" className="gap-2">
                Explore Guides <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/prompts/cheat-sheets">
              <Button size="lg" variant="outline" className="gap-2">
                View Cheat Sheets <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
} 