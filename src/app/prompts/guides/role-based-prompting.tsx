import { SiteLayout } from "@/components/layout/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { InteractiveExample } from "@/components/prompts/interactive-example";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, BrainCircuit, Code, FileText, Lightbulb, MessageSquare, Sparkles, Target, Wand2, ExternalLink } from "lucide-react";

export default function RoleBasedPromptingPage() {
  return (
    <SiteLayout>
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Link href="/prompts" className="hover:text-primary">Prompts</Link>
          <span className="mx-2">/</span>
          <Link href="/prompts/guides" className="hover:text-primary">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Role-Based Prompting</span>
        </div>
        
        {/* Hero section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Role-Based Prompting
          </h1>
          <p className="text-xl text-muted-foreground">
            Enhance AI responses by assigning specific roles and personas
          </p>
        </div>

        {/* Main content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <h2>What is Role-Based Prompting?</h2>
          <p>
            Role-based prompting is a technique where you explicitly assign a specific role, profession, or persona to the AI. By doing this, you frame the AI's responses through the lens of that role's expertise, vocabulary, and perspective.
          </p>
          <p>
            This technique leverages the AI's ability to simulate different viewpoints and specialized knowledge domains, resulting in more focused, authoritative, and contextually appropriate responses.
          </p>

          <h2>Why Use Role-Based Prompting?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Access Specialized Knowledge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Frame responses with domain-specific terminology, methodologies, and best practices by assigning expert roles.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Improve Response Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Get more structured, thorough, and methodical answers when the AI adopts professional roles with established workflows.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Gain Multiple Perspectives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Analyze problems from different angles by assigning various roles to examine the same issue.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Enhance Creativity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Unlock creative thinking by assigning roles that bring unique approaches and unconventional viewpoints.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2>How to Implement Role-Based Prompting</h2>
          <h3>Basic Structure</h3>
          <div className="bg-muted p-4 rounded-md mb-6">
            <pre className="text-sm font-mono whitespace-pre-wrap">
              Act as a [specific role/profession/persona].
              
              [Additional context about the role's expertise, approach, or methodology]
              
              [Your specific request or question]
            </pre>
          </div>

          <h3>Key Components</h3>
          <ol>
            <li>
              <strong>Role Definition</strong>: Clearly specify the role at the beginning of your prompt.
            </li>
            <li>
              <strong>Role Characteristics</strong>: Optionally, add details about how the role should approach the task.
            </li>
            <li>
              <strong>Specific Request</strong>: Clearly state what you want the AI to do from the perspective of that role.
            </li>
          </ol>

          <h3>Advanced Techniques</h3>
          <ul>
            <li>
              <strong>Multi-Role Analysis</strong>: Ask the AI to analyze a problem from multiple professional perspectives.
            </li>
            <li>
              <strong>Role Constraints</strong>: Add specific limitations or focus areas for the role.
            </li>
            <li>
              <strong>Temporal Context</strong>: Specify a time period for historical roles (e.g., "a physicist from the 1920s").
            </li>
          </ul>

          <h2>Interactive Examples</h2>
        </div>

        <InteractiveExample 
          title="Professional Expert Roles"
          description="Assign professional roles to access specialized knowledge and methodologies"
          examples={[
            {
              name: "software-architect",
              prompt: "Act as an experienced software architect with expertise in microservices and cloud infrastructure.\n\nReview the following system design and provide feedback on its scalability, maintainability, and potential bottlenecks:\n\n[System description: A monolithic e-commerce application that handles product catalog, user accounts, shopping cart, payment processing, and order fulfillment. Currently deployed on a single server with a PostgreSQL database.]",
              response: "# Software Architecture Review\n\n## Current Architecture Assessment\n\nThe described monolithic e-commerce system presents several challenges from a modern architecture perspective:\n\n### Scalability Concerns\n- **Vertical Scaling Limitations**: The single-server deployment creates a ceiling for growth\n- **Uneven Resource Requirements**: Different components (payment processing vs. catalog browsing) have varying load patterns but must scale together\n- **Database Bottlenecks**: A single PostgreSQL instance will become a performance constraint as transaction volume increases\n\n### Maintainability Issues\n- **Development Complexity**: As the codebase grows, the monolith becomes harder to understand and modify\n- **Deployment Risk**: Any change requires redeploying the entire application\n- **Technology Lock-in**: Difficult to adopt different technologies for specific components\n\n## Recommended Microservices Approach\n\nI recommend transitioning to a microservices architecture with the following components:\n\n1. **Product Catalog Service**\n   - Read-optimized with caching layer\n   - Could use a document database for flexible product attributes\n\n2. **User Account Service**\n   - Authentication and profile management\n   - Separate database with appropriate security measures\n\n3. **Cart Service**\n   - In-memory data store with persistence\n   - Optimized for high-frequency updates\n\n4. **Payment Processing Service**\n   - Isolated for security compliance (PCI DSS)\n   - Transactional consistency requirements\n\n5. **Order Fulfillment Service**\n   - Event-driven architecture\n   - Integration with external logistics systems\n\n## Implementation Strategy\n\nI recommend a phased approach:\n\n1. Introduce an API gateway in front of the monolith\n2. Extract services incrementally, starting with the product catalog\n3. Implement event-based communication between services\n4. Adopt a container orchestration platform (Kubernetes) for deployment\n5. Implement distributed monitoring and tracing\n\nThis approach will improve scalability by allowing independent scaling of components, enhance maintainability through smaller, focused codebases, and eliminate the database bottleneck through purpose-specific data stores."
            },
            {
              name: "ux-designer",
              prompt: "Act as a senior UX designer with expertise in mobile application design and user research.\n\nReview the following app concept and provide feedback on its usability, potential pain points, and suggestions for improvement:\n\n[App concept: A meal planning app that allows users to browse recipes, create weekly meal plans, generate shopping lists, and track nutritional information. The target audience is busy professionals who want to eat healthier but have limited time to plan and cook.]",
              response: "# UX Design Review: Meal Planning App\n\n## Overall Concept Assessment\n\nThis meal planning app addresses a genuine need for busy professionals. The combination of recipe browsing, meal planning, shopping list generation, and nutrition tracking creates a comprehensive solution. However, this breadth of functionality also presents UX challenges that need careful consideration.\n\n## Potential User Pain Points\n\n### 1. Onboarding Complexity\n- **First-time Experience**: New users may feel overwhelmed by multiple features\n- **Time Investment**: The initial setup (preferences, dietary restrictions, etc.) might deter busy users\n- **Value Demonstration**: Users need to quickly understand benefits before investing time\n\n### 2. Daily Usage Friction\n- **Planning Fatigue**: Creating weekly plans from scratch is time-consuming\n- **Flexibility Issues**: Busy professionals often have unpredictable schedules\n- **Recipe Browsing Efficiency**: Finding suitable recipes quickly is essential\n\n### 3. Shopping Experience\n- **List Management**: Shopping lists must be easily modifiable in-store\n- **Ingredient Consolidation**: Similar ingredients across recipes need smart combining\n- **Pantry Integration**: Users don't want to rebuy items they already have\n\n## Recommendations\n\n### Streamlined Onboarding\n1. **Progressive Disclosure**: Introduce features gradually, starting with recipe browsing\n2. **Quick-start Templates**: Offer pre-made meal plans based on dietary preferences\n3. **5-minute Setup Promise**: Design onboarding to be completed in under 5 minutes\n\n### Intelligent Planning Features\n1. **AI-Assisted Planning**: Suggest meals based on preferences and past choices\n2. **Flexible Scheduling**: Allow easy rearrangement of meals when plans change\n3. **Time-Based Filtering**: Filter recipes by preparation time (e.g., \"under 30 minutes\")\n4. **Batch Cooking Suggestions**: Identify recipes that work well for multiple meals\n\n### Enhanced Shopping Experience\n1. **Smart Lists**: Organize by store layout or department\n2. **Quick Check-off**: One-handed operation for checking items while shopping\n3. **Pantry Integration**: Allow users to indicate items they already have\n4. **Voice Input**: Add items by voice for hands-free operation\n\n### Mobile-Specific Optimizations\n1. **Bottom Navigation**: Place key functions within thumb reach\n2. **Offline Functionality**: Ensure shopping lists work without connectivity\n3. **Widget Support**: Create home screen widgets for today's meal plan\n4. **Cross-Device Sync**: Seamlessly transition between mobile and web interfaces\n\n## Next Steps in the Design Process\n\nI recommend conducting user research with your target audience to validate these assumptions and prioritize features. Consider creating a prototype focusing on the core user journey (finding recipes → planning meals → shopping) and test it with busy professionals to identify friction points before full development."
            },
            {
              name: "financial-advisor",
              prompt: "Act as a certified financial advisor with expertise in retirement planning and investment strategies.\n\nProvide advice for the following situation:\n\n[Client profile: A 35-year-old software engineer earning $120,000 annually with $30,000 in student loan debt (4.5% interest), $15,000 in an emergency fund, and $45,000 in a 401(k). They want to buy a house in the next 5 years and eventually retire at 60. They're currently contributing 6% to their 401(k) with a 3% employer match.]",
              response: "# Financial Advisory: Retirement & Home Purchase Strategy\n\n## Current Financial Snapshot\n\n**Strengths:**\n- Strong income ($120,000/year)\n- Established emergency fund ($15,000)\n- Employer-matched retirement contributions\n- Moderate student loan interest rate (4.5%)\n\n**Areas for Improvement:**\n- Retirement savings below recommended trajectory for age\n- Home purchase fund not yet established\n- Student loan debt outstanding\n- 401(k) contribution below optimal level\n\n## Recommended Action Plan\n\n### Immediate Steps (Next 3-6 Months)\n\n1. **Increase 401(k) Contribution**\n   - Gradually increase from 6% to 15% (including employer match)\n   - This adjustment maximizes tax advantages while accelerating retirement savings\n   - Even a 1% increase every 3 months will be significant over time\n\n2. **Establish a House Down Payment Fund**\n   - Open a high-yield savings account specifically for your home purchase\n   - Target 20% down payment plus closing costs (approximately $60,000-$100,000 depending on market)\n   - Set up automatic transfers of $1,000-$1,500/month to reach goal within 5 years\n\n3. **Student Loan Strategy**\n   - Maintain regular payments rather than accelerating payoff\n   - At 4.5%, the interest rate is low enough that your money can work harder elsewhere\n   - Consider refinancing if rates drop significantly\n\n### Medium-Term Strategy (1-3 Years)\n\n1. **Diversify Retirement Investments**\n   - Open a Roth IRA ($6,000/year contribution) for tax diversification\n   - Ensure 401(k) investments are properly allocated (suggested: 80% equity/20% bonds at your age)\n   - Review investment fees and consider low-cost index funds\n\n2. **Tax Optimization**\n   - Maximize HSA contributions if available through employer\n   - Consider tax-loss harvesting in taxable accounts\n   - Review tax credits available for retirement savings (Saver's Credit)\n\n3. **Insurance Review**\n   - Ensure adequate disability insurance (protects your high earning potential)\n   - Consider term life insurance if you have or plan to have dependents\n   - Review health insurance options annually\n\n### Home Purchase Preparation\n\n1. **Credit Optimization**\n   - Monitor and maintain excellent credit score (target 760+)\n   - Avoid opening new credit lines 1-2 years before mortgage application\n   - Keep credit utilization under 30%\n\n2. **Housing Budget Guidelines**\n   - Target home price: 3-4x annual income ($360,000-$480,000)\n   - Monthly payment: Keep under 28% of gross monthly income\n   - Factor in property taxes, insurance, and maintenance (typically 1-3% of home value annually)\n\n### Long-Term Retirement Planning\n\nBased on your current trajectory and recommended adjustments:\n\n- Projected 401(k) value at age 60: ~$1.5-1.8 million (assuming 7% average returns)\n- Additional Roth IRA value: ~$400,000-$500,000\n- Estimated retirement income: $75,000-$90,000/year (in today's dollars)\n\nThis strategy balances your dual goals of home ownership and retirement, while maintaining financial flexibility. I recommend reviewing this plan annually and after any major life changes (marriage, children, career changes)."
            }
          ]}
        />

        <div className="prose prose-lg dark:prose-invert max-w-none my-12">
          <h2>Best Practices and Tips</h2>
          
          <h3>Do's</h3>
          <ul>
            <li>
              <strong>Be Specific About Expertise</strong>: Instead of "Act as a doctor," use "Act as a cardiologist with 20 years of experience in treating arrhythmias."
            </li>
            <li>
              <strong>Include Methodologies</strong>: Mention specific frameworks or approaches the role would use (e.g., "using the STAR interview method").
            </li>
            <li>
              <strong>Combine with Other Techniques</strong>: Role-based prompting works well with chain-of-thought and few-shot prompting.
            </li>
          </ul>

          <h3>Don'ts</h3>
          <ul>
            <li>
              <strong>Avoid Unrealistic Expectations</strong>: The AI is simulating expertise, not providing actual professional advice.
            </li>
            <li>
              <strong>Don't Overspecify</strong>: Too many details about the role can make the prompt confusing.
            </li>
            <li>
              <strong>Avoid Contradictory Roles</strong>: Don't ask the AI to adopt conflicting personas simultaneously.
            </li>
          </ul>

          <h2>Common Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Content Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>Copywriter for marketing materials</li>
                  <li>Journalist for news articles</li>
                  <li>Technical writer for documentation</li>
                  <li>Storyteller for creative fiction</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Education</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>Teacher explaining complex concepts</li>
                  <li>Tutor for specific subjects</li>
                  <li>Academic researcher analyzing topics</li>
                  <li>Study guide creator</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Problem Solving</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>Business consultant analyzing issues</li>
                  <li>Detective investigating scenarios</li>
                  <li>Engineer troubleshooting problems</li>
                  <li>Strategist developing plans</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Feedback & Review</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>Editor reviewing written content</li>
                  <li>UX designer evaluating interfaces</li>
                  <li>Code reviewer assessing software</li>
                  <li>Food critic analyzing recipes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t">
          <Button variant="outline" className="gap-2" asChild>
            <Link href="/prompts/guides">
              <ArrowLeft className="h-4 w-4" /> Back to Guides
            </Link>
          </Button>
          <Button variant="outline" className="gap-2" asChild>
            <Link href="/prompts/guides/chain-of-thought">
              Chain-of-Thought Prompting <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </SiteLayout>
  );
} 