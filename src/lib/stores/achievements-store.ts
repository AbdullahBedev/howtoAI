import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date | null;
  isUnlocked: boolean;
  category: 'tutorial' | 'streak' | 'engagement' | 'mastery';
};

interface AchievementsState {
  achievements: Achievement[];
  
  // Actions
  unlockAchievement: (id: string) => void;
  checkTutorialAchievements: (completedCount: number) => void;
  checkStreakAchievements: (streakDays: number) => void;
  
  // Computed
  getUnlockedAchievements: () => Achievement[];
  getLockedAchievements: () => Achievement[];
  getRecentAchievements: (count?: number) => Achievement[];
}

export const useAchievementsStore = create<AchievementsState>()(
  persist(
    (set, get) => ({
      achievements: [
        {
          id: 'first-tutorial',
          title: 'First Steps',
          description: 'Complete your first tutorial',
          icon: '🎯',
          unlockedAt: null,
          isUnlocked: false,
          category: 'tutorial',
        },
        {
          id: 'three-tutorials',
          title: 'Learning Machine',
          description: 'Complete five tutorials',
          icon: '🧠',
          unlockedAt: null,
          isUnlocked: false,
          category: 'tutorial',
        },
        {
          id: 'ten-tutorials',
          title: 'Knowledge Seeker',
          description: 'Complete ten tutorials',
          icon: '📚',
          unlockedAt: null,
          isUnlocked: false,
          category: 'tutorial',
        },
        {
          id: 'three-day-streak',
          title: 'Consistency',
          description: '3 day learning streak',
          icon: '🔥',
          unlockedAt: null,
          isUnlocked: false,
          category: 'streak',
        },
        {
          id: 'seven-day-streak',
          title: 'Weekly Streak',
          description: '7 day learning streak',
          icon: '🔥',
          unlockedAt: null,
          isUnlocked: false,
          category: 'streak',
        },
        {
          id: 'thirty-day-streak',
          title: 'Monthly Dedication',
          description: '30 day learning streak',
          icon: '🏆',
          unlockedAt: null,
          isUnlocked: false,
          category: 'streak',
        },
        {
          id: 'prompt-master',
          title: 'Prompt Master',
          description: 'Complete all prompt engineering tutorials',
          icon: '✨',
          unlockedAt: null,
          isUnlocked: false,
          category: 'mastery',
        },
        {
          id: 'design-guru',
          title: 'Design Guru',
          description: 'Complete all design tutorials',
          icon: '🎨',
          unlockedAt: null,
          isUnlocked: false,
          category: 'mastery',
        },
      ],

      unlockAchievement: (id) => {
        set(state => ({
          achievements: state.achievements.map(achievement => 
            achievement.id === id && !achievement.isUnlocked
              ? { ...achievement, isUnlocked: true, unlockedAt: new Date() }
              : achievement
          ),
        }));
      },

      checkTutorialAchievements: (completedCount) => {
        const { unlockAchievement } = get();
        
        if (completedCount >= 1) {
          unlockAchievement('first-tutorial');
        }
        
        if (completedCount >= 5) {
          unlockAchievement('three-tutorials');
        }
        
        if (completedCount >= 10) {
          unlockAchievement('ten-tutorials');
        }
      },

      checkStreakAchievements: (streakDays) => {
        const { unlockAchievement } = get();
        
        if (streakDays >= 3) {
          unlockAchievement('three-day-streak');
        }
        
        if (streakDays >= 7) {
          unlockAchievement('seven-day-streak');
        }
        
        if (streakDays >= 30) {
          unlockAchievement('thirty-day-streak');
        }
      },

      getUnlockedAchievements: () => {
        return get().achievements.filter(a => a.isUnlocked);
      },

      getLockedAchievements: () => {
        return get().achievements.filter(a => !a.isUnlocked);
      },

      getRecentAchievements: (count = 3) => {
        return get().achievements
          .filter(a => a.isUnlocked)
          .sort((a, b) => {
            if (!a.unlockedAt || !b.unlockedAt) return 0;
            return b.unlockedAt.getTime() - a.unlockedAt.getTime();
          })
          .slice(0, count);
      },
    }),
    {
      name: 'user-achievements',
    }
  )
); 