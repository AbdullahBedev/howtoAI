import { SiteLayout } from "@/components/layout/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowRight, ArrowUpDown, BookmarkPlus, FileDown, Heart, MessageSquare, Search, Share2, Star, ThumbsUp, TrendingUp, Trophy, Users } from "lucide-react";

export default function CommunityPage() {
  return (
    <SiteLayout>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Community Contributions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover, share, and collaborate on prompt engineering techniques with our global community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" className="gap-2">
              Submit Your Prompt <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              Join Discussion <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search and filter */}
        <div className="mb-12">
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search community prompts..." className="pl-10" />
          </div>
          <Tabs defaultValue="trending">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="trending" className="gap-2">
                  <TrendingUp className="h-4 w-4" /> Trending
                </TabsTrigger>
                <TabsTrigger value="newest" className="gap-2">
                  <ArrowUpDown className="h-4 w-4" /> Newest
                </TabsTrigger>
                <TabsTrigger value="top" className="gap-2">
                  <Trophy className="h-4 w-4" /> Top Rated
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">GPT-4</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Claude</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Coding</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Writing</Badge>
              </div>
            </div>

            {/* Trending content */}
            <TabsContent value="trending">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Prompt card 1 */}
                <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Multi-Perspective Analysis Framework</CardTitle>
                      <Badge variant="outline" className="bg-primary/10">Trending</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <span>By PromptMaster</span>
                      <span className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-3 w-3 fill-yellow-500" />
                        4.9
                      </span>
                      <span className="text-muted-foreground">3.2k uses</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      A framework for analyzing complex topics from multiple expert perspectives, with built-in synthesis of viewpoints.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">Decision Making</Badge>
                      <Badge variant="secondary">Analysis</Badge>
                      <Badge variant="secondary">GPT-4</Badge>
                    </div>
                    <div className="bg-muted p-3 rounded text-xs font-mono line-clamp-3">
                      Analyze [topic] from the perspective of: 1) A [expert type 1], 2) A [expert type 2], 3) A [expert type 3]. For each perspective, provide key insights, potential concerns, and recommended approaches...
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="gap-2">
                      <FileDown className="h-4 w-4" /> Use Template
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>

                {/* Prompt card 2 */}
                <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Recursive Self-Improvement Prompt</CardTitle>
                      <Badge variant="outline" className="bg-primary/10">Hot</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <span>By AIOptimizer</span>
                      <span className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-3 w-3 fill-yellow-500" />
                        4.8
                      </span>
                      <span className="text-muted-foreground">2.7k uses</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      A technique that enables AI to iteratively improve its own responses through structured self-critique and refinement.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">Advanced</Badge>
                      <Badge variant="secondary">Optimization</Badge>
                      <Badge variant="secondary">Claude</Badge>
                    </div>
                    <div className="bg-muted p-3 rounded text-xs font-mono line-clamp-3">
                      I want you to respond to my prompt, then critique your response across these dimensions: accuracy, clarity, completeness, and creativity. Then provide an improved version based on your critique...
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="gap-2">
                      <FileDown className="h-4 w-4" /> Use Template
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>

                {/* Prompt card 3 */}
                <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Code Refactoring Assistant</CardTitle>
                      <Badge variant="outline" className="bg-primary/10">Popular</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <span>By DevGuru</span>
                      <span className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-3 w-3 fill-yellow-500" />
                        4.7
                      </span>
                      <span className="text-muted-foreground">2.1k uses</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      A specialized prompt for code refactoring that improves readability, performance, and maintainability while preserving functionality.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">Coding</Badge>
                      <Badge variant="secondary">Refactoring</Badge>
                      <Badge variant="secondary">GPT-4</Badge>
                    </div>
                    <div className="bg-muted p-3 rounded text-xs font-mono line-clamp-3">
                      Refactor the following code to improve its [specific goals: readability/performance/maintainability]. Maintain all functionality while applying best practices for [language]. Explain your changes...
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="gap-2">
                      <FileDown className="h-4 w-4" /> Use Template
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Newest content */}
            <TabsContent value="newest">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder for newest prompts */}
                <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Multimodal Content Generator</CardTitle>
                      <Badge variant="outline" className="bg-primary/10">New</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <span>By CreativeAI</span>
                      <span className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-3 w-3 fill-yellow-500" />
                        4.5
                      </span>
                      <span className="text-muted-foreground">342 uses</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      A framework for generating coordinated content across text, image prompts, and audio descriptions.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">Multimodal</Badge>
                      <Badge variant="secondary">Creative</Badge>
                      <Badge variant="secondary">GPT-4</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="gap-2">
                      <FileDown className="h-4 w-4" /> Use Template
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>

                {/* More newest prompts would go here */}
              </div>
            </TabsContent>

            {/* Top rated content */}
            <TabsContent value="top">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder for top rated prompts */}
                <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Universal Debugging Framework</CardTitle>
                      <Badge variant="outline" className="bg-primary/10">Top Rated</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <span>By CodeMaster</span>
                      <span className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-3 w-3 fill-yellow-500" />
                        5.0
                      </span>
                      <span className="text-muted-foreground">5.7k uses</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      A systematic approach to debugging code across any programming language with root cause analysis.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">Debugging</Badge>
                      <Badge variant="secondary">Programming</Badge>
                      <Badge variant="secondary">All Models</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="gap-2">
                      <FileDown className="h-4 w-4" /> Use Template
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>

                {/* More top rated prompts would go here */}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Community features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Community Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Prompt Collaboration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Work together with other community members to refine and improve prompts through collaborative editing and version control.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>Version history tracking</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>Collaborative improvement</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>Attribution system</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="gap-2 w-full">
                  Start Collaborating <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Discussion Forums
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Engage in discussions about prompt engineering techniques, share your experiences, and learn from other community members.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>Technique discussions</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>Model-specific forums</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>Use case sharing</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="gap-2 w-full">
                  Join Discussions <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Weekly Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Participate in weekly prompt engineering challenges to test your skills, learn new techniques, and win recognition.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>Themed competitions</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>Community voting</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>Featured showcase</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="gap-2 w-full">
                  View Challenges <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Community spotlight */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Community Spotlight</h2>
          <Card>
            <CardHeader>
              <CardTitle>Featured Contributor: PromptMaster</CardTitle>
              <CardDescription>Expert in multi-perspective analysis and creative prompt techniques</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <p className="text-muted-foreground mb-4">
                    PromptMaster has contributed over 50 high-quality prompts to our community, specializing in techniques that enable AI to analyze complex topics from multiple perspectives. Their frameworks have been used by thousands of community members.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-medium text-sm mb-1">Expertise:</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground ml-2">
                        <li>Multi-perspective analysis</li>
                        <li>Decision-making frameworks</li>
                        <li>Creative problem-solving</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Contributions:</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground ml-2">
                        <li>50+ prompts shared</li>
                        <li>15k+ total uses</li>
                        <li>4.8 average rating</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Top Contributor</Badge>
                    <Badge variant="outline">Analysis Expert</Badge>
                    <Badge variant="outline">Creative Techniques</Badge>
                  </div>
                </div>
                <div className="md:w-1/3 bg-muted rounded-lg p-4">
                  <h4 className="font-medium mb-3 text-sm">Featured Technique: Perspective Switching</h4>
                  <div className="bg-background p-3 rounded border text-xs font-mono">
                    "I've found that the most powerful insights come when you force the AI to adopt radically different perspectives on the same problem. The key is to select perspectives that have inherently different values, priorities, and knowledge bases. This creates a form of 'cognitive triangulation' that reveals blind spots in your thinking."
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="gap-2">
                View Profile <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Prompt Engineering Community</h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Share your techniques, learn from others, and help build the future of prompt engineering together with thousands of AI enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              Create Account <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              Learn More <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
} 