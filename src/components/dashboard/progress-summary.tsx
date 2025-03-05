'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, Trophy, BookOpen, BarChart } from 'lucide-react';
import { useProgressStore } from '@/store/use-progress-store';
import { useAchievementsStore } from '@/store/use-achievements-store';
import { useStreakStore } from '@/store/use-streak-store';
import { cn } from '@/lib/utils';

interface ProgressSummaryProps {
  showAchievements?: boolean;
  maxTutorials?: number;
  maxAchievements?: number;
}

// Mock data for tutorials - in a real app, this would come from a database or API
const tutorials = {
  "write-blog-post": {
    id: "write-blog-post",
    title: "Write a Blog Post with AI",
    description: "Learn how to use ChatGPT to write engaging blog content in minutes.",
    category: "writing",
    difficulty: "beginner",
    duration: "10 min",
    tool: "ChatGPT",
  },
  "getting-started-with-chatgpt": {
    id: "getting-started-with-chatgpt",
    title: "Getting Started with ChatGPT",
    description: "Learn the basics of using ChatGPT for various tasks.",
    category: "basics",
    difficulty: "beginner",
    duration: "5 min",
    tool: "ChatGPT",
  },
  "creating-images-with-dall-e": {
    id: "creating-images-with-dall-e",
    title: "Creating Images with DALL-E",
    description: "Learn how to generate stunning images using DALL-E.",
    category: "design",
    difficulty: "intermediate",
    duration: "15 min",
    tool: "DALL-E",
  },
  "building-a-chatbot-with-gpt-4": {
    id: "building-a-chatbot-with-gpt-4",
    title: "Building a Chatbot with GPT-4",
    description: "Create your own AI chatbot using GPT-4.",
    category: "development",
    difficulty: "advanced",
    duration: "30 min",
    tool: "GPT-4",
  },
};

export function ProgressSummary({
  showAchievements = true,
  maxTutorials = 3,
  maxAchievements = 3,
}: ProgressSummaryProps) {
  const { 
    getCompletedTutorials, 
    getInProgressTutorials, 
    getTotalCompletedSteps 
  } = useProgressStore();
  
  const { getRecentAchievements, getUnlockedAchievements } = useAchievementsStore();
  const { getStreakData } = useStreakStore();
  
  const [completedTutorials, setCompletedTutorials] = useState<string[]>([]);
  const [inProgressTutorials, setInProgressTutorials] = useState<Array<{
    id: string;
    progress: number;
  }>>([]);
  const [totalSteps, setTotalSteps] = useState(0);
  const [recentAchievements, setRecentAchievements] = useState<any[]>([]);
  const [streakData, setStreakData] = useState<any>({});
  
  useEffect(() => {
    const completed = getCompletedTutorials();
    const inProgress = getInProgressTutorials();
    
    setCompletedTutorials(completed.map(p => p.tutorialId));
    setInProgressTutorials(
      inProgress.map(p => ({
        id: p.tutorialId,
        progress: Math.round((p.completedSteps.length / p.totalSteps) * 100)
      }))
    );
    setTotalSteps(getTotalCompletedSteps());
    
    if (showAchievements) {
      setRecentAchievements(getRecentAchievements(maxAchievements));
      setStreakData(getStreakData());
    }
  }, [
    getCompletedTutorials, 
    getInProgressTutorials, 
    getTotalCompletedSteps, 
    getRecentAchievements, 
    getStreakData, 
    showAchievements,
    maxAchievements
  ]);
  
  const totalProgress = inProgressTutorials.length + completedTutorials.length;
  const completionPercentage = totalProgress > 0 
    ? Math.round((completedTutorials.length / totalProgress) * 100) 
    : 0;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Learning Progress</CardTitle>
            <CardDescription>
              {completedTutorials.length} completed, {inProgressTutorials.length} in progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Overall Completion</span>
                  <span className="text-sm text-muted-foreground">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 py-2">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <span className="text-2xl font-bold">{completedTutorials.length}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Steps Completed</span>
                  <span className="text-2xl font-bold">{totalSteps}</span>
                </div>
              </div>
              
              {inProgressTutorials.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">In Progress</h4>
                  {inProgressTutorials.slice(0, maxTutorials).map((tutorial, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium truncate">Tutorial {tutorial.id}</p>
                          <span className="text-xs text-muted-foreground">{tutorial.progress}%</span>
                        </div>
                        <Progress value={tutorial.progress} className="h-1.5" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/tutorials">
                <BookOpen className="h-4 w-4 mr-2" />
                View All Tutorials
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        {showAchievements && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Achievements & Streaks</CardTitle>
              <CardDescription>
                {getUnlockedAchievements().length} achievements unlocked
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-amber-500/10">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium">Current Streak</p>
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-bold">{streakData.currentStreak || 0}</span>
                      <span className="text-sm text-muted-foreground">days</span>
                    </div>
                  </div>
                </div>
                
                {recentAchievements.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Recent Achievements</h4>
                    {recentAchievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg">{achievement.icon}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{achievement.title}</p>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-4 text-center text-muted-foreground">
                    <Trophy className="h-8 w-8 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">Complete tutorials to earn achievements</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/dashboard?tab=progress">
                  <BarChart className="h-4 w-4 mr-2" />
                  View All Stats
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
} 