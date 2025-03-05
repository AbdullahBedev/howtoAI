'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useAchievementsStore, type Achievement } from '@/store/use-achievements-store';
import { cn } from '@/lib/utils';

interface AchievementNotificationProps {
  achievement: Achievement;
  onClose: () => void;
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  useEffect(() => {
    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className="fixed bottom-4 right-4 z-50 max-w-sm"
    >
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center p-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mr-4">
            <span className="text-2xl">{achievement.icon}</span>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-lg">Achievement Unlocked!</h4>
            <p className="font-medium">{achievement.title}</p>
            <p className="text-sm text-white/80">{achievement.description}</p>
          </div>
        </div>
        <div className="bg-white/10 px-4 py-2 flex justify-between items-center">
          <span className="text-xs text-white/80">
            {achievement.unlockedAt 
              ? new Date(achievement.unlockedAt).toLocaleDateString() 
              : 'Just now'}
          </span>
          <button 
            onClick={onClose}
            className="text-xs text-white/80 hover:text-white"
          >
            Dismiss
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function AchievementNotificationManager() {
  const [recentAchievement, setRecentAchievement] = useState<Achievement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { achievements } = useAchievementsStore();
  
  // Check for newly unlocked achievements
  useEffect(() => {
    const checkForNewAchievements = () => {
      const unlockedAchievements = achievements.filter(a => a.unlockedAt !== null);
      
      if (unlockedAchievements.length === 0) return;
      
      // Sort by unlock time (most recent first)
      const sortedAchievements = [...unlockedAchievements].sort((a, b) => {
        if (!a.unlockedAt || !b.unlockedAt) return 0;
        return new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime();
      });
      
      const mostRecent = sortedAchievements[0];
      
      // Only show notification for achievements unlocked in the last minute
      if (mostRecent.unlockedAt) {
        const unlockTime = new Date(mostRecent.unlockedAt).getTime();
        const now = Date.now();
        const timeDiff = now - unlockTime;
        
        if (timeDiff < 60000) { // 1 minute
          setRecentAchievement(mostRecent);
          setIsVisible(true);
        }
      }
    };
    
    // Check immediately and then every 5 seconds
    checkForNewAchievements();
    const interval = setInterval(checkForNewAchievements, 5000);
    
    return () => clearInterval(interval);
  }, [achievements]);
  
  const handleClose = () => {
    setIsVisible(false);
  };
  
  return (
    <AnimatePresence>
      {isVisible && recentAchievement && (
        <AchievementNotification 
          achievement={recentAchievement} 
          onClose={handleClose} 
        />
      )}
    </AnimatePresence>
  );
} 