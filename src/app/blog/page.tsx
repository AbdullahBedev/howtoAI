import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | How-to-AI",
  description: "Latest insights, tutorials, and news about AI education and implementation.",
};

// Initial blog posts
const blogPosts = [
  {
    id: "getting-started-with-ai",
    title: "Getting Started with AI: A Beginner's Guide",
    description: "Learn the basics of AI and how to start implementing it in your projects.",
    date: "2024-03-20",
    readTime: "5 min read",
    category: "Beginners"
  },
  {
    id: "prompt-engineering-tips",
    title: "10 Essential Prompt Engineering Tips",
    description: "Master the art of crafting effective prompts for better AI results.",
    date: "2024-03-18",
    readTime: "7 min read",
    category: "Prompt Engineering"
  },
  {
    id: "ai-in-healthcare",
    title: "AI in Healthcare: Current Applications",
    description: "Explore how AI is transforming the healthcare industry.",
    date: "2024-03-15",
    readTime: "6 min read",
    category: "Industry"
  },
  {
    id: "future-of-ai-agents",
    title: "The Future of AI Agents",
    description: "Understanding the potential and limitations of AI agents.",
    date: "2024-03-12",
    readTime: "8 min read",
    category: "AI Agents"
  },
  {
    id: "ai-tools-comparison",
    title: "Comparing Popular AI Tools in 2024",
    description: "A comprehensive comparison of leading AI tools and platforms.",
    date: "2024-03-10",
    readTime: "10 min read",
    category: "Tools"
  }
];

export default function BlogPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-bold mb-4">AI Education Blog</h1>
        <p className="text-muted-foreground text-lg">
          Discover the latest insights, tutorials, and news about AI education and implementation.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {blogPosts.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id}>
            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="text-xs">{post.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{post.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-2 text-primary">
                  Read More <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 