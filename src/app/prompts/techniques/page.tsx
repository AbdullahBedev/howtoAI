import { SiteLayout } from "@/components/layout/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Code, Cpu, FileText, Gauge, Lightbulb, MessageSquare, Settings, Sliders, Sparkles, Wand2, ExternalLink } from "lucide-react";

export default function TechniquesPage() {
  return (
    <SiteLayout>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Innovative Prompt Techniques
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master cutting-edge strategies to unlock the full potential of AI language models
          </p>
        </div>

        {/* Featured techniques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-primary" />
                  Parameter Optimization
                </CardTitle>
                <Badge variant="outline" className="bg-primary/10">Advanced</Badge>
              </div>
              <CardDescription>
                Fine-tune AI model parameters for optimal results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn how to strategically adjust temperature, top-p, frequency penalty, and other parameters to control creativity, determinism, and response quality.
              </p>
              <div className="bg-muted p-4 rounded-md mb-4">
                <h4 className="font-medium mb-2 text-sm">Example: Temperature Control</h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-background p-3 rounded border">
                    <div className="text-primary mb-1">Temperature: 0.2 (Focused)</div>
                    <div className="font-mono">The capital of France is Paris.</div>
                  </div>
                  <div className="bg-background p-3 rounded border">
                    <div className="text-primary mb-1">Temperature: 0.8 (Creative)</div>
                    <div className="font-mono">Paris, the City of Light, is France's capital and cultural heart.</div>
                  </div>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Precision vs. creativity balancing</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Task-specific parameter presets</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Response length optimization</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline-green" className="gap-2 w-full">
                <ExternalLink className="h-4 w-4" /> Master Parameters
              </Button>
            </CardFooter>
          </Card>

          <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-primary" />
                  Context Window Maximization
                </CardTitle>
                <Badge variant="outline" className="bg-primary/10">Advanced</Badge>
              </div>
              <CardDescription>
                Optimize token usage for complex tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Discover techniques to efficiently use the context window, enabling more complex interactions and longer conversations with AI models.
              </p>
              <div className="bg-muted p-4 rounded-md mb-4">
                <h4 className="font-medium mb-2 text-sm">Example: Information Density</h4>
                <div className="space-y-3 text-xs">
                  <div className="bg-background p-3 rounded border">
                    <div className="text-primary mb-1">❌ Inefficient</div>
                    <div className="font-mono line-through">I would like you to help me summarize this article about climate change. The article discusses various aspects of climate change including its causes and effects. I need you to focus on the main points and provide a concise summary...</div>
                  </div>
                  <div className="bg-background p-3 rounded border">
                    <div className="text-primary mb-1">✅ Optimized</div>
                    <div className="font-mono">Summarize this climate change article. Focus: main causes, key effects, proposed solutions. Format: 3 bullet points per section.</div>
                  </div>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Token-efficient formatting</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Information compression techniques</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Strategic context management</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline-green" className="gap-2 w-full">
                <ExternalLink className="h-4 w-4" /> Optimize Context
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Advanced techniques */}
        <h2 className="text-3xl font-bold mb-6">Advanced Techniques</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                Recursive Self-Improvement
              </CardTitle>
              <CardDescription>
                AI-enhanced prompt refinement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn how to use AI to iteratively improve its own prompts, creating a feedback loop that leads to increasingly better results.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Self-critique frameworks</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Iterative refinement loops</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Quality evaluation metrics</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline-green" className="gap-2 w-full">
                <ExternalLink className="h-4 w-4" /> Learn Technique
              </Button>
            </CardFooter>
          </Card>

          <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Constraint Engineering
              </CardTitle>
              <CardDescription>
                Control AI behavior with precision
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Master the art of setting effective constraints that guide AI behavior while maintaining flexibility for creative solutions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Boundary definition frameworks</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Rule-based guidance systems</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Ethical guardrail implementation</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline-green" className="gap-2 w-full">
                <ExternalLink className="h-4 w-4" /> Master Constraints
              </Button>
            </CardFooter>
          </Card>

          <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-primary" />
                Calibrated Questioning
              </CardTitle>
              <CardDescription>
                Extract precise information with expert questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn how to formulate questions that elicit precise, actionable information from AI models, even on complex topics.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Precision question frameworks</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Confidence calibration techniques</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Uncertainty quantification methods</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline-green" className="gap-2 w-full">
                <ExternalLink className="h-4 w-4" /> Improve Questions
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Interactive technique showcase */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Interactive Technique Showcase</h2>
          <Tabs defaultValue="persona" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="persona">Persona Switching</TabsTrigger>
              <TabsTrigger value="cot">Chain-of-Thought</TabsTrigger>
              <TabsTrigger value="few-shot">Few-Shot Learning</TabsTrigger>
            </TabsList>
            <TabsContent value="persona" className="border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Persona Switching Technique</h3>
                  <p className="text-muted-foreground mb-4">
                    This advanced technique involves instructing the AI to adopt different expert personas to analyze a problem from multiple perspectives.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-medium text-sm mb-1">How it works:</h4>
                      <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1 ml-2">
                        <li>Define multiple expert personas with distinct viewpoints</li>
                        <li>Ask each persona to analyze the same problem</li>
                        <li>Compare insights to gain a comprehensive understanding</li>
                        <li>Synthesize the perspectives into a balanced conclusion</li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Best used for:</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground ml-2">
                        <li>Complex decision-making scenarios</li>
                        <li>Ethical dilemmas with multiple stakeholders</li>
                        <li>Creative projects requiring diverse perspectives</li>
                      </ul>
                    </div>
                  </div>
                  <Button variant="outline-green" className="gap-2">
                    <ExternalLink className="h-4 w-4" /> Try in Playground
                  </Button>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium mb-3 text-sm">Example Implementation</h4>
                  <div className="space-y-3">
                    <div className="bg-background p-3 rounded border">
                      <div className="text-primary text-xs mb-1">Prompt:</div>
                      <div className="font-mono text-xs">
                        Analyze the impact of remote work on urban development from three perspectives:
                        1. As an economist focusing on labor markets
                        2. As an urban planner concerned with city infrastructure
                        3. As a sociologist studying community dynamics
                        
                        For each perspective, provide 3 key insights and potential implications.
                      </div>
                    </div>
                    <div className="bg-background p-3 rounded border">
                      <div className="text-primary text-xs mb-1">Response (excerpt):</div>
                      <div className="font-mono text-xs">
                        <p className="font-bold">Economist Perspective:</p>
                        1. Labor market flexibility has increased, allowing companies to access talent regardless of location.
                        2. Wage differentials are emerging between remote-capable and location-dependent jobs.
                        3. Productivity metrics show mixed results, with gains from reduced commuting but challenges in collaboration.
                        
                        <p className="font-bold">Urban Planner Perspective:</p>
                        1. Commercial real estate in downtown areas faces decreased demand and potential repurposing needs.
                        2. Residential preferences are shifting toward larger homes in suburban and rural areas with home office space.
                        3. Transportation infrastructure requirements are changing with reduced daily commuting but increased need for digital infrastructure.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="cot" className="border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Chain-of-Thought Technique</h3>
                  <p className="text-muted-foreground mb-4">
                    This technique guides AI through explicit reasoning steps, dramatically improving performance on complex logical and mathematical problems.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-medium text-sm mb-1">How it works:</h4>
                      <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1 ml-2">
                        <li>Break down complex problems into sequential steps</li>
                        <li>Explicitly ask the AI to "think step by step"</li>
                        <li>Provide examples of reasoning chains if needed</li>
                        <li>Verify each step in the reasoning process</li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Best used for:</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground ml-2">
                        <li>Mathematical problem solving</li>
                        <li>Logical reasoning tasks</li>
                        <li>Multi-step decision processes</li>
                      </ul>
                    </div>
                  </div>
                  <Button variant="outline-green" className="gap-2">
                    <ExternalLink className="h-4 w-4" /> Try in Playground
                  </Button>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium mb-3 text-sm">Example Implementation</h4>
                  <div className="space-y-3">
                    <div className="bg-background p-3 rounded border">
                      <div className="text-primary text-xs mb-1">Prompt:</div>
                      <div className="font-mono text-xs">
                        A store has a sale where if you buy 2 items, you get the third at 50% off (applied to the cheapest item). If I buy 5 items that cost $10, $20, $30, $40, and $50, how much will I pay in total?
                        
                        Think through this step by step to find the correct answer.
                      </div>
                    </div>
                    <div className="bg-background p-3 rounded border">
                      <div className="text-primary text-xs mb-1">Response:</div>
                      <div className="font-mono text-xs">
                        I'll solve this step by step:
                        
                        1) First, I need to sort the items by price: $10, $20, $30, $40, $50
                        
                        2) The sale applies to every third item, so I need to group them:
                           - Group 1: $10, $20, $30 (with $10 getting 50% off)
                           - Group 2: $40, $50 (not enough for another discount)
                        
                        3) Calculate the cost for Group 1:
                           - $10 at 50% off = $5
                           - $20 at full price = $20
                           - $30 at full price = $30
                           - Group 1 total = $5 + $20 + $30 = $55
                        
                        4) Calculate the cost for Group 2:
                           - $40 at full price = $40
                           - $50 at full price = $50
                           - Group 2 total = $40 + $50 = $90
                        
                        5) Total cost = Group 1 + Group 2 = $55 + $90 = $145
                        
                        Therefore, I will pay $145 in total.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="few-shot" className="border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Few-Shot Learning Technique</h3>
                  <p className="text-muted-foreground mb-4">
                    This technique uses examples to establish patterns, helping the AI understand exactly what format and style you want in the response.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-medium text-sm mb-1">How it works:</h4>
                      <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1 ml-2">
                        <li>Provide 2-5 examples of input-output pairs</li>
                        <li>Ensure examples demonstrate the exact pattern you want</li>
                        <li>Make examples diverse enough to cover edge cases</li>
                        <li>Follow with your actual query in the same format</li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Best used for:</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground ml-2">
                        <li>Consistent formatting requirements</li>
                        <li>Specialized content generation</li>
                        <li>Classification or categorization tasks</li>
                      </ul>
                    </div>
                  </div>
                  <Button variant="outline-green" className="gap-2">
                    <ExternalLink className="h-4 w-4" /> Try in Playground
                  </Button>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium mb-3 text-sm">Example Implementation</h4>
                  <div className="space-y-3">
                    <div className="bg-background p-3 rounded border">
                      <div className="text-primary text-xs mb-1">Prompt:</div>
                      <div className="font-mono text-xs">
                        Convert these customer inquiries into structured support tickets:
                        
                        Example 1:
                        Input: "My account was charged twice for the same subscription on May 3rd"
                        Output:
                        TICKET: Billing Issue
                        PRIORITY: High
                        DETAILS: Double charge for subscription
                        DATE: May 3rd
                        ACTION: Verify transaction history and process refund if confirmed
                        
                        Example 2:
                        Input: "How do I change my password? I forgot it."
                        Output:
                        TICKET: Account Access
                        PRIORITY: Medium
                        DETAILS: Password reset request
                        DATE: Current
                        ACTION: Send password reset instructions to registered email
                        
                        Now convert this:
                        "I purchased your premium plan yesterday but I still don't have access to any of the features"
                      </div>
                    </div>
                    <div className="bg-background p-3 rounded border">
                      <div className="text-primary text-xs mb-1">Response:</div>
                      <div className="font-mono text-xs">
                        TICKET: Subscription Access
                        PRIORITY: High
                        DETAILS: Premium plan features unavailable after purchase
                        DATE: Yesterday
                        ACTION: Verify payment processing and activate premium features on account
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Case studies */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Real-World Applications</h2>
            <Link href="/prompts/case-studies">
              <Button variant="outline-green" className="gap-2">
                <ExternalLink className="h-4 w-4" /> View All Case Studies
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Creation Pipeline</CardTitle>
                <CardDescription>How a digital marketing agency automated content creation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Learn how a marketing team combined multiple prompt techniques to create a semi-automated content pipeline that increased output by 300%.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline">Case Study</Badge>
                  <Badge variant="outline">Marketing</Badge>
                  <Badge variant="outline">Automation</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline-green" className="gap-2">
                  <ExternalLink className="h-4 w-4" /> Read Case Study
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Legal Document Analysis</CardTitle>
                <CardDescription>How a law firm improved contract review efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Discover how specialized prompt engineering techniques helped a law firm reduce contract review time by 70% while improving accuracy.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline">Case Study</Badge>
                  <Badge variant="outline">Legal</Badge>
                  <Badge variant="outline">Efficiency</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline-green" className="gap-2">
                  <ExternalLink className="h-4 w-4" /> Read Case Study
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Resources section */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/prompts/cheat-sheets" className="group">
              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Prompt Cheat Sheets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Downloadable reference guides and templates for different AI models and use cases.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline-green" className="group-hover:bg-green/10 gap-2">
                    <ExternalLink className="h-4 w-4" /> View Cheat Sheets
                  </Button>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/playground?mode=prompt" className="group">
              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Interactive Playground
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Test and refine these techniques in our interactive environment with real-time feedback.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline-green" className="group-hover:bg-green/10 gap-2">
                    <ExternalLink className="h-4 w-4" /> Open Playground
                  </Button>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/prompts/community" className="group">
              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Community Examples
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Browse user-submitted prompt techniques and contribute your own discoveries.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline-green" className="group-hover:bg-green/10 gap-2">
                    <ExternalLink className="h-4 w-4" /> Explore Community
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
} 