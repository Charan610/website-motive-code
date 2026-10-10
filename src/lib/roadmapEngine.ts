import type {
  StudentProfile,
  RoadmapPlanResult,
  RoadmapActionItem,
  EngineeringBranch,
} from '../types/roadmap';
import {
  DIAGNOSTIC_QUESTIONS,
  RECOVERY_BRIDGES,
  BRANCH_MILESTONES,
} from '../data/roadmapData';

export function evaluateDiagnostic(profile: StudentProfile): {
  total: number;
  correct: number;
  missedTags: string[];
} {
  const branchQuestions = DIAGNOSTIC_QUESTIONS.filter(
    (q) => q.branch === (profile.branch === 'AIDS' ? 'CSE' : profile.branch)
  );

  let correct = 0;
  const missedTags: string[] = [];

  branchQuestions.forEach((q) => {
    const userAnswer = profile.diagnosticAnswers[q.id];
    if (userAnswer === q.correctIndex) {
      correct += 1;
    } else {
      missedTags.push(q.prerequisiteTag);
    }
  });

  return {
    total: branchQuestions.length,
    correct,
    missedTags,
  };
}

export function generateRoadmapPlan(profile: StudentProfile): RoadmapPlanResult {
  const diagnosticResult = evaluateDiagnostic(profile);

  // 1. Determine Effective Branch (AIDS maps to CSE with ML tracks)
  const effectiveBranch: EngineeringBranch =
    profile.branch === 'AIDS' ? 'CSE' : profile.branch;

  // 2. Determine Recovery Bridge if critical fundamentals missed
  let recoveryBridge: RoadmapActionItem | null = null;
  for (const tag of diagnosticResult.missedTags) {
    if (RECOVERY_BRIDGES[tag]) {
      recoveryBridge = {
        ...RECOVERY_BRIDGES[tag],
        // Scale recovery bridge time if availability is light
        sustainableHoursPerWeek:
          profile.weeklyAvailability === 'light' ? 4 : 6,
      };
      break; // Focus on the single most critical bridge first
    }
  }

  // 3. Fetch Milestones for Year
  const branchYearMilestones =
    BRANCH_MILESTONES[effectiveBranch]?.[profile.year] ||
    BRANCH_MILESTONES.CSE[profile.year] ||
    [];

  // 4. Filter & Size Actions according to Weekly Availability & Goal
  let nextActions: RoadmapActionItem[] = [];

  if (profile.weeklyAvailability === 'light') {
    // Single highest-priority core action to avoid abandonment
    nextActions = branchYearMilestones.slice(0, 1);
  } else if (profile.weeklyAvailability === 'standard') {
    // 2 high-yield actions (Core + Build)
    nextActions = branchYearMilestones.slice(0, 2);
  } else {
    // Intensive: All milestones for the year
    nextActions = [...branchYearMilestones];
  }

  // If goal is products/shipping, ensure the build action is emphasized first
  if (profile.goal === 'products' && nextActions.length > 1) {
    const buildAction = nextActions.find((a) => a.priority === 'build');
    const otherActions = nextActions.filter((a) => a.priority !== 'build');
    if (buildAction) {
      nextActions = [buildAction, ...otherActions];
    }
  }

  // 5. Generate Academic Stage Summary
  const regulationLabel = profile.regulation || 'R23';
  const semesterOrdinal = profile.semester;
  const stageSummary = `SRKR B.Tech ${profile.branch} (Year ${profile.year}, Semester ${semesterOrdinal} — ${regulationLabel} Regulation). Target objective: ${formatGoal(profile.goal)}. Available pace: ${formatAvailability(profile.weeklyAvailability)}.`;

  // 6. Generate Observable Competency Checklist
  const competencyChecklist: string[] = [
    `Complete weekly cold-recall draft before opening AI chat or documentation`,
    `Pass all automated test cases and compile with zero warnings (-Wall -Wextra)`,
    `Document architectural trade-offs and time/space complexity in project README`,
    `Demonstrate running terminal command or hardware output without reading notes`,
  ];

  return {
    id: profile.id,
    profile,
    academicStageSummary: stageSummary,
    diagnosticScore: diagnosticResult,
    recoveryBridge,
    nextActions,
    competencyChecklist,
  };
}

function formatGoal(goal: string): string {
  switch (goal) {
    case 'placements':
      return 'Software & Product Placements';
    case 'core_engineering':
      return 'Core Engineering & Hardware Design';
    case 'higher_studies':
      return 'GATE / Masters & Research';
    case 'products':
      return 'Building & Shipping Independent Software';
    default:
      return 'Engineering Mastery';
  }
}

function formatAvailability(avail: string): string {
  switch (avail) {
    case 'light':
      return '< 5 hours/week (Sized for single-focus milestone)';
    case 'standard':
      return '5–10 hours/week (Standard active pace)';
    case 'intensive':
      return '15+ hours/week (Intensive builder pace)';
    default:
      return 'Flexible';
  }
}
