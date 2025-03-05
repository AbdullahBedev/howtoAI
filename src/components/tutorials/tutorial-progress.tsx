'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useProgressStore, type TutorialProgress as ProgressType } from '@/store/use-progress-store';
import { useAchievementsStore } from '@/store/use-achievements-store';
import { useStreakStore } from '@/store/use-streak-store';
import { cn } from '@/lib/utils';

interface TutorialProgressProps {
  tutorialId: string;
  steps: {
    title: string;
    description?: string;
  }[];
  currentStep?: number;
  onStepChange?: (stepIndex: number) => void;
}

export function TutorialProgress({
  tutorialId,
  steps,
  currentStep = 0,
  onStepChange,
}: TutorialProgressProps) {
  const { 
    addProgress, 
    updateProgress, 
    markTutorialComplete, 
    getProgress,
    getCompletedTutorials
  } = useProgressStore();
  
  const { unlockAchievement } = useAchievementsStore();
  const { recordActivity } = useStreakStore();
  
  const [progress, setProgress] = useState<ProgressType | undefined>();
  const [progressPercentage, setProgressPercentage] = useState(0);

  // Initialize progress tracking for this tutorial
  useEffect(() => {
    if (tutorialId && steps.length > 0) {
      addProgress(tutorialId, steps.length);
      setProgress(getProgress(tutorialId));
    }
  }, [tutorialId, steps.length, addProgress, getProgress]);

  // Update progress state when it changes in the store
  useEffect(() => {
    const currentProgress = getProgress(tutorialId);
    setProgress(currentProgress);
    
    if (currentProgress) {
      const percentage = Math.round(
        (currentProgress.completedSteps.length / currentProgress.totalSteps) * 100
      );
      setProgressPercentage(percentage);
    }
  }, [tutorialId, getProgress]);

  const handleStepClick = (stepIndex: number) => {
    if (onStepChange) {
      onStepChange(stepIndex);
    }
  };

  const handleToggleStep = (stepIndex: number, completed: boolean) => {
    updateProgress(tutorialId, stepIndex, completed);
    
    // Record activity for streak tracking
    if (completed) {
      recordActivity();
    }
    
    // Check if all steps are completed after this update
    const updatedProgress = getProgress(tutorialId);
    if (updatedProgress && updatedProgress.completedSteps.length === updatedProgress.totalSteps) {
      // This tutorial is now complete, check for achievements
      checkForAchievements();
    }
  };

  const handleCompleteAll = () => {
    markTutorialComplete(tutorialId);
    
    // Record activity for streak tracking
    recordActivity();
    
    // Check for achievements
    checkForAchievements();
  };
  
  const checkForAchievements = () => {
    // Get the total number of completed tutorials after this one
    const completedTutorials = getCompletedTutorials();
    const totalCompleted = completedTutorials.length;
    
    // Unlock achievements based on completion count
    if (totalCompleted === 1) {
      unlockAchievement('first-tutorial');
    } else if (totalCompleted >= 3) {
      unlockAchievement('three-tutorials');
    } else if (totalCompleted >= 5) {
      unlockAchievement('five-tutorials');
    } else if (totalCompleted >= 10) {
      unlockAchievement('ten-tutorials');
    }
    
    // Check for category-specific achievements
    if (steps.length > 0 && progress) {
      // Get tutorial data from API or context to determine category
      // For now, we'll use a simplified approach
      
      // Group completed tutorials by tutorialId to check categories later
      const completedTutorialIds = completedTutorials.map(t => t.tutorialId);
      
      // These would typically come from an API or context
      const tutorialCategories = {
        'prompt-engineering-basics': 'prompt-engineering',
        'advanced-prompting': 'prompt-engineering',
        'prompt-patterns': 'prompt-engineering',
        'ui-design-principles': 'design',
        'color-theory': 'design',
        'responsive-design': 'design',
      };
      
      // Count tutorials by category
      const categoryCounts: Record<string, number> = {};
      
      completedTutorialIds.forEach(id => {
        const category = tutorialCategories[id as keyof typeof tutorialCategories];
        if (category) {
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        }
      });
      
      // Check for category mastery achievements
      if (categoryCounts['prompt-engineering'] >= 3) {
        unlockAchievement('prompt-master');
      }
      
      if (categoryCounts['design'] >= 3) {
        unlockAchievement('design-guru');
      }
    }
    
    // Check for streak achievements
    const { getStreakData } = useStreakStore.getState();
    const { currentStreak } = getStreakData();
    
    if (currentStreak >= 3) {
      unlockAchievement('three-day-streak');
    }
    
    if (currentStreak >= 7) {
      unlockAchievement('seven-day-streak');
    }
    
    if (currentStreak >= 30) {
      unlockAchievement('thirty-day-streak');
    }
    
    // Display achievement notification
    // This would be a good place to add a toast notification
    // for newly unlocked achievements
  };

  if (!progress) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Your Progress</h3>
        <span className="text-sm text-muted-foreground">
          {progress.completedSteps.length} of {steps.length} steps completed
        </span>
      </div>
      
      <Progress value={progressPercentage} className="h-2" />
      
      <div className="space-y-2 mt-4">
        {steps.map((step, index) => {
          const isCompleted = progress.completedSteps.includes(index);
          const isCurrent = currentStep === index;
          
          return (
            <div 
              key={index}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg transition-colors",
                isCurrent && "bg-muted",
                "hover:bg-muted/50 cursor-pointer"
              )}
            >
              <button
                type="button"
                onClick={() => handleToggleStep(index, !isCompleted)}
                className="mt-0.5 focus:outline-none"
                aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              
              <div 
                className="flex-1"
                onClick={() => handleStepClick(index)}
              >
                <p className={cn(
                  "text-sm font-medium",
                  isCompleted && "text-muted-foreground line-through"
                )}>
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {progressPercentage < 100 && (
        <Button 
          onClick={handleCompleteAll}
          variant="outline"
          className="w-full mt-2"
        >
          Mark All as Complete
        </Button>
      )}
      
      {progressPercentage === 100 && !progress.isCompleted && (
        <div className="bg-primary/10 p-4 rounded-lg text-center">
          <p className="text-sm font-medium">Congratulations! You've completed this tutorial.</p>
        </div>
      )}
    </div>
  );
} 