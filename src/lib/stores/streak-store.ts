import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type StreakDay = {
  date: string; // ISO date string
  isActive: boolean;
};

interface StreakState {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null; // ISO date string
  streakDays: StreakDay[];
  
  // Actions
  recordActivity: () => void;
  resetStreak: () => void;
  
  // Computed
  getStreakDays: (days?: number) => StreakDay[];
  getStreakStatus: () => { 
    currentStreak: number; 
    longestStreak: number; 
    lastActiveDate: string | null;
    isActiveToday: boolean;
  };
}

export const useStreakStore = create<StreakState>()(
  persist(
    (set, get) => ({
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      streakDays: [],

      recordActivity: () => {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        const { lastActiveDate, currentStreak, longestStreak, streakDays } = get();
        
        // Check if already recorded today
        if (lastActiveDate === todayStr) {
          return; // Already recorded activity today
        }
        
        // Check if this continues a streak (yesterday)
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        let newCurrentStreak = 1; // Default to starting a new streak
        
        if (lastActiveDate === yesterdayStr) {
          // Continue the streak
          newCurrentStreak = currentStreak + 1;
        } else if (lastActiveDate && lastActiveDate !== yesterdayStr) {
          // Broke the streak, starting a new one
          newCurrentStreak = 1;
        }
        
        // Update streak days
        const existingDayIndex = streakDays.findIndex(day => day.date === todayStr);
        let newStreakDays = [...streakDays];
        
        if (existingDayIndex >= 0) {
          // Update existing day
          newStreakDays[existingDayIndex] = { ...newStreakDays[existingDayIndex], isActive: true };
        } else {
          // Add new day
          newStreakDays.push({ date: todayStr, isActive: true });
        }
        
        // Keep only the last 30 days
        if (newStreakDays.length > 30) {
          newStreakDays = newStreakDays.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 30);
        }
        
        // Update state
        set({
          currentStreak: newCurrentStreak,
          longestStreak: Math.max(longestStreak, newCurrentStreak),
          lastActiveDate: todayStr,
          streakDays: newStreakDays,
        });
      },

      resetStreak: () => {
        set({
          currentStreak: 0,
          lastActiveDate: null,
        });
      },

      getStreakDays: (days = 7) => {
        const result: StreakDay[] = [];
        const today = new Date();
        
        // Generate the last 'days' days
        for (let i = days - 1; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          
          // Check if this date is in our streak days
          const existingDay = get().streakDays.find(day => day.date === dateStr);
          
          if (existingDay) {
            result.push(existingDay);
          } else {
            result.push({ date: dateStr, isActive: false });
          }
        }
        
        return result;
      },

      getStreakStatus: () => {
        const { currentStreak, longestStreak, lastActiveDate } = get();
        const today = new Date().toISOString().split('T')[0];
        const isActiveToday = lastActiveDate === today;
        
        return {
          currentStreak,
          longestStreak,
          lastActiveDate,
          isActiveToday,
        };
      },
    }),
    {
      name: 'learning-streak',
    }
  )
); 