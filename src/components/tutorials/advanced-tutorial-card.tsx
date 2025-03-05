'use client';

import { useState } from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Clock, Star, Sparkles, Brain, Bot, ChartLine, Lock } from "lucide-react";

interface AdvancedTutorialCardProps {
  tutorial: {
    id: string;
    title: string;
    description: string;
    duration: string;
    rating: number;
    tool: string;
    category: string;
    difficulty: string;
    requirements?: string[];
    outcomes?: string[];
    isPremium?: boolean;
  };
}

const categoryIcons = {
  'video-creation': Brain,
  'image-generation': Sparkles,
  'agent-deployment': Bot,
  'trading-bots': ChartLine,
};

export function AdvancedTutorialCard({ tutorial }: AdvancedTutorialCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = categoryIcons[tutorial.category as keyof typeof categoryIcons] || BookOpen;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5 h-full flex flex-col">
        <div className="relative h-40 bg-primary/10 flex items-center justify-center overflow-hidden">
          <motion.div
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <IconComponent className="h-14 w-14 text-primary" />
          </motion.div>
          <Badge 
            className="absolute top-4 right-4 bg-primary/20 text-primary hover:bg-primary/30"
            variant="secondary"
          >
            Advanced
          </Badge>
          
          {tutorial.isPremium && (
            <div className="absolute top-4 left-4 flex items-center gap-1 px-2 py-1 bg-[#ffb347]/10 text-[#ffb347] rounded-full text-xs font-medium">
              <Lock className="h-3 w-3" />
              <span>Premium</span>
            </div>
          )}
        </div>
        <CardHeader className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                {tutorial.title}
              </CardTitle>
              <CardDescription className="mt-2">
                {tutorial.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{tutorial.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{tutorial.rating}</span>
              </div>
              <div className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                {tutorial.tool.split(',')[0]}
              </div>
            </div>
            
            {tutorial.requirements && tutorial.requirements.length > 0 && (
              <div className="text-sm">
                <p className="font-medium mb-1">Requirements:</p>
                <ul className="list-disc list-inside text-muted-foreground">
                  {tutorial.requirements.slice(0, 2).map((req, index) => (
                    <li key={index} className="truncate">{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Link href={`/tutorials/${tutorial.id}`} className="w-full">
            {tutorial.isPremium ? (
              <Button 
                className="w-full gap-2 bg-gradient-to-r from-[#ffb347] to-[#ffcc33] hover:from-[#ffb347]/90 hover:to-[#ffcc33]/90 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Lock className="h-4 w-4 mr-1" />
                <span>Unlock Advanced Tutorial</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Button>
            ) : (
              <Button 
                className="w-full gap-2 bg-gradient-to-r from-primary to-primary/70 hover:from-primary/90 hover:to-primary/60"
              >
                Start Advanced Tutorial <ArrowRight className="h-4 w-4 ml-auto" />
              </Button>
            )}
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 