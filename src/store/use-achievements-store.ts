import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
  category: 'beginner' | 'intermediate' | 'advanced' | 'special';
};

type AchievementsStore = {
  achievements: Achievement[];
  unlockAchievement: (achievementId: string) => void;
  getUnlockedAchievements: () => Achievement[];
  getLockedAchievements: () => Achievement[];
  hasUnlocked: (achievementId: string) => boolean;
  getRecentAchievements: (count?: number) => Achievement[];
};

// Define all possible achievements
const allAchievements: Achievement[] = [
  {
    id: 'first-tutorial',
    title: 'First Steps',
    description: 'Complete your first tutorial',
    icon: '🎯',
    unlockedAt: null,
    category: 'beginner',
  },
  {
    id: 'three-tutorials',
    title: 'Getting Started',
    description: 'Complete three tutorials',
    icon: '🚀',
    unlockedAt: null,
    category: 'beginner',
  },
  {
    id: 'five-tutorials',
    title: 'Learning Machine',
    description: 'Complete five tutorials',
    icon: '🧠',
    unlockedAt: null,
    category: 'intermediate',
  },
  {
    id: 'all-beginner',
    title: 'Beginner Master',
    description: 'Complete all beginner tutorials',
    icon: '🌟',
    unlockedAt: null,
    category: 'intermediate',
  },
  {
    id: 'all-writing',
    title: 'Writing Wizard',
    description: 'Complete all writing tutorials',
    icon: '✍️',
    unlockedAt: null,
    category: 'intermediate',
  },
  {
    id: 'all-design',
    title: 'Design Guru',
    description: 'Complete all design tutorials',
    icon: '🎨',
    unlockedAt: null,
    category: 'intermediate',
  },
  {
    id: 'all-marketing',
    title: 'Marketing Maven',
    description: 'Complete all marketing tutorials',
    icon: '📈',
    unlockedAt: null,
    category: 'intermediate',
  },
  {
    id: 'ten-tutorials',
    title: 'AI Enthusiast',
    description: 'Complete ten tutorials',
    icon: '🤖',
    unlockedAt: null,
    category: 'advanced',
  },
  {
    id: 'all-tutorials',
    title: 'AI Master',
    description: 'Complete all tutorials',
    icon: '👑',
    unlockedAt: null,
    category: 'advanced',
  },
  {
    id: 'streak-week',
    title: 'Weekly Streak',
    description: 'Complete at least one tutorial every day for a week',
    icon: '🔥',
    unlockedAt: null,
    category: 'special',
  },
  {
    id: 'streak-month',
    title: 'Monthly Dedication',
    description: 'Maintain a learning streak for 30 days',
    icon: '📅',
    unlockedAt: null,
    category: 'special',
  },
];

export const useAchievementsStore = create<AchievementsStore>()(
  persist(
    (set, get) => ({
      achievements: allAchievements,
      
      unlockAchievement: (achievementId: string) => {
        const { achievements } = get();
        const achievementIndex = achievements.findIndex(a => a.id === achievementId);
        
        if (achievementIndex === -1) return;
        
        // Only unlock if not already unlocked
        if (achievements[achievementIndex].unlockedAt === null) {
          const updatedAchievements = [...achievements];
          updatedAchievements[achievementIndex] = {
            ...updatedAchievements[achievementIndex],
            unlockedAt: new Date().toISOString(),
          };
          
          set({ achievements: updatedAchievements });
        }
      },
      
      getUnlockedAchievements: () => {
        return get().achievements.filter(a => a.unlockedAt !== null);
      },
      
      getLockedAchievements: () => {
        return get().achievements.filter(a => a.unlockedAt === null);
      },
      
      hasUnlocked: (achievementId: string) => {
        const achievement = get().achievements.find(a => a.id === achievementId);
        return achievement ? achievement.unlockedAt !== null : false;
      },
      
      getRecentAchievements: (count = 3) => {
        return get()
          .achievements
          .filter(a => a.unlockedAt !== null)
          .sort((a, b) => {
            // We know unlockedAt is not null due to the filter
            return new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime();
          })
          .slice(0, count);
      },
    }),
    {
      name: 'user-achievements',
    }
  )
); 