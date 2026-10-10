export type ReelTopic = 
  | 'All' 
  | 'AI & LLMs' 
  | 'Engineering & CS' 
  | 'Coding Workflows' 
  | 'Retention & Study' 
  | 'Builder Mindset';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Foundational' | 'Architect';

export type ResourceCategory = 
  | 'All'
  | 'Local AI & Dev' 
  | 'Deep Reading & Research' 
  | 'Code Architecture' 
  | 'Active Recall & Testing';

export interface PromptItem {
  id: string;
  title: string;
  purpose: string;
  targetModel: string;
  promptText: string;
  explanation: string;
  variables: string[];
  category?: string;
  reelRef?: string;
}

export interface WorkflowStepItem {
  stepNumber: number;
  title: string;
  details: string;
  codeOrCommand?: string;
  proTip?: string;
}

export interface WorkflowItem {
  id: string;
  title: string;
  estimatedTime: string;
  difficulty: DifficultyLevel;
  prerequisites: string[];
  steps: WorkflowStepItem[];
}

export interface ResourceItem {
  id: string;
  name: string;
  category: 'Local AI & Dev' | 'Deep Reading & Research' | 'Code Architecture' | 'Active Recall & Testing';
  url: string;
  description: string;
  pricing: 'Free / Open-Source' | 'Freemium' | 'Official Resource' | 'Built-in Tool';
  isLocalOrBuiltIn?: boolean;
  whyItMatters: string;
  limitations: string;
  verified: boolean;
  reelRef?: string;
}

export interface FlashcardItem {
  id: string;
  front: string;
  back: string;
  hint?: string;
  category?: string;
  codeSnippet?: string;
}

export interface QuizQuestionItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface InteractiveToolConfig {
  id: string;
  title: string;
  description: string;
  type: 'concept-feynman' | 'prompt-evaluator' | 'reliance-audit';
}

export interface CommonMistakeItem {
  mistake: string;
  reality: string;
  fix: string;
}

export interface DownloadableResourceItem {
  title: string;
  url: string;
  description?: string;
  format?: string;
  type?: 'PDF Guide' | 'Prompt Pack' | 'Anki Deck' | 'Boilerplate Repo' | string;
  badge?: string;
}

export interface ReelContentSections {
  intro: {
    synopsis: string;
    scriptExcerpts?: string[];
    context: string;
  };
  whatYoullBuild?: string;
  problemAnalysis: {
    title: string;
    narrative: string;
    comparisons: {
      mistake: string;
      reality: string;
    }[];
  };
  commonMistakes?: CommonMistakeItem[];
  resources?: ResourceItem[];
  prompts?: PromptItem[];
  workflow?: WorkflowItem;
  flashcards?: FlashcardItem[];
  quiz?: QuizQuestionItem[];
  downloadableResource?: DownloadableResourceItem;
  downloadables?: DownloadableResourceItem[];
  interactiveTool?: InteractiveToolConfig;
  examples?: {
    title: string;
    description: string;
    codeOrSpec?: string;
  }[];
  nextSteps?: {
    title: string;
    link: string;
    description: string;
  }[];
}


export interface ReelItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  topic: 'AI & LLMs' | 'Engineering & CS' | 'Coding Workflows' | 'Retention & Study' | 'Builder Mindset';
  difficulty: DifficultyLevel;
  timeToBuild: string;
  tags: string[];
  thumbnail: string;
  instagramUrl?: string;
  publishedAt: string;
  status: 'AVAILABLE' | 'COMING_NEXT' | 'IN_PRODUCTION';
  duration: string;
  coreThesis: string;
  editorialQuote: string;
  hasInteractiveTool: boolean;
  sections: ReelContentSections;
}

export interface PlaybookItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  readTime: string;
  level: string;
  category: string;
  summary: string;
  workflow: WorkflowItem;
  prompts: PromptItem[];
  relatedReelSlug?: string;
}

export interface UserProgressData {
  completedReels: string[];
  completedWorkflows: string[];
  quizScores: { [reelId: string]: number };
  masteredFlashcards: string[];
  currentStreakDays: number;
  lastActiveDate: string;
}
