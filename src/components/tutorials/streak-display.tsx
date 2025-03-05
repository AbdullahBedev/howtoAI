'use client';

import { useEffect, useState } from 'react';
import { useStreakStore } from '@/store/use-streak-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Flame, Trophy, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StreakDisplay() {
  const { getStreakData } = useStreakStore();
  const [streakData, setStreakData] = useState(getStreakData());
  
  // Update streak data when component mounts
  useEffect(() => {
    setStreakData(getStreakData());
    
    // Update every minute to refresh the days until streak lost
    const interval = setInterval(() => {
      setStreakData(getStreakData());
    }, 60000);
    
    return () => clearInterval(interval);
  }, [getStreakData]);
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Learning Streak
        </CardTitle>
        <CardDescription>
          Keep learning daily to maintain your streak!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
            <div className="text-3xl font-bold mb-1">{streakData.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
            <div className="text-3xl font-bold mb-1">{streakData.longestStreak}</div>
            <div className="text-sm text-muted-foreground">Longest Streak</div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
            <div className="text-3xl font-bold mb-1">
              {streakData.daysUntilStreakLost > 0 ? streakData.daysUntilStreakLost : 0}
            </div>
            <div className="text-sm text-muted-foreground">
              {streakData.daysUntilStreakLost > 0 
                ? "Days Until Streak Lost" 
                : "Streak Needs Activity"}
            </div>
          </div>
        </div>
        
        {streakData.currentStreak > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Streak Progress</span>
              <span className="text-muted-foreground">
                {streakData.currentStreak} {streakData.currentStreak === 1 ? 'day' : 'days'}
              </span>
            </div>
            <div className="relative">
              <Progress 
                value={Math.min((streakData.currentStreak / 7) * 100, 100)} 
                className="h-2" 
              />
              {[1, 3, 5, 7].map((milestone) => (
                <div 
                  key={milestone}
                  className={cn(
                    "absolute top-0 w-4 h-4 rounded-full -mt-1 border-2 border-background",
                    streakData.currentStreak >= milestone 
                      ? "bg-primary" 
                      : "bg-muted"
                  )}
                  style={{ 
                    left: `calc(${Math.min((milestone / 7) * 100, 100)}% - 8px)` 
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1 day</span>
              <span>3 days</span>
              <span>5 days</span>
              <span>7 days</span>
            </div>
          </div>
        )}
        
        <div className="mt-4 text-sm text-muted-foreground">
          {streakData.streakStartDate ? (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Streak started on {formatDate(streakData.streakStartDate)}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Start your streak by completing a tutorial!</span>
            </div>
          )}
        </div>
        
        {streakData.currentStreak >= 7 && (
          <div className="mt-4 p-3 bg-primary/10 rounded-lg flex items-center gap-3">
            <Trophy className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Weekly Streak Achievement!</p>
              <p className="text-sm text-muted-foreground">
                You've maintained your streak for 7 days or more. Keep it up!
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 