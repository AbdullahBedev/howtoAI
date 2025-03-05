import { SiteLayout } from "@/components/layout/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  ArrowRight, Code, FileCode, Sparkles, Terminal, Wrench, Brain, 
  GitBranch, Bug, Zap, CheckCircle2, XCircle, AlertTriangle, 
  Cpu, GitFork, BookOpen, Layers, Settings, RefreshCw
} from "lucide-react";

interface PromptExampleProps {
  title: string;
  description: string;
  prompt: string;
  output: string;
  tags?: string[];
}

interface InteractiveExampleStep {
  title: string;
  description: string;
  code: string;
}

interface InteractiveExampleProps {
  title: string;
  steps: InteractiveExampleStep[];
}

const PromptExample = ({ title, description, prompt, output, tags = [] }: PromptExampleProps) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" className="bg-primary/5">
            {tag}
          </Badge>
        ))}
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div>
          <div className="font-medium text-sm mb-2">Prompt:</div>
          <div className="bg-muted p-4 rounded-md font-mono text-sm whitespace-pre-wrap">
            {prompt}
          </div>
        </div>
        <div>
          <div className="font-medium text-sm mb-2">Output:</div>
          <div className="bg-primary/5 p-4 rounded-md font-mono text-sm whitespace-pre-wrap">
            {output}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const InteractiveExample = ({ title, steps }: InteractiveExampleProps) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="bg-primary/10 rounded-full p-2 mt-1">
            <span className="text-primary font-medium">{index + 1}</span>
          </div>
          <div>
            <h4 className="font-medium mb-2">{step.title}</h4>
            <p className="text-muted-foreground mb-3">{step.description}</p>
            <div className="bg-muted p-4 rounded-md font-mono text-sm">
              {step.code}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function VibeCodingPage() {
  return (
    <SiteLayout>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero section */}
        <div className="mb-16 text-center">
          <div className="inline-block">
            <Badge variant="outline" className="mb-4 text-primary">New: Chain-of-Thought Prompting for Code</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Vibe <span className="bg-gradient-to-r from-primary via-green to-secondary bg-clip-text text-transparent">Coding</span> Prompts
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master advanced prompt engineering techniques for AI-assisted coding, featuring chain-of-thought reasoning,
            multi-step problem decomposition, and context-aware code generation.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Badge variant="green" className="px-3 py-1 text-sm">Code Generation</Badge>
            <Badge variant="green" className="px-3 py-1 text-sm">Debugging</Badge>
            <Badge variant="green" className="px-3 py-1 text-sm">Refactoring</Badge>
            <Badge variant="green" className="px-3 py-1 text-sm">Testing</Badge>
            <Badge variant="green" className="px-3 py-1 text-sm">Architecture</Badge>
          </div>
        </div>

        {/* Quick Start */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Quick Start Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Chain-of-Thought
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Break down complex coding tasks into logical steps for better results.
                </p>
                <div className="bg-primary/10 p-4 rounded-md">
                  <p className="font-medium mb-2">Pro Tip</p>
                  <p className="text-sm">
                    Ask the AI to explain its reasoning at each step to catch potential issues early.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  Context Layering
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Build context gradually through a series of related prompts.
                </p>
                <div className="bg-primary/10 p-4 rounded-md">
                  <p className="font-medium mb-2">Pro Tip</p>
                  <p className="text-sm">
                    Start with architecture, then drill down into specific components.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  System Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Use AI to architect robust, scalable systems from the ground up.
                </p>
                <div className="bg-primary/10 p-4 rounded-md">
                  <p className="font-medium mb-2">Pro Tip</p>
                  <p className="text-sm">
                    Define non-functional requirements upfront for better architecture decisions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Advanced Techniques */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Advanced Techniques</h2>
          <Tabs defaultValue="architecture">
            <TabsList className="mb-6">
              <TabsTrigger value="architecture" className="gap-2">
                <Cpu className="h-4 w-4" /> System Architecture
              </TabsTrigger>
              <TabsTrigger value="implementation" className="gap-2">
                <Code className="h-4 w-4" /> Implementation
              </TabsTrigger>
              <TabsTrigger value="testing" className="gap-2">
                <Bug className="h-4 w-4" /> Testing & QA
              </TabsTrigger>
            </TabsList>

            <TabsContent value="architecture" className="space-y-6">
              <PromptExample
                title="Domain-Driven Design Prompt"
                description="Generate a DDD-based architecture for a complex system"
                tags={["Architecture", "DDD", "Best Practices"]}
                prompt={`Help me design a domain-driven architecture for an e-commerce system with the following bounded contexts:

CORE DOMAINS:
- Order Management
- Product Catalog
- Customer Management

REQUIREMENTS:
- Event-driven communication between domains
- CQRS pattern for order processing
- Eventual consistency for inventory

Please provide:
1. Domain model for each context
2. Key aggregates and entities
3. Event interfaces
4. Repository interfaces`}
                output={`Let's break this down systematically:

1. Order Management Domain
   - Aggregates:
     - Order (root)
     - OrderLine
     - Payment
   - Events:
     - OrderCreated
     - OrderPaid
     - OrderShipped

2. Product Catalog Domain
   - Aggregates:
     - Product (root)
     - Category
     - Inventory
   - Events:
     - ProductCreated
     - InventoryUpdated

[Additional details truncated for brevity...]`}
              />

              <InteractiveExample
                title="Evolving Architecture Through Prompts"
                steps={[
                  {
                    title: "1. Define Core Domains",
                    description: "Start with high-level domain identification",
                    code: `Please identify the core domains for a [your system] based on these requirements: [requirements]`
                  },
                  {
                    title: "2. Design Aggregates",
                    description: "Break down each domain into aggregates and entities",
                    code: `For the [specific domain], design the aggregate roots and entities following DDD principles.`
                  },
                  {
                    title: "3. Define Boundaries",
                    description: "Establish clear boundaries and interactions",
                    code: `How should these domains communicate while maintaining loose coupling?`
                  }
                ]}
              />
            </TabsContent>

            <TabsContent value="implementation" className="space-y-6">
              <PromptExample
                title="Type-Safe API Implementation"
                description="Generate a fully typed API endpoint with validation"
                tags={["TypeScript", "API", "Validation"]}
                prompt={`Create a Next.js API route for user registration with:

REQUIREMENTS:
- Zod validation
- Error handling
- Rate limiting
- JWT token generation
- TypeScript types for request/response

Include:
1. Request/response types
2. Validation schema
3. Error handling middleware
4. Rate limiting implementation`}
                output={`Here's a complete implementation:

\`\`\`typescript
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

// Types
interface RegisterResponse {
  user: {
    id: string;
    email: string;
  };
  token: string;
}

// Validation Schema
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2)
});

// API Route
export async function POST(req: Request) {
  try {
    // Rate limiting
    const { success } = await rateLimit.check(req);
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    // Validation
    const body = await req.json();
    const result = registerSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // Implementation...
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
\`\`\``}
              />

              <InteractiveExample
                title="Test-Driven Development Flow"
                steps={[
                  {
                    title: "1. Write Test Cases",
                    description: "Generate comprehensive test cases first",
                    code: `Create test cases for a user registration system covering: valid inputs, invalid emails, weak passwords, duplicate users`
                  },
                  {
                    title: "2. Implement Feature",
                    description: "Implement the feature to satisfy tests",
                    code: `Implement the user registration system to pass all test cases, using TypeScript and proper error handling`
                  },
                  {
                    title: "3. Refactor",
                    description: "Improve code quality while maintaining test coverage",
                    code: `Refactor the implementation to improve performance and maintainability while keeping all tests passing`
                  }
                ]}
              />
            </TabsContent>

            <TabsContent value="testing" className="space-y-6">
              <PromptExample
                title="Comprehensive Test Suite Generation"
                description="Generate a complete test suite with edge cases"
                tags={["Testing", "Jest", "Edge Cases"]}
                prompt={`Generate a comprehensive test suite for a user authentication system:

FEATURES TO TEST:
- Login
- Registration
- Password Reset
- Session Management

REQUIREMENTS:
- Unit tests
- Integration tests
- Edge cases
- Mocking strategies
- Error scenarios`}
                output={`Here's a structured test suite:

\`\`\`typescript
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AuthService } from './auth.service';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client');

describe('AuthService', () => {
  let authService: AuthService;
  let mockPrisma: jest.Mocked<PrismaClient>;

  beforeEach(() => {
    mockPrisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    authService = new AuthService(mockPrisma);
  });

  describe('login', () => {
    it('should successfully log in with valid credentials', async () => {
      // Test implementation...
    });

    it('should handle invalid passwords correctly', async () => {
      // Test implementation...
    });

    it('should handle non-existent users', async () => {
      // Test implementation...
    });
  });

  // Additional test cases...
});
\`\`\``}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Best Practices */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Best Practices & Patterns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-green" />
                      <h4 className="font-medium">Chain-of-Thought Prompting</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Break down complex problems into steps:</p>
                    <div className="bg-muted p-4 rounded-md font-mono text-sm mt-2">
{`Let's solve this step by step:

1. First, let's understand the requirements
2. Then, design the data structures
3. Next, implement core functionality
4. Finally, add error handling and tests`}
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-green" />
                      <h4 className="font-medium">Context Layering</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Build context gradually:</p>
                    <div className="bg-muted p-4 rounded-md font-mono text-sm mt-2">
{`1. System Architecture:
   "Design a high-level architecture for..."

2. Component Design:
   "For the user service, design..."

3. Implementation:
   "Implement the user registration flow..."`}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Pitfalls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-destructive/5">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="h-5 w-5 text-destructive" />
                      <h4 className="font-medium">Vague Requirements</h4>
                    </div>
                    <p className="text-sm">
                      Always provide specific requirements, constraints, and expected behavior.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-destructive/5">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="h-5 w-5 text-destructive" />
                      <h4 className="font-medium">Missing Context</h4>
                    </div>
                    <p className="text-sm">
                      Include relevant technical context, dependencies, and version information.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-destructive/5">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="h-5 w-5 text-destructive" />
                      <h4 className="font-medium">Ignoring Edge Cases</h4>
                    </div>
                    <p className="text-sm">
                      Explicitly request handling of edge cases, errors, and validation.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-warning/5">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                      <h4 className="font-medium">Best Practices</h4>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Always specify TypeScript types</li>
                      <li>Request error handling</li>
                      <li>Include validation requirements</li>
                      <li>Consider performance implications</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* IDE AI Rules */}
        <div className="mb-16">
          <div className="mb-8">
            <Badge variant="outline" className="mb-4">Premium Guide</Badge>
            <h2 className="text-3xl font-bold">IDE AI Rules & Strategies</h2>
            <p className="text-lg text-muted-foreground mt-4">
              Master-level techniques for maximizing AI pair programming productivity and code quality.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Context Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-primary">Rule #1: Progressive Context Building</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Build context in layers, starting with high-level architecture and progressively diving into implementation details.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-2">Example Flow:</p>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>System architecture overview</li>
                        <li>Domain model and data flow</li>
                        <li>Component relationships</li>
                        <li>Specific implementation details</li>
                      </ol>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-primary">Rule #2: State Management Protocol</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Explicitly manage the AI's understanding of your codebase state and requirements.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-2">Key Points:</p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Current file structure</li>
                        <li>Active dependencies</li>
                        <li>State management approach</li>
                        <li>Testing requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Code Generation Mastery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-primary">Rule #3: Architectural Integrity</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Ensure generated code aligns with your architectural patterns and best practices.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-2">Checklist:</p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Design pattern consistency</li>
                        <li>Error handling strategy</li>
                        <li>Performance considerations</li>
                        <li>Security best practices</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-primary">Rule #4: Iterative Refinement</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Use multi-step prompting to progressively improve code quality and functionality.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-2">Process:</p>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Initial implementation</li>
                        <li>Code review and optimization</li>
                        <li>Edge case handling</li>
                        <li>Documentation and tests</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-primary" />
                  Advanced Integration Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-primary">Rule #5: System Integration</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Optimize AI assistance for complex system integration scenarios.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-2">Integration Flow:</p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="text-primary">→</span>
                          <span>Define integration boundaries and contracts</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">→</span>
                          <span>Implement interface adapters</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">→</span>
                          <span>Handle cross-cutting concerns</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">→</span>
                          <span>Validate integration points</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-primary">Rule #6: Testing Strategy</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Leverage AI for comprehensive test coverage and quality assurance.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-2">Testing Layers:</p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="text-primary">1.</span>
                          <span>Unit tests with edge cases</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">2.</span>
                          <span>Integration test scenarios</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">3.</span>
                          <span>E2E test automation</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">4.</span>
                          <span>Performance benchmarks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Optimization & Maintenance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-primary">Rule #7: Performance Optimization</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Systematic approach to optimizing code performance with AI assistance.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-2">Optimization Areas:</p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="text-primary">⚡</span>
                          <span>Runtime performance analysis</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">⚡</span>
                          <span>Memory optimization patterns</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">⚡</span>
                          <span>Bundle size reduction</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">⚡</span>
                          <span>Network optimization</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 text-primary">Rule #8: Maintenance Excellence</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Strategies for maintaining code quality and documentation over time.
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-2">Maintenance Checklist:</p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="text-primary">✓</span>
                          <span>Automated documentation updates</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">✓</span>
                          <span>Code smell detection</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">✓</span>
                          <span>Dependency management</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary">✓</span>
                          <span>Technical debt tracking</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 p-6 border rounded-lg bg-primary/5">
            <h3 className="text-xl font-semibold mb-4">Premium Tips for 10x Development Speed</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Parallel Development
                </h4>
                <p className="text-sm text-muted-foreground">
                  Use AI to simultaneously work on multiple components while maintaining consistency.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-primary" />
                  Rapid Prototyping
                </h4>
                <p className="text-sm text-muted-foreground">
                  Generate and iterate through multiple implementation approaches quickly.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <GitFork className="h-4 w-4 text-primary" />
                  Smart Branching
                </h4>
                <p className="text-sm text-muted-foreground">
                  Leverage AI for feature branching and conflict resolution strategies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Interactive Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Real-World Scenarios</CardTitle>
                <CardDescription>
                  Practice with common development challenges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Authentication System</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Implement a secure authentication system with JWT
                    </p>
                    <Button variant="outline" className="w-full">
                      Try This Example
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Real-time Chat</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Build a WebSocket-based chat application
                    </p>
                    <Button variant="outline" className="w-full">
                      Try This Example
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Data Grid Component</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Create a performant data grid with sorting and filtering
                    </p>
                    <Button variant="outline" className="w-full">
                      Try This Example
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">API Gateway</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Design a scalable API gateway with rate limiting
                    </p>
                    <Button variant="outline" className="w-full">
                      Try This Example
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prompt Templates</CardTitle>
                <CardDescription>
                  Ready-to-use templates for common tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Component Creation</h4>
                    <div className="bg-muted p-3 rounded-md text-sm font-mono mb-2">
{`Create a React component that:
1. [Key requirement]
2. [Key requirement]
3. [Key requirement]

Technical Requirements:
- TypeScript types
- Error handling
- Accessibility
- Tests`}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Copy Template
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">API Endpoint</h4>
                    <div className="bg-muted p-3 rounded-md text-sm font-mono mb-2">
{`Create a Next.js API route that:
1. [Endpoint purpose]
2. [Data requirements]
3. [Security requirements]

Include:
- Validation
- Error handling
- Rate limiting
- Types`}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Copy Template
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Database Schema</h4>
                    <div className="bg-muted p-3 rounded-md text-sm font-mono mb-2">
{`Design a Prisma schema for:
[Domain description]

Requirements:
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

Consider:
- Relations
- Indexes
- Constraints`}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Copy Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Level Up Your Coding?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start using these advanced prompt engineering techniques to write better, more maintainable code faster.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/playground">
              <Button size="lg" className="gap-2">
                Try in Playground <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/prompts/community">
              <Button size="lg" variant="outline" className="gap-2">
                View Community Examples <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}