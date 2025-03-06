import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";

interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}

// This would typically come from a CMS or database
const blogPosts: Record<string, BlogPost> = {
  "getting-started-with-ai": {
    title: "Getting Started with AI: A Beginner's Guide",
    description: "Learn the basics of AI and how to start implementing it in your projects.",
    date: "2024-03-20",
    readTime: "5 min read",
    category: "Beginners",
    content: `
      Artificial Intelligence (AI) has become an integral part of modern technology, transforming how we work, learn, and solve problems. This guide will help you understand the basics of AI and how to start implementing it in your projects.

      ## What is AI?

      AI refers to computer systems that can perform tasks that typically require human intelligence. These tasks include:
      
      - Pattern recognition
      - Decision making
      - Language processing
      - Visual perception
      
      ## Getting Started with AI

      1. **Understand the Basics**
         - Learn about different types of AI
         - Familiarize yourself with key concepts
         - Study basic machine learning principles

      2. **Choose Your Focus Area**
         - Natural Language Processing (NLP)
         - Computer Vision
         - Predictive Analytics
         - Automation

      3. **Start with Simple Projects**
         - Text classification
         - Image recognition
         - Basic chatbots
         - Data analysis

      ## Tools and Resources

      Here are some essential tools to get started:

      - Python programming language
      - Popular AI frameworks (TensorFlow, PyTorch)
      - Cloud AI services (Google Cloud AI, AWS AI)
      - Educational resources and tutorials

      ## Next Steps

      Now that you understand the basics, you can:

      1. Take online courses
      2. Join AI communities
      3. Practice with real projects
      4. Stay updated with AI news
    `
  },
  // Add more blog posts here
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = blogPosts[params.id];
  if (!post) return { title: "Blog Post Not Found" };

  return {
    title: `${post.title} | How-to-AI Blog`,
    description: post.description,
  };
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts[params.id];

  if (!post) {
    return (
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
        <Link href="/blog">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link href="/blog">
        <Button variant="outline" className="gap-2 mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Button>
      </Link>

      {/* Post Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
          <span className="text-sm px-2 py-1 bg-primary/10 rounded-full">
            {post.category}
          </span>
        </div>
      </div>

      {/* Post Content */}
      <div className="prose dark:prose-invert max-w-none mb-12">
        {post.content.split('\n').map((line: string, index: number) => {
          if (line.startsWith('##')) {
            return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{line.replace('##', '').trim()}</h2>;
          }
          if (line.startsWith('-')) {
            return <li key={index} className="ml-4">{line.replace('-', '').trim()}</li>;
          }
          if (line.trim() === '') return <br key={index} />;
          return <p key={index}>{line}</p>;
        })}
      </div>

      {/* Newsletter Signup */}
      <div className="mt-12">
        <NewsletterSignup variant="card" />
      </div>
    </div>
  );
} 