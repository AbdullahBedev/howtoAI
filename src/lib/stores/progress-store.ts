import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TutorialProgress = {
  id: string;
  title: string;
  completedSteps: number;
  totalSteps: number;
  lastAccessed: Date;
  completed: boolean;
  category: string;
};

export type CategoryProgress = {
  category: string;
  completed: number;
  total: number;
  percentage: number;
};

export type WeeklyActivity = {
  day: string;
  count: number;
};

interface ProgressState {
  tutorials: TutorialProgress[];
  weeklyActivity: WeeklyActivity[];
  categoryProgress: CategoryProgress[];
  currentTutorialId: string | null;
  
  // Actions
  startTutorial: (tutorialId: string, title: string, totalSteps: number, category: string) => void;
  updateProgress: (tutorialId: string, completedSteps: number) => void;
  completeTutorial: (tutorialId: string) => void;
  setCurrentTutorial: (tutorialId: string | null) => void;
  recordActivity: (day: string) => void;
  updateCategoryProgress: () => void;
  
  // Computed
  getTutorialProgress: (tutorialId: string) => TutorialProgress | undefined;
  getCompletedTutorials: () => TutorialProgress[];
  getInProgressTutorials: () => TutorialProgress[];
  getOverallProgress: () => { completed: number; total: number; percentage: number };
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      tutorials: [],
      weeklyActivity: [
        { day: 'Mon', count: 0 },
        { day: 'Tue', count: 0 },
        { day: 'Wed', count: 0 },
        { day: 'Thu', count: 0 },
        { day: 'Fri', count: 0 },
        { day: 'Sat', count: 0 },
        { day: 'Sun', count: 0 },
      ],
      categoryProgress: [
        { category: 'Prompt Engineering', completed: 0, total: 0, percentage: 0 },
        { category: 'Fine-Tuning', completed: 0, total: 0, percentage: 0 },
        { category: 'RAG', completed: 0, total: 0, percentage: 0 },
        { category: 'AI Agents', completed: 0, total: 0, percentage: 0 },
      ],
      currentTutorialId: null,

      startTutorial: (tutorialId, title, totalSteps, category) => {
        const { tutorials } = get();
        const existingTutorial = tutorials.find(t => t.id === tutorialId);
        
        if (!existingTutorial) {
          set(state => ({
            tutorials: [
              ...state.tutorials,
              {
                id: tutorialId,
                title,
                completedSteps: 0,
                totalSteps,
                lastAccessed: new Date(),
                completed: false,
                category,
              }
            ],
            currentTutorialId: tutorialId,
          }));
          
          // Update category progress
          get().updateCategoryProgress();
        } else {
          set(state => ({
            tutorials: state.tutorials.map(t => 
              t.id === tutorialId 
                ? { ...t, lastAccessed: new Date() } 
                : t
            ),
            currentTutorialId: tutorialId,
          }));
        }
        
        // Record activity for today
        const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3);
        get().recordActivity(today);
      },

      updateProgress: (tutorialId, completedSteps) => {
        set(state => ({
          tutorials: state.tutorials.map(t => 
            t.id === tutorialId 
              ? { 
                  ...t, 
                  completedSteps,
                  lastAccessed: new Date(),
                  completed: completedSteps >= t.totalSteps
                } 
              : t
          ),
        }));
        
        // Update category progress
        get().updateCategoryProgress();
      },

      completeTutorial: (tutorialId) => {
        set(state => ({
          tutorials: state.tutorials.map(t => 
            t.id === tutorialId 
              ? { ...t, completed: true, completedSteps: t.totalSteps, lastAccessed: new Date() } 
              : t
          ),
        }));
        
        // Update category progress
        get().updateCategoryProgress();
        
        // Record activity for today
        const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3);
        get().recordActivity(today);
      },

      setCurrentTutorial: (tutorialId) => {
        set({ currentTutorialId: tutorialId });
      },

      recordActivity: (day) => {
        set(state => ({
          weeklyActivity: state.weeklyActivity.map(d => 
            d.day === day ? { ...d, count: d.count + 1 } : d
          ),
        }));
      },

      updateCategoryProgress: () => {
        const { tutorials } = get();
        
        // Group tutorials by category
        const categoryCounts = tutorials.reduce((acc, tutorial) => {
          const category = tutorial.category;
          if (!acc[category]) {
            acc[category] = { completed: 0, total: 0 };
          }
          
          acc[category].total += 1;
          if (tutorial.completed) {
            acc[category].completed += 1;
          }
          
          return acc;
        }, {} as Record<string, { completed: number; total: number }>);
        
        // Update category progress
        set(state => ({
          categoryProgress: state.categoryProgress.map(cp => {
            const counts = categoryCounts[cp.category] || { completed: 0, total: 0 };
            return {
              ...cp,
              completed: counts.completed,
              total: counts.total,
              percentage: counts.total > 0 ? (counts.completed / counts.total) * 100 : 0,
            };
          }),
        }));
      },

      getTutorialProgress: (tutorialId) => {
        return get().tutorials.find(t => t.id === tutorialId);
      },

      getCompletedTutorials: () => {
        return get().tutorials.filter(t => t.completed);
      },

      getInProgressTutorials: () => {
        return get().tutorials.filter(t => !t.completed && t.completedSteps > 0);
      },

      getOverallProgress: () => {
        const { tutorials } = get();
        const total = tutorials.length;
        const completed = tutorials.filter(t => t.completed).length;
        const percentage = total > 0 ? (completed / total) * 100 : 0;
        
        return { completed, total, percentage };
      },
    }),
    {
      name: 'tutorial-progress',
    }
  )
); 