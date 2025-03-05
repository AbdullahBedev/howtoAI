export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: Difficulty;
  tool: string;
  isPremium: boolean;
}

export interface Track {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
  icon: string;
  tutorials: Tutorial[];
}

export default Track; 