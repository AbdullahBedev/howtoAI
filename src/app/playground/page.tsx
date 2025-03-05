"use client";

import { useState } from "react";
import { SiteLayout } from "@/components/layout/site-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Image as ImageIcon, MessageSquare, Code, Wand2 } from "lucide-react";

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState("text");
  const [prompt, setPrompt] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [codePrompt, setCodePrompt] = useState("");
  const [result, setResult] = useState("");
  const [imageResult, setImageResult] = useState("");
  const [codeResult, setCodeResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isCodeLoading, setIsCodeLoading] = useState(false);
  
  // Mock function to simulate AI text generation
  const generateText = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResult(`This is a simulated response to: "${prompt}"\n\nAI models can generate human-like text based on the input they receive. This response is just a placeholder, but in a real implementation, this would connect to an AI API like OpenAI's GPT models to generate a meaningful response to your prompt.`);
      setIsLoading(false);
    }, 1500);
  };
  
  // Mock function to simulate AI image generation
  const generateImage = async () => {
    if (!imagePrompt.trim()) return;
    
    setIsImageLoading(true);
    // Simulate API call
    setTimeout(() => {
      // In a real implementation, this would be the URL to the generated image
      setImageResult("https://placehold.co/600x400/667/fff?text=AI+Generated+Image");
      setIsImageLoading(false);
    }, 2000);
  };
  
  // Mock function to simulate AI code generation
  const generateCode = async () => {
    if (!codePrompt.trim()) return;
    
    setIsCodeLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCodeResult(`// Generated code based on: "${codePrompt}"
function calculateFactorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * calculateFactorial(n - 1);
}

// Example usage
const number = 5;
const result = calculateFactorial(number);
console.log(\`The factorial of \${number} is \${result}\`);`);
      setIsCodeLoading(false);
    }, 1800);
  };

  return (
    <SiteLayout>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">AI Playground</h1>
          <p className="text-muted-foreground">
            Experiment with different AI capabilities in our interactive playground. Try generating text, images, or code.
          </p>
        </div>
        
        <Tabs defaultValue="text" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Text Generation</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span>Image Generation</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>Code Generation</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Text Generation</CardTitle>
                <CardDescription>
                  Generate human-like text responses using AI models.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Select defaultValue="gpt-4">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                      <SelectItem value="claude">Claude</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="temperature">Temperature</Label>
                    <span className="text-sm text-muted-foreground">0.7</span>
                  </div>
                  <Slider defaultValue={[0.7]} max={1} step={0.1} />
                  <p className="text-xs text-muted-foreground">
                    Higher values produce more creative results, lower values are more deterministic.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="prompt">Your prompt</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Enter your prompt here..."
                    className="min-h-[100px]"
                    value={prompt}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
                  />
                </div>
                
                <Button 
                  onClick={generateText} 
                  disabled={isLoading || !prompt.trim()} 
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Text
                    </>
                  )}
                </Button>
                
                {result && (
                  <div className="mt-4 p-4 rounded-md bg-muted">
                    <p className="whitespace-pre-wrap">{result}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="image" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Image Generation</CardTitle>
                <CardDescription>
                  Create images from text descriptions using AI.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Select defaultValue="dall-e-3">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dall-e-3">DALL-E 3</SelectItem>
                      <SelectItem value="dall-e-2">DALL-E 2</SelectItem>
                      <SelectItem value="midjourney">Midjourney</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="size">Image Size</Label>
                  <Select defaultValue="1024x1024">
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1024x1024">1024x1024</SelectItem>
                      <SelectItem value="512x512">512x512</SelectItem>
                      <SelectItem value="256x256">256x256</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="imagePrompt">Image description</Label>
                  <Textarea
                    id="imagePrompt"
                    placeholder="Describe the image you want to generate..."
                    className="min-h-[100px]"
                    value={imagePrompt}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setImagePrompt(e.target.value)}
                  />
                </div>
                
                <Button 
                  onClick={generateImage} 
                  disabled={isImageLoading || !imagePrompt.trim()} 
                  className="w-full"
                >
                  {isImageLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Generate Image
                    </>
                  )}
                </Button>
                
                {imageResult && (
                  <div className="mt-4 flex justify-center">
                    <img 
                      src={imageResult} 
                      alt="AI generated image" 
                      className="rounded-md max-w-full h-auto"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="code" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Code Generation</CardTitle>
                <CardDescription>
                  Generate code snippets and solutions using AI.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="javascript">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="csharp">C#</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="comments" className="text-sm">Include comments</Label>
                    <Switch id="comments" defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="codePrompt">Code description</Label>
                  <Textarea
                    id="codePrompt"
                    placeholder="Describe the code you want to generate..."
                    className="min-h-[100px]"
                    value={codePrompt}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCodePrompt(e.target.value)}
                  />
                </div>
                
                <Button 
                  onClick={generateCode} 
                  disabled={isCodeLoading || !codePrompt.trim()} 
                  className="w-full"
                >
                  {isCodeLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Code className="mr-2 h-4 w-4" />
                      Generate Code
                    </>
                  )}
                </Button>
                
                {codeResult && (
                  <div className="mt-4 p-4 rounded-md bg-muted font-mono text-sm overflow-x-auto">
                    <pre>{codeResult}</pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SiteLayout>
  );
} 