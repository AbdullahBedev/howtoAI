"use client";

import { useState } from "react";
import { SiteLayout } from "@/components/layout/site-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Eye, Filter, Search, Plus, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";

// Mock data for forum posts
const forumPosts = [
  {
    id: 1,
    title: "How to fine-tune GPT-3 for specific tasks?",
    author: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    category: "GPT Models",
    tags: ["fine-tuning", "gpt-3", "openai"],
    replies: 12,
    views: 342,
    likes: 28,
    isAnswered: true,
    createdAt: "2 days ago",
    excerpt: "I'm trying to fine-tune GPT-3 for my specific use case but I'm running into some issues with the training data format...",
  },
  {
    id: 2,
    title: "Best practices for prompt engineering with Claude?",
    author: {
      name: "Sarah Miller",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    category: "Prompt Engineering",
    tags: ["claude", "anthropic", "prompts"],
    replies: 8,
    views: 215,
    likes: 19,
    isAnswered: false,
    createdAt: "5 days ago",
    excerpt: "I've been experimenting with Claude and noticed that it responds differently to certain prompt structures compared to GPT models...",
  },
  {
    id: 3,
    title: "How to implement RAG (Retrieval Augmented Generation) effectively?",
    author: {
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    category: "AI Development",
    tags: ["rag", "vector-db", "embeddings"],
    replies: 15,
    views: 427,
    likes: 42,
    isAnswered: true,
    createdAt: "1 week ago",
    excerpt: "I'm building a system that uses RAG to provide more accurate responses. I'm wondering what the best practices are for...",
  },
  {
    id: 4,
    title: "DALL-E 3 vs Midjourney: Which is better for product design?",
    author: {
      name: "Emily Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    category: "Image Generation",
    tags: ["dall-e", "midjourney", "design"],
    replies: 23,
    views: 512,
    likes: 37,
    isAnswered: true,
    createdAt: "3 days ago",
    excerpt: "I'm working on product design concepts and trying to decide between DALL-E 3 and Midjourney. Has anyone compared them for...",
  },
  {
    id: 5,
    title: "How to handle hallucinations in LLM responses?",
    author: {
      name: "David Kim",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    category: "LLM Challenges",
    tags: ["hallucinations", "accuracy", "llm"],
    replies: 19,
    views: 378,
    likes: 31,
    isAnswered: false,
    createdAt: "4 days ago",
    excerpt: "I'm building a customer service AI and need to ensure it doesn't hallucinate facts. What strategies have worked for you to reduce...",
  },
];

// Mock data for categories
const categories = [
  { name: "GPT Models", count: 124 },
  { name: "Prompt Engineering", count: 87 },
  { name: "AI Development", count: 156 },
  { name: "Image Generation", count: 93 },
  { name: "LLM Challenges", count: 72 },
  { name: "AI Ethics", count: 45 },
  { name: "Tools & Resources", count: 118 },
];

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredPosts = forumPosts.filter(post => {
    if (searchQuery) {
      return post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
             post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return true;
  });

  return (
    <SiteLayout>
      <div className="container max-w-screen-xl mx-auto py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Community Forum</h1>
            <p className="text-muted-foreground">
              Join the conversation, ask questions, and share your knowledge with the How-to-AI community.
            </p>
          </div>
          <Button variant="green" className="flex items-center gap-2 shadow-green">
            <Plus className="h-4 w-4" />
            <span>New Discussion</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline-green" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>
            
            <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All Discussions</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <Link href={`/community/post/${post.id}`} className="block">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <CardTitle className="text-xl hover:text-primary transition-colors">
                              {post.title}
                            </CardTitle>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary">{post.category}</Badge>
                              {post.tags.map((tag) => (
                                <Badge key={tag} variant="outline">{tag}</Badge>
                              ))}
                            </div>
                          </div>
                          {post.isAnswered && (
                            <Badge className="bg-green-500 hover:bg-green-600">Answered</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      </CardContent>
                    </Link>
                    <CardFooter className="flex items-center justify-between pt-0">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <img src={post.author.avatar} alt={post.author.name} />
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{post.author.name}</span>
                        <span className="text-xs text-muted-foreground">• {post.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.replies}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No discussions found</h3>
                  <p className="text-muted-foreground mb-4">
                    We couldn't find any discussions matching your search.
                  </p>
                  <Button variant="green" onClick={() => setSearchQuery("")} className="shadow-green">Clear Search</Button>
                </div>
              )}
              
              {filteredPosts.length > 0 && (
                <div className="flex justify-center mt-8">
                  <Button variant="outline-green">Load More</Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <Link 
                      href={`/community?category=${encodeURIComponent(category.name)}`}
                      className="text-sm hover:text-green transition-colors"
                    >
                      {category.name}
                    </Link>
                    <Badge variant="green">{category.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Sparkles className="h-5 w-5 text-green flex-shrink-0" />
                  <div>
                    <p className="font-medium">Be respectful</p>
                    <p className="text-sm text-muted-foreground">Treat others with respect and kindness.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Sparkles className="h-5 w-5 text-green flex-shrink-0" />
                  <div>
                    <p className="font-medium">Stay on topic</p>
                    <p className="text-sm text-muted-foreground">Keep discussions relevant to AI and related topics.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Sparkles className="h-5 w-5 text-green flex-shrink-0" />
                  <div>
                    <p className="font-medium">Share knowledge</p>
                    <p className="text-sm text-muted-foreground">Help others by sharing your expertise and experiences.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Sparkles className="h-5 w-5 text-green flex-shrink-0" />
                  <div>
                    <p className="font-medium">No spam</p>
                    <p className="text-sm text-muted-foreground">Avoid posting promotional content or spam.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline-green" className="w-full">
                  View Full Guidelines
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
} 