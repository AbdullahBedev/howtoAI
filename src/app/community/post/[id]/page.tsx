"use client";

import { useState } from "react";
import { SiteLayout } from "@/components/layout/site-layout";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, MessageSquare, Flag, Share2, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

// Mock post data
const post = {
  id: 1,
  title: "How to fine-tune GPT-3 for specific tasks?",
  author: {
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    joinDate: "Member since Jan 2023",
  },
  category: "GPT Models",
  tags: ["fine-tuning", "gpt-3", "openai"],
  content: `
    <p>I'm trying to fine-tune GPT-3 for my specific use case but I'm running into some issues with the training data format.</p>
    
    <p>My goal is to create a model that can better understand and respond to queries about our company's products. I've prepared a dataset of about 500 examples, but when I try to run the fine-tuning process, I keep getting errors about the format.</p>
    
    <p>Here's what my training data looks like:</p>
    
    <pre>
    {
      "prompt": "What are the dimensions of ProductX?",
      "completion": "ProductX measures 10cm x 15cm x 5cm and weighs 250g."
    }
    </pre>
    
    <p>Has anyone successfully fine-tuned GPT-3 for a similar use case? Any tips on preparing the training data or best practices for fine-tuning would be greatly appreciated!</p>
    
    <p>Also, I'm curious about how much fine-tuning actually improves the performance compared to just using good prompts with the base model. If anyone has experience with this, I'd love to hear about your results.</p>
  `,
  createdAt: "2 days ago",
  views: 342,
  likes: 28,
  isAnswered: true,
};

// Mock replies data
const replies = [
  {
    id: 1,
    author: {
      name: "Emily Chen",
      avatar: "https://i.pravatar.cc/150?img=5",
      joinDate: "Member since Mar 2022",
    },
    content: `
      <p>I've done quite a bit of fine-tuning with GPT-3 for similar use cases. The format of your training data looks correct, but there are a few things to check:</p>
      
      <ol>
        <li>Make sure your JSON is properly formatted with no trailing commas</li>
        <li>Each example should be on a single line in your JSONL file</li>
        <li>Check that your completions end with a stop sequence (like "\n\n" or some other delimiter)</li>
      </ol>
      
      <p>As for performance improvements, in my experience, fine-tuning can significantly improve results for domain-specific tasks. We saw about a 25% improvement in accuracy for product-related queries after fine-tuning, compared to using the base model with carefully crafted prompts.</p>
      
      <p>Hope this helps!</p>
    `,
    createdAt: "1 day ago",
    likes: 15,
    isAccepted: true,
  },
  {
    id: 2,
    author: {
      name: "Michael Roberts",
      avatar: "https://i.pravatar.cc/150?img=8",
      joinDate: "Member since Nov 2022",
    },
    content: `
      <p>One thing to add to Emily's excellent response - make sure you have enough examples. While 500 might seem like a lot, OpenAI recommends at least 100 examples per class/category you're trying to teach.</p>
      
      <p>Also, diversity in your examples is crucial. Make sure you're covering all the different types of questions and variations that users might ask about your products.</p>
      
      <p>For the technical side, I found this guide really helpful: <a href="#" class="text-primary hover:underline">https://docs.openai.com/guides/fine-tuning</a></p>
    `,
    createdAt: "1 day ago",
    likes: 8,
    isAccepted: false,
  },
  {
    id: 3,
    author: {
      name: "Sarah Williams",
      avatar: "https://i.pravatar.cc/150?img=9",
      joinDate: "Member since Feb 2023",
    },
    content: `
      <p>I've been experimenting with fine-tuning vs. using the base model with good prompts, and I've found that it really depends on your specific use case.</p>
      
      <p>For highly specialized domains with specific terminology, fine-tuning tends to work better. But for more general use cases, a well-crafted prompt with the base model can sometimes perform just as well.</p>
      
      <p>One approach I've found effective is to start with prompt engineering, identify the areas where the model consistently struggles, and then focus your fine-tuning data on those specific areas.</p>
    `,
    createdAt: "12 hours ago",
    likes: 5,
    isAccepted: false,
  },
];

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const { isAuthenticated } = useAuth();
  const [newReply, setNewReply] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmitReply = () => {
    if (!newReply.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setNewReply("");
      setIsSubmitting(false);
      alert("Your reply has been posted!");
    }, 1000);
  };

  return (
    <SiteLayout>
      <div className="container max-w-screen-xl mx-auto py-12">
        <div className="mb-8">
          <Link href="/community" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to discussions
          </Link>
          
          <h1 className="text-3xl font-bold tracking-tight mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            {/* Original post */}
            <Card>
              <CardHeader className="flex flex-row items-start gap-4 pb-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-xs text-muted-foreground">{post.author.joinDate}</div>
                </div>
                <div className="text-xs text-muted-foreground">{post.createdAt}</div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{replies.length}</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Flag className="h-4 w-4" />
                    <span>Report</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            {/* Replies */}
            <div>
              <h2 className="text-xl font-bold mb-4">{replies.length} Replies</h2>
              
              <div className="space-y-6">
                {replies.map((reply) => (
                  <Card key={reply.id} className={reply.isAccepted ? "border-green-500" : ""}>
                    <CardHeader className="flex flex-row items-start gap-4 pb-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                        <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{reply.author.name}</div>
                        <div className="text-xs text-muted-foreground">{reply.author.joinDate}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{reply.createdAt}</div>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: reply.content }} />
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{reply.likes}</span>
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        {reply.isAccepted && (
                          <Badge className="bg-green-500 hover:bg-green-600">Accepted Answer</Badge>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Reply form */}
            {isAuthenticated ? (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium">Your Reply</h3>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Write your reply here..."
                    className="min-h-[150px]"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    onClick={handleSubmitReply} 
                    disabled={isSubmitting || !newReply.trim()}
                    className="flex items-center gap-2"
                  >
                    {isSubmitting ? "Posting..." : (
                      <>
                        <Send className="h-4 w-4" />
                        Post Reply
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-6">
                  <div className="text-center">
                    <p className="mb-4">You need to be logged in to reply to this discussion.</p>
                    <div className="flex justify-center gap-4">
                      <Button variant="outline" asChild>
                        <Link href="/login">Log in</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/signup">Sign up</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">About the Author</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-lg">{post.author.name}</div>
                    <div className="text-sm text-muted-foreground">{post.author.joinDate}</div>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div>
                    <div className="text-2xl font-bold">42</div>
                    <div className="text-xs text-muted-foreground">Posts</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-xs text-muted-foreground">Replies</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Related Discussions</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                    Best practices for fine-tuning GPT-4
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">15 replies • 3 days ago</p>
                </div>
                <Separator />
                <div>
                  <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                    How to evaluate fine-tuned models effectively?
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">8 replies • 1 week ago</p>
                </div>
                <Separator />
                <div>
                  <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                    Fine-tuning vs. RAG: Which approach is better?
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">23 replies • 2 days ago</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
} 