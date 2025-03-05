'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAchievementsStore, type Achievement } from '@/store/use-achievements-store';
import { cn } from '@/lib/utils';

interface AchievementCardProps {
  achievement: Achievement;
  isLocked?: boolean;
}

function AchievementCard({ achievement, isLocked = false }: AchievementCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden transition-all",
      isLocked ? "opacity-60 grayscale" : "hover:shadow-md"
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">{achievement.icon}</span>
              <span>{achievement.title}</span>
            </CardTitle>
            <CardDescription className="mt-1">{achievement.description}</CardDescription>
          </div>
          <Badge variant={isLocked ? "outline" : "default"}>
            {isLocked ? "Locked" : "Unlocked"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {!isLocked && achievement.unlockedAt && (
          <p className="text-xs text-muted-foreground">
            Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function AchievementDisplay() {
  const { 
    getUnlockedAchievements, 
    getLockedAchievements,
    getRecentAchievements 
  } = useAchievementsStore();
  
  const [showAll, setShowAll] = useState(false);
  
  const unlockedAchievements = getUnlockedAchievements();
  const lockedAchievements = getLockedAchievements();
  const recentAchievements = getRecentAchievements(3);
  
  const hasAchievements = unlockedAchievements.length > 0;
  
  if (!hasAchievements && lockedAchievements.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Your Achievements</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {unlockedAchievements.length} of {unlockedAchievements.length + lockedAchievements.length} unlocked
          </span>
        </div>
      </div>
      
      <Tabs defaultValue={hasAchievements ? "unlocked" : "locked"} className="w-full">
        <TabsList>
          <TabsTrigger value="recent" disabled={!hasAchievements}>
            Recent
          </TabsTrigger>
          <TabsTrigger value="unlocked" disabled={!hasAchievements}>
            Unlocked ({unlockedAchievements.length})
          </TabsTrigger>
          <TabsTrigger value="locked">
            Locked ({lockedAchievements.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="mt-6">
          {recentAchievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentAchievements.map((achievement) => (
                <AchievementCard 
                  key={achievement.id} 
                  achievement={achievement} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No achievements unlocked yet.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="unlocked" className="mt-6">
          {unlockedAchievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unlockedAchievements
                .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
                .map((achievement) => (
                  <AchievementCard 
                    key={achievement.id} 
                    achievement={achievement} 
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No achievements unlocked yet.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="locked" className="mt-6">
          {lockedAchievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(showAll ? lockedAchievements : lockedAchievements.slice(0, 6))
                .map((achievement) => (
                  <AchievementCard 
                    key={achievement.id} 
                    achievement={achievement} 
                    isLocked 
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You've unlocked all achievements!</p>
            </div>
          )}
          
          {lockedAchievements.length > 6 && (
            <div className="mt-6 text-center">
              <Button 
                variant="outline" 
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : `Show All (${lockedAchievements.length})`}
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 