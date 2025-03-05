'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAchievementsStore, type Achievement } from '@/store/use-achievements-store';
import { useProgressStore } from '@/store/use-progress-store';

// This component doesn't render anything visible
// It just listens for achievement conditions and shows toasts
export function AchievementToastListener() {
  const { 
    unlockAchievement, 
    hasUnlocked, 
    achievements 
  } = useAchievementsStore();
  
  const { 
    getCompletedTutorials, 
    getInProgressTutorials,
    getTotalCompletedSteps 
  } = useProgressStore();

  // Show a toast when an achievement is unlocked
  const showAchievementToast = (achievement: Achievement) => {
    toast.success(
      <div className="flex items-start gap-3">
        <div className="text-2xl">{achievement.icon}</div>
        <div>
          <h3 className="font-semibold">Achievement Unlocked: {achievement.title}</h3>
          <p className="text-sm text-muted-foreground">{achievement.description}</p>
        </div>
      </div>,
      {
        duration: 5000,
        position: 'top-right',
      }
    );
  };

  // Check for achievements based on tutorial progress
  useEffect(() => {
    const completedTutorials = getCompletedTutorials();
    const inProgressTutorials = getInProgressTutorials();
    const totalCompleted = completedTutorials.length;
    
    // First tutorial completed
    if (totalCompleted >= 1 && !hasUnlocked('first-tutorial')) {
      const achievement = achievements.find(a => a.id === 'first-tutorial');
      unlockAchievement('first-tutorial');
      if (achievement) showAchievementToast(achievement);
    }
    
    // Three tutorials completed
    if (totalCompleted >= 3 && !hasUnlocked('three-tutorials')) {
      const achievement = achievements.find(a => a.id === 'three-tutorials');
      unlockAchievement('three-tutorials');
      if (achievement) showAchievementToast(achievement);
    }
    
    // Five tutorials completed
    if (totalCompleted >= 5 && !hasUnlocked('five-tutorials')) {
      const achievement = achievements.find(a => a.id === 'five-tutorials');
      unlockAchievement('five-tutorials');
      if (achievement) showAchievementToast(achievement);
    }
    
    // Ten tutorials completed
    if (totalCompleted >= 10 && !hasUnlocked('ten-tutorials')) {
      const achievement = achievements.find(a => a.id === 'ten-tutorials');
      unlockAchievement('ten-tutorials');
      if (achievement) showAchievementToast(achievement);
    }
    
    // Check for category-specific achievements
    // This is a simplified implementation - in a real app, you'd need to know which tutorials belong to which categories
    
    // For demonstration purposes, we'll just check if there are any completed tutorials
    if (totalCompleted > 0) {
      // In a real implementation, you would check if all tutorials of a specific category are completed
      // For example:
      // const allBeginnerTutorials = [...]; // List of all beginner tutorial IDs
      // const completedBeginnerTutorials = completedTutorials.filter(t => allBeginnerTutorials.includes(t.tutorialId));
      // if (completedBeginnerTutorials.length === allBeginnerTutorials.length && !hasUnlocked('all-beginner')) {
      //   unlockAchievement('all-beginner');
      // }
    }
    
  }, [achievements, getCompletedTutorials, getInProgressTutorials, hasUnlocked, unlockAchievement]);

  return null;
} 