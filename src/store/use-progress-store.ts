import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TutorialProgress = {
  tutorialId: string;
  completedSteps: number[];
  totalSteps: number;
  lastUpdated: string;
  isCompleted: boolean;
};

type ProgressStore = {
  progress: TutorialProgress[];
  addProgress: (tutorialId: string, totalSteps: number) => void;
  updateProgress: (tutorialId: string, stepIndex: number, completed: boolean) => void;
  markTutorialComplete: (tutorialId: string) => void;
  getProgress: (tutorialId: string) => TutorialProgress | undefined;
  getCompletedTutorials: () => TutorialProgress[];
  getInProgressTutorials: () => TutorialProgress[];
  getTotalCompletedSteps: () => number;
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: [],
      
      addProgress: (tutorialId, totalSteps) => {
        const { progress } = get();
        const existingProgress = progress.find(p => p.tutorialId === tutorialId);
        
        if (!existingProgress) {
          set({
            progress: [
              ...progress,
              {
                tutorialId,
                completedSteps: [],
                totalSteps,
                lastUpdated: new Date().toISOString(),
                isCompleted: false,
              },
            ],
          });
        }
      },
      
      updateProgress: (tutorialId, stepIndex, completed) => {
        const { progress } = get();
        const tutorialProgress = progress.find(p => p.tutorialId === tutorialId);
        
        if (!tutorialProgress) return;
        
        const updatedCompletedSteps = completed
          ? [...new Set([...tutorialProgress.completedSteps, stepIndex])]
          : tutorialProgress.completedSteps.filter(step => step !== stepIndex);
        
        const isCompleted = updatedCompletedSteps.length === tutorialProgress.totalSteps;
        
        set({
          progress: progress.map(p =>
            p.tutorialId === tutorialId
              ? {
                  ...p,
                  completedSteps: updatedCompletedSteps,
                  lastUpdated: new Date().toISOString(),
                  isCompleted,
                }
              : p
          ),
        });
      },
      
      markTutorialComplete: (tutorialId) => {
        const { progress } = get();
        const tutorialProgress = progress.find(p => p.tutorialId === tutorialId);
        
        if (!tutorialProgress) return;
        
        // Create an array of all step indices from 0 to totalSteps-1
        const allSteps = Array.from({ length: tutorialProgress.totalSteps }, (_, i) => i);
        
        set({
          progress: progress.map(p =>
            p.tutorialId === tutorialId
              ? {
                  ...p,
                  completedSteps: allSteps,
                  lastUpdated: new Date().toISOString(),
                  isCompleted: true,
                }
              : p
          ),
        });
      },
      
      getProgress: (tutorialId) => {
        return get().progress.find(p => p.tutorialId === tutorialId);
      },
      
      getCompletedTutorials: () => {
        return get().progress.filter(p => p.isCompleted);
      },
      
      getInProgressTutorials: () => {
        return get().progress.filter(p => !p.isCompleted && p.completedSteps.length > 0);
      },
      
      getTotalCompletedSteps: () => {
        return get().progress.reduce((total, p) => total + p.completedSteps.length, 0);
      },
    }),
    {
      name: 'tutorial-progress',
    }
  )
); 