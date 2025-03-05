'use client';

import { useState } from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Clock, Star, Lock } from "lucide-react";

interface TutorialCardProps {
  tutorial: {
    id: string;
    title: string;
    description: string;
    duration: string;
    rating: number;
    tool: string;
    category: string;
    difficulty: string;
    isPremium: boolean;
  };
}

export function TutorialCard({ tutorial }: TutorialCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className={`overflow-hidden border ${tutorial.isPremium ? 'border-[#ffb347]/30' : 'border-muted'} h-full flex flex-col`}>
        <div className="relative h-48 bg-muted flex items-center justify-center overflow-hidden">
          <motion.div
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 2 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <BookOpen className={`h-12 w-12 ${tutorial.isPremium ? 'text-[#ffcc33]' : 'text-muted-foreground'}`} />
          </motion.div>
          
          {tutorial.isPremium && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-[#ffb347]/10 text-[#ffb347] rounded-full text-xs font-medium">
              <Lock className="h-3 w-3" />
              <span>Premium</span>
            </div>
          )}
          
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-muted-foreground/10 text-muted-foreground rounded-full text-xs">
            {tutorial.difficulty}
          </div>
        </div>
        
        <CardHeader className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className={tutorial.isPremium ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#ffb347] to-[#ffcc33]' : ''}>
                {tutorial.title}
              </CardTitle>
              <CardDescription className="mt-2">
                {tutorial.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
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
        </CardContent>
        
        <CardFooter>
          <Link href={`/tutorials/${tutorial.id}`} className="w-full">
            {tutorial.isPremium ? (
              <Button 
                variant="default" 
                className="w-full gap-2 bg-gradient-to-r from-[#ffb347] to-[#ffcc33] hover:from-[#ffb347]/90 hover:to-[#ffcc33]/90 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Lock className="h-4 w-4 mr-1" />
                <span>Unlock Premium Tutorial</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Button>
            ) : (
              <Button 
                variant="green" 
                className="w-full gap-2 shadow-green"
              >
                Start Tutorial <ArrowRight className="h-4 w-4 ml-auto" />
              </Button>
            )}
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 