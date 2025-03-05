"use client";

import { SiteLayout } from "@/components/layout/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowDown, ArrowRight, BookOpen, Brain, Code, Download, FileDown, FileText, Lightbulb, MessageSquare, Pencil, PieChart, Sparkles, Wand2 } from "lucide-react";
import { generateAndDownloadPDF } from "@/lib/utils/pdf-generator";

// Client component for download buttons
function DownloadButton({ filename, children }: { filename: string, children: React.ReactNode }) {
  return (
    <Button 
      variant="outline-green" 
      className="gap-2 w-full"
      onClick={() => generateAndDownloadPDF(filename)}
    >
      <FileDown className="h-4 w-4" /> {children}
    </Button>
  );
}

export default function CheatSheetsPage() {
  return (
    <SiteLayout>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Prompt Engineering Cheat Sheets
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready-to-use templates and reference guides for different AI models and use cases
          </p>
        </div>

        {/* Categories tabs */}
        <Tabs defaultValue="models" className="mb-16">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="models">Model-Specific</TabsTrigger>
              <TabsTrigger value="domains">Domain-Specific</TabsTrigger>
              <TabsTrigger value="formats">Format Templates</TabsTrigger>
            </TabsList>
          </div>

          {/* Model-specific templates */}
          <TabsContent value="models">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      GPT-4 Optimization
                    </CardTitle>
                    <Badge variant="outline" className="bg-primary/10">Popular</Badge>
                  </div>
                  <CardDescription>
                    Maximize the capabilities of OpenAI's GPT-4
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    A comprehensive guide to optimizing prompts specifically for GPT-4, leveraging its advanced reasoning and instruction-following capabilities.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>System message optimization</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Parameter recommendations</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Model-specific techniques</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <DownloadButton filename="gpt4-cheatsheet.md">
                    Download Cheat Sheet
                  </DownloadButton>
                </CardFooter>
              </Card>

              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Claude-Specific Patterns
                  </CardTitle>
                  <CardDescription>
                    Optimize prompts for Anthropic's Claude models
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learn the unique patterns and techniques that work best with Claude models, focusing on their strengths in detailed instructions and safety.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Constitutional AI techniques</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>XML formatting strategies</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Long-context optimization</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <DownloadButton filename="claude-cheatsheet.md">
                    Download Cheat Sheet
                  </DownloadButton>
                </CardFooter>
              </Card>

              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5 text-primary" />
                    Open Source LLM Guide
                  </CardTitle>
                  <CardDescription>
                    Optimize prompts for Llama, Mistral, and other open models
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Specialized techniques for getting the most out of open-source language models, with specific sections for popular models.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Llama 3 optimization</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Mistral techniques</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Local deployment tips</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <DownloadButton filename="open-source-llm-guide.md">
                    Download Cheat Sheet
                  </DownloadButton>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Domain-specific templates */}
          <TabsContent value="domains">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pencil className="h-5 w-5 text-primary" />
                    Content Creation
                  </CardTitle>
                  <CardDescription>
                    Templates for writers, marketers, and content creators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    A collection of prompt templates optimized for various content creation tasks, from blog posts to social media content.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Blog post frameworks</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Social media templates</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Email marketing formulas</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <DownloadButton filename="content-creation-cheatsheet.md">
                    Download Templates
                  </DownloadButton>
                </CardFooter>
              </Card>

              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Code Generation
                  </CardTitle>
                  <CardDescription>
                    Templates for developers and programmers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Specialized prompt patterns for code generation, debugging, refactoring, and documentation across multiple programming languages.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Function generation templates</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Debugging frameworks</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Code review patterns</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <DownloadButton filename="code-generation-cheatsheet.md">
                    Download Templates
                  </DownloadButton>
                </CardFooter>
              </Card>

              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Data Analysis
                  </CardTitle>
                  <CardDescription>
                    Templates for data scientists and analysts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Prompt templates designed for data analysis tasks, including data cleaning, visualization recommendations, and insight generation.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Data interpretation frameworks</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Statistical analysis templates</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Visualization recommendation patterns</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <DownloadButton filename="data-analysis-cheatsheet.md">
                    Download Templates
                  </DownloadButton>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Format templates */}
          <TabsContent value="formats">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Educational Content
                  </CardTitle>
                  <CardDescription>
                    Templates for creating learning materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Structured templates for creating various educational materials, from lesson plans to interactive quizzes and explanations.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Lesson plan frameworks</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Concept explanation templates</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Quiz generation patterns</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <DownloadButton filename="educational-content-cheatsheet.md">
                    Download Templates
                  </DownloadButton>
                </CardFooter>
              </Card>

              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Creative Writing
                  </CardTitle>
                  <CardDescription>
                    Templates for storytelling and creative content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Prompt frameworks designed to spark creativity and help with various forms of creative writing, from fiction to poetry.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Story structure templates</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Character development frameworks</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Poetry and lyric patterns</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <DownloadButton filename="creative-writing-cheatsheet.md">
                    Download Templates
                  </DownloadButton>
                </CardFooter>
              </Card>

              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Business Documents
                  </CardTitle>
                  <CardDescription>
                    Templates for professional business content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Professional templates for creating various business documents, from proposals and reports to presentations and analyses.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Business proposal frameworks</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Executive summary templates</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Strategic analysis patterns</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <DownloadButton filename="business-documents-cheatsheet.md">
                    Download Templates
                  </DownloadButton>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured template */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Featured Template</h2>
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4">Universal Prompt Framework</h3>
                <p className="text-lg mb-6">
                  Our most versatile template that can be adapted to virtually any prompt engineering task. This framework incorporates best practices from top AI researchers.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="bg-background/80 p-4 rounded-lg border">
                    <h4 className="font-semibold mb-2">Framework Components:</h4>
                    <ol className="list-decimal list-inside space-y-2 ml-2">
                      <li className="text-muted-foreground">
                        <span className="text-foreground font-medium">Context Setting</span>: Define the background and purpose
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground font-medium">Role Assignment</span>: Specify the expertise needed
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground font-medium">Task Definition</span>: Clearly state what needs to be done
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground font-medium">Format Specification</span>: Define the desired output structure
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground font-medium">Constraints</span>: Set boundaries and limitations
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground font-medium">Examples</span>: Provide sample inputs and outputs if needed
                      </li>
                    </ol>
                  </div>
                </div>
                <Button variant="green" className="gap-2 w-full shadow-green">
                  <Download className="h-4 w-4" /> Download Universal Framework
                </Button>
              </div>
              <div className="md:w-1/3 bg-card rounded-md p-4 border shadow-sm">
                <div className="text-sm font-mono bg-muted p-3 rounded mb-3">
                  <div className="text-xs text-muted-foreground mb-2">Template Example</div>
                  <div className="text-primary mb-1"># Context</div>
                  <div className="mb-2">I'm preparing content for [purpose] aimed at [audience].</div>
                  <div className="text-primary mb-1"># Role</div>
                  <div className="mb-2">Act as an expert in [field] with knowledge of [specific areas].</div>
                  <div className="text-primary mb-1"># Task</div>
                  <div className="mb-2">Create [content type] that [specific requirements].</div>
                  <div className="text-primary mb-1"># Format</div>
                  <div className="mb-2">Structure as follows: [format details]</div>
                  <div className="text-primary mb-1"># Constraints</div>
                  <div>Ensure [specific limitations or requirements].</div>
                </div>
                <div className="text-xs text-muted-foreground flex items-center">
                  <Sparkles className="h-3 w-3 mr-1" /> Adaptable to any use case
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Template collections */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Premium Template Collections</h2>
            <Badge variant="outline" className="bg-primary/10">Pro Members</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Reasoning Collection</CardTitle>
                <CardDescription>20+ templates for complex problem-solving</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  A comprehensive collection of templates designed for advanced reasoning tasks, including multi-step problem solving, decision frameworks, and analysis patterns.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline">20+ Templates</Badge>
                  <Badge variant="outline">PDF + Markdown</Badge>
                  <Badge variant="outline">Pro</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="green" className="gap-2 w-full shadow-green">
                  <Download className="h-4 w-4" /> Get Premium Collection
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Industry Expert Collection</CardTitle>
                <CardDescription>30+ templates for specialized domains</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Specialized templates for various industries including healthcare, finance, legal, education, and technology, created by domain experts.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline">30+ Templates</Badge>
                  <Badge variant="outline">PDF + Markdown</Badge>
                  <Badge variant="outline">Pro</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="green" className="gap-2 w-full shadow-green">
                  <Download className="h-4 w-4" /> Get Premium Collection
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Community contributions */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Community Contributions</h2>
            <Link href="/prompts/community">
              <Button variant="outline-green" className="gap-2">
                View All Contributions <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Academic Research Template</CardTitle>
                <CardDescription className="text-xs">By ResearchPro • 2.4k downloads</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A structured template for conducting literature reviews and summarizing academic papers with proper citation formatting.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline-green" size="sm" className="gap-2 w-full">
                  <Download className="h-4 w-4" /> Download
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Product Description Generator</CardTitle>
                <CardDescription className="text-xs">By EcomExpert • 1.8k downloads</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A template for creating compelling product descriptions that highlight features, benefits, and unique selling points.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline-green" size="sm" className="gap-2 w-full">
                  <Download className="h-4 w-4" /> Download
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Technical Documentation Framework</CardTitle>
                <CardDescription className="text-xs">By DevDocPro • 1.5k downloads</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A comprehensive template for creating clear, structured technical documentation for software and APIs.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline-green" size="sm" className="gap-2 w-full">
                  <Download className="h-4 w-4" /> Download
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
} 