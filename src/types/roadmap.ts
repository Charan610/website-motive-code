export type EngineeringBranch = 
  | 'CSE' 
  | 'ECE' 
  | 'EEE' 
  | 'ME' 
  | 'CIVIL' 
  | 'AIDS' 
  | 'CSBS' 
  | 'OTHER';

export type CurriculumRegulation = 'R23' | 'R20';

export type AcademicYear = 1 | 2 | 3 | 4;

export type AcademicSemester = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type PrimaryGoal = 
  | 'placements' 
  | 'core_engineering' 
  | 'higher_studies' 
  | 'products';

export type WeeklyAvailability = 'light' | 'standard' | 'intensive'; // <5 hrs, 5-10 hrs, 15+ hrs

export type PrimaryObstacle = 
  | 'fundamentals' 
  | 'projects' 
  | 'no_direction' 
  | 'time';

export interface DiagnosticQuestion {
  id: string;
  branch: EngineeringBranch;
  minYear: AcademicYear;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  prerequisiteTag: string;
}

export interface RoadmapResource {
  title: string;
  url: string;
  type: string;
  free: boolean;
}

export interface RoadmapActionItem {
  id: string;
  priority: 'recovery' | 'core' | 'build' | 'competitive';
  title: string;
  rationale: string;
  whatToLearn: string[];
  whatToBuild: string;
  testCommandOrCriteria: string;
  estimatedWeeks: number;
  sustainableHoursPerWeek: number;
  trustedResources: RoadmapResource[];
  evidenceRequired: string;
  categoryTag: string;
}

export interface StudentProfile {
  id: string; // Immutable UUID
  displayName: string;
  recoveryKey: string; // MC-XXXX-XXXX-XXXX
  branch: EngineeringBranch;
  regulation: CurriculumRegulation;
  year: AcademicYear;
  semester: AcademicSemester;
  goal: PrimaryGoal;
  weeklyAvailability: WeeklyAvailability;
  primaryObstacle: PrimaryObstacle;
  diagnosticAnswers: Record<string, number>;
  completedActionIds: string[];
  createdAt: string;
  lastUpdated: string;
}

export interface RoadmapPlanResult {
  id: string;
  profile: StudentProfile;
  academicStageSummary: string;
  diagnosticScore: {
    total: number;
    correct: number;
    missedTags: string[];
  };
  recoveryBridge: RoadmapActionItem | null;
  nextActions: RoadmapActionItem[];
  competencyChecklist: string[];
}
