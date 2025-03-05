import { NextRequest, NextResponse } from 'next/server';
import { AchievementRepository } from '@/lib/repositories/achievement-repository';
import { TutorialRepository } from '@/lib/repositories/tutorial-repository';
import { getCurrentUser } from '@/lib/auth/auth-service';
import { logger } from '@/lib/logging';
import { TutorialProgress } from '@prisma/client';

interface TutorialProgressWithTutorial extends TutorialProgress {
  tutorial: {
    id: string;
    category: string;
    tags: string[];
    title: string;
    // Add other properties as needed
  };
}

const achievementRepository = new AchievementRepository();
const tutorialRepository = new TutorialRepository();

/**
 * GET handler to retrieve achievements for the current user
 */
export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') as any;

    // Get achievements
    const achievements = type
      ? await achievementRepository.getUserAchievementsByType(user.id, type)
      : await achievementRepository.getUserAchievements(user.id);

    return NextResponse.json({
      success: true,
      achievements,
    });
  } catch (error) {
    logger.error('Failed to get user achievements', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * POST handler to verify and potentially award new achievements
 */
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check for tutorial completion achievements
    const userProgress = await tutorialRepository.getUserProgress(user.id);
    
    // Ensure we have an array to work with (getUserProgress returns array when no tutorialId is provided)
    const progressArray = Array.isArray(userProgress) ? userProgress : [];
    
    // Track completed tutorials
    const completedTutorials = progressArray.filter((p: TutorialProgressWithTutorial) => 
      p.progress >= 1.0 && p.completedAt
    );
    
    const promptTutorials = progressArray.filter((p: TutorialProgressWithTutorial) => 
      p.progress >= 1.0 && 
      p.completedAt && 
      (p.tutorial.category === 'prompt-engineering' || p.tutorial.tags.includes('prompting'))
    );
    
    // Array to store newly earned achievements
    const newAchievements = [];
    
    // Check tutorial completion achievements
    for (const progress of completedTutorials) {
      const achievement = await achievementRepository.checkTutorialCompletion(
        user.id, 
        progress.tutorialId
      );
      
      if (achievement) {
        newAchievements.push(achievement);
      }
    }
    
    // Check for learning streak achievement
    const streakAchievement = await achievementRepository.checkLearningStreak(user.id);
    if (streakAchievement) {
      newAchievements.push(streakAchievement);
    }
    
    // Check for prompt mastery achievement
    const promptMasteryAchievement = await achievementRepository.checkPromptMastery(
      user.id, 
      promptTutorials.length
    );
    if (promptMasteryAchievement) {
      newAchievements.push(promptMasteryAchievement);
    }
    
    // Get all user achievements after updates
    const allAchievements = await achievementRepository.getUserAchievements(user.id);
    
    return NextResponse.json({
      success: true,
      newAchievements,
      achievements: allAchievements,
    });
  } catch (error) {
    logger.error('Failed to verify achievements', { error });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 