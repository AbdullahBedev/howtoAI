import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StreakState {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  streakStartDate: string | null;
  
  // Actions
  recordActivity: () => void;
  resetStreak: () => void;
  getStreakData: () => {
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: string | null;
    streakStartDate: string | null;
    daysUntilStreakLost: number;
  };
}

export const useStreakStore = create<StreakState>()(
  persist(
    (set, get) => ({
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
      streakStartDate: null,
      
      recordActivity: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStr = today.toISOString();
        
        const { lastActivityDate, currentStreak, longestStreak, streakStartDate } = get();
        
        // If this is the first activity ever
        if (!lastActivityDate) {
          set({
            currentStreak: 1,
            lastActivityDate: todayStr,
            streakStartDate: todayStr
          });
          return;
        }
        
        const lastDate = new Date(lastActivityDate);
        lastDate.setHours(0, 0, 0, 0);
        
        const diffTime = Math.abs(today.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // If already recorded activity today, do nothing
        if (diffDays === 0) {
          return;
        }
        
        // If activity was yesterday, increment streak
        if (diffDays === 1) {
          const newStreak = currentStreak + 1;
          set({
            currentStreak: newStreak,
            longestStreak: Math.max(newStreak, longestStreak),
            lastActivityDate: todayStr
          });
          return;
        }
        
        // If activity was more than a day ago, reset streak
        if (diffDays > 1) {
          set({
            currentStreak: 1,
            lastActivityDate: todayStr,
            streakStartDate: todayStr
          });
        }
      },
      
      resetStreak: () => {
        set({
          currentStreak: 0,
          lastActivityDate: null,
          streakStartDate: null
        });
      },
      
      getStreakData: () => {
        const { currentStreak, longestStreak, lastActivityDate, streakStartDate } = get();
        
        let daysUntilStreakLost = 0;
        
        if (lastActivityDate) {
          const lastDate = new Date(lastActivityDate);
          lastDate.setHours(0, 0, 0, 0);
          
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          
          const nextActivityDeadline = new Date(lastDate);
          nextActivityDeadline.setDate(nextActivityDeadline.getDate() + 2); // 2 days after last activity
          
          if (today.getTime() === lastDate.getTime()) {
            // If activity was today, streak is maintained until end of tomorrow
            daysUntilStreakLost = 1;
          } else if (tomorrow.getTime() === nextActivityDeadline.getTime()) {
            // If tomorrow is the deadline, streak will be lost after tomorrow
            daysUntilStreakLost = 1;
          } else {
            daysUntilStreakLost = 0; // Streak is already lost or will be lost today
          }
        }
        
        return {
          currentStreak,
          longestStreak,
          lastActivityDate,
          streakStartDate,
          daysUntilStreakLost
        };
      }
    }),
    {
      name: 'user-streak',
    }
  )
); 