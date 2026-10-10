export type ReelTopic = 
  | 'All' 
  | 'AI & LLMs' 
  | 'Engineering & CS' 
  | 'Coding Workflows' 
  | 'Retention & Study' 
  | 'Builder Mindset';

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
  difficulty: 'Foundational' | 'Intermediate' | 'Architect';
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

export interface InteractiveToolConfig {
  id: string;
  title: string;
  description: string;
  type: 'concept-feynman' | 'prompt-evaluator' | 'reliance-audit';
}

export interface ReelContentSections {
  intro: {
    synopsis: string;
    scriptExcerpts?: string[];
    context: string;
  };
  problemAnalysis: {
    title: string;
    narrative: string;
    comparisons: {
      mistake: string;
      reality: string;
    }[];
  };
  resources?: ResourceItem[];
  prompts?: PromptItem[];
  workflow?: WorkflowItem;
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
  tags: string[];
  thumbnail: string;
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
