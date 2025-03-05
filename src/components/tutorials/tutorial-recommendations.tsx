'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/store/use-progress-store';

// Tutorial type definition
interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  rating: number;
  image: string;
  tool: string;
}

interface TutorialRecommendationsProps {
  allTutorials: Tutorial[];
  currentTutorialId?: string;
  maxRecommendations?: number;
}

export function TutorialRecommendations({
  allTutorials,
  currentTutorialId,
  maxRecommendations = 3
}: TutorialRecommendationsProps) {
  const { getCompletedTutorials, getInProgressTutorials } = useProgressStore();
  const [recommendations, setRecommendations] = useState<Tutorial[]>([]);

  useEffect(() => {
    // Get user's progress data
    const completedTutorials = getCompletedTutorials();
    const inProgressTutorials = getInProgressTutorials();
    
    // Combine completed and in-progress tutorial IDs
    const userTutorialIds = [
      ...completedTutorials.map(p => p.tutorialId),
      ...inProgressTutorials.map(p => p.tutorialId)
    ];
    
    // Filter out the current tutorial and already completed/in-progress tutorials
    const availableTutorials = allTutorials.filter(tutorial => 
      tutorial.id !== currentTutorialId && 
      !userTutorialIds.includes(tutorial.id)
    );
    
    // If user has completed tutorials, recommend based on categories they've engaged with
    if (userTutorialIds.length > 0) {
      // Get categories the user has engaged with
      const userCategories = new Set(
        allTutorials
          .filter(t => userTutorialIds.includes(t.id))
          .map(t => t.category)
      );
      
      // Prioritize tutorials in categories the user has engaged with
      const categorizedTutorials = availableTutorials
        .filter(t => userCategories.has(t.category))
        .sort((a, b) => b.rating - a.rating);
      
      // Fill remaining slots with other tutorials
      const otherTutorials = availableTutorials
        .filter(t => !userCategories.has(t.category))
        .sort((a, b) => b.rating - a.rating);
      
      setRecommendations([
        ...categorizedTutorials,
        ...otherTutorials
      ].slice(0, maxRecommendations));
    } else {
      // If no history, recommend highest rated beginner tutorials
      const beginnerTutorials = availableTutorials
        .filter(t => t.difficulty === 'beginner')
        .sort((a, b) => b.rating - a.rating);
      
      const otherTutorials = availableTutorials
        .filter(t => t.difficulty !== 'beginner')
        .sort((a, b) => b.rating - a.rating);
      
      setRecommendations([
        ...beginnerTutorials,
        ...otherTutorials
      ].slice(0, maxRecommendations));
    }
  }, [allTutorials, currentTutorialId, getCompletedTutorials, getInProgressTutorials, maxRecommendations]);

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Recommended Tutorials</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((tutorial) => (
          <Card key={tutorial.id} className="overflow-hidden">
            <div className="h-40 bg-muted flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-muted-foreground" />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{tutorial.title}</CardTitle>
              <CardDescription className="line-clamp-2">{tutorial.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
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
                  {tutorial.tool}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link href={`/tutorials/${tutorial.id}`} className="w-full">
                <Button variant="outline" className="w-full gap-2">
                  View Tutorial <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 