"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Copy, Sparkles } from "lucide-react";

interface InteractiveExampleProps {
  title: string;
  description: string;
  examples: {
    name: string;
    prompt: string;
    response: string;
  }[];
}

export function InteractiveExample({ title, description, examples }: InteractiveExampleProps) {
  const [customPrompt, setCustomPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!customPrompt.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call to AI model
    setTimeout(() => {
      // In a real implementation, this would call an actual AI API
      setResponse(`This is a simulated response to your prompt: "${customPrompt}"\n\nIn a production environment, this would connect to an actual AI model API like OpenAI or Anthropic to generate a real response based on your input.`);
      setIsLoading(false);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="examples" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="examples">Example Prompts</TabsTrigger>
              <TabsTrigger value="try">Try It Yourself</TabsTrigger>
            </TabsList>
            
            <TabsContent value="examples" className="space-y-4 mt-4">
              <Tabs defaultValue={examples[0]?.name || "example1"}>
                <TabsList className="w-full flex flex-wrap">
                  {examples.map((example, index) => (
                    <TabsTrigger key={index} value={example.name} className="flex-grow">
                      Example {index + 1}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {examples.map((example, index) => (
                  <TabsContent key={index} value={example.name} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">Prompt:</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0" 
                          onClick={() => copyToClipboard(example.prompt)}
                        >
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy prompt</span>
                        </Button>
                      </div>
                      <div className="bg-muted p-3 rounded-md text-sm font-mono whitespace-pre-wrap">
                        {example.prompt}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Response:</h4>
                      <div className="bg-primary/5 border border-primary/20 p-3 rounded-md text-sm whitespace-pre-wrap">
                        {example.response}
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
            
            <TabsContent value="try" className="space-y-4 mt-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Your Prompt:</h4>
                <Textarea 
                  placeholder="Enter your prompt here..."
                  className="min-h-[120px] font-mono text-sm"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                />
              </div>
              
              <Button 
                className="w-full gap-2" 
                onClick={handleSubmit}
                disabled={isLoading || !customPrompt.trim()}
              >
                {isLoading ? 'Generating...' : 'Generate Response'} 
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              {response && (
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium">Response:</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0" 
                      onClick={() => copyToClipboard(response)}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy response</span>
                    </Button>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 p-3 rounded-md text-sm whitespace-pre-wrap">
                    {response}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 