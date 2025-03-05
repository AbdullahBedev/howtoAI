'use client';

import { useState } from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Lock, Briefcase, Stethoscope, Scale, TrendingUp, ShoppingCart, Megaphone } from "lucide-react";
import type { Track, Tutorial } from '@/types/tracks';

interface IndustryTrackCardProps {
  track: Track;
}

export function IndustryTrackCard({ track }: IndustryTrackCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Map icon string to component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'stethoscope':
        return <Stethoscope className="h-6 w-6" />;
      case 'scale':
        return <Scale className="h-6 w-6" />;
      case 'trending-up':
        return <TrendingUp className="h-6 w-6" />;
      case 'shopping-cart':
        return <ShoppingCart className="h-6 w-6" />;
      case 'megaphone':
        return <Megaphone className="h-6 w-6" />;
      default:
        return <Briefcase className="h-6 w-6" />;
    }
  };

  // Count premium tutorials
  const premiumCount = track.tutorials.filter((t: Tutorial) => t.isPremium).length;
  const freeCount = track.tutorials.length - premiumCount;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden h-full flex flex-col border-muted">
        <div className={`relative h-24 bg-gradient-to-r ${track.color} flex items-center justify-center overflow-hidden`}>
          <motion.div
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0
            }}
            transition={{ duration: 0.3 }}
            className="text-white"
          >
            {getIcon(track.icon)}
          </motion.div>
        </div>
        
        <CardHeader className="flex-grow">
          <CardTitle className="text-xl">{track.title}</CardTitle>
          <CardDescription className="mt-2">{track.description}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Available tutorials:</span>
              <span className="font-medium">{track.tutorials.length}</span>
            </div>
            
            <div className="flex gap-3">
              <div className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>{freeCount} Free</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Lock className="h-2 w-2 text-[#ffcc33]" />
                <span>{premiumCount} Premium</span>
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              {track.tutorials.map((tutorial: Tutorial) => (
                <div key={tutorial.id} className="flex items-center justify-between text-sm">
                  <span className="truncate">{tutorial.title}</span>
                  {tutorial.isPremium && <Lock className="h-3 w-3 text-[#ffcc33] flex-shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Link href={`/tutorials/industry/${track.id}`} className="w-full">
            <Button className={`w-full gap-2 bg-gradient-to-r ${track.color} hover:opacity-90`}>
              Explore Track <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 