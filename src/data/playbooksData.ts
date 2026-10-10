import type { PlaybookItem } from '../types/content';

export const PLAYBOOKS_DATA: PlaybookItem[] = [
  {
    id: 'playbook-01',
    slug: 'active-recall-ai-coding',
    title: 'The Active-Recall AI Coding Protocol',
    subtitle: 'From copy-pasting answers to developing real mental models in 4 deliberate stages.',
    readTime: '12 min read',
    level: 'Foundational',
    category: 'Engineering & CS',
    summary: 'Most developers use AI to bypass friction. This protocol inverts the relationship: using LLMs as strict Socratic interrogators to build lasting technical retention and zero-reliance recall.',
    relatedReelSlug: 'reel-02-ai-usage',
    prompts: [
      {
        id: 'pb1-p1',
        title: 'Socratic Mental Gap Diagnostic',
        purpose: 'Test your understanding before reading any documentation or solution.',
        targetModel: 'Claude 3.7 / GPT-4o',
        variables: ['[TARGET_CONCEPT]'],
        promptText: `I am trying to learn [TARGET_CONCEPT]. Ask me 3 questions in order of increasing complexity:
1. One about core operational mechanics (how it functions in memory or runtime).
2. One about an edge case where it fails.
3. One about a concrete architectural tradeoff compared to an alternative.
Do NOT give hints or answers. Only output the 3 questions.`,
        explanation: 'Creates a cognitive map of what you actually know vs what you merely think you know.'
      },
      {
        id: 'pb1-p2',
        title: 'Code Review Interrogation',
        purpose: 'Forces you to defend every single line of code you write.',
        targetModel: 'DeepSeek R1 / Claude 3.7 Sonnet',
        variables: ['[MY_CODE]'],
        promptText: `Analyze my code below:
"""
[MY_CODE]
"""

Do not provide refactored code. Point out the single line with the highest cognitive overhead or performance penalty, and ask me what alternative data structure could resolve it.`,
        explanation: 'Transforms code review from a passive acceptance of diffs into active engineering defense.'
      }
    ],
    workflow: {
      id: 'wf-pb-01',
      title: 'The 4-Stage Protocol Execution Checklist',
      estimatedTime: '30 minutes',
      difficulty: 'Foundational',
      prerequisites: [
        'A challenging concept or algorithm you need to learn',
        'Text editor with autocomplete temporarily disabled',
        'Offline timer set for 15 minutes'
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'The Cold Diagnostic (10 min)',
          details: 'Write down a plain-English explanation and pseudo-code on a blank page without internet access. Identify the exact step where your certainty degrades.',
          proTip: 'The feeling of mental strain is where the synaptic adaptation happens.'
        },
        {
          stepNumber: 2,
          title: 'Targeted Gap Interrogation',
          details: 'Feed only your specific point of confusion into the model using the Socratic diagnostic prompt. Never ask "explain the whole topic".',
          codeOrCommand: 'prompt: "I understand step A and B, but why does the pointer decrement in step C?"'
        },
        {
          stepNumber: 3,
          title: 'Whiteboard or Physical Sketch',
          details: 'Diagram the memory allocation, message flow, or execution thread on paper or Excalidraw.',
          proTip: 'If you cannot draw it, you do not understand the underlying systems.'
        },
        {
          stepNumber: 4,
          title: 'The Zero-Prompt Scratch Implementation',
          details: 'Open your terminal, create a blank file `scratch.ts`, and implement the logic cleanly from scratch without referencing the conversation.',
          codeOrCommand: 'npx tsx scratch.ts && echo "Verification passed!"'
        }
      ]
    }
  },
  {
    id: 'playbook-02',
    slug: 'zero-hallucination-architecture',
    title: 'Zero-Hallucination Production Workflows',
    subtitle: 'How to structure prompts, schemas, and linting pipelines so LLMs cannot write bad code.',
    readTime: '18 min read',
    level: 'Architect',
    category: 'Code Architecture',
    summary: 'A disciplined framework for integrating AI code generation into serious codebases: strict type constraints, isolated scratch environments, and automated verification before merging.',
    relatedReelSlug: 'reel-04-reading-docs',
    prompts: [
      {
        id: 'pb2-p1',
        title: 'Type-First Contract Enforcement',
        purpose: 'Force the LLM to write airtight TypeScript interfaces before generating business logic.',
        targetModel: 'Claude 3.7 / GPT-4o',
        variables: ['[FEATURE_REQUIREMENTS]'],
        promptText: `Given these requirements:
"""
[FEATURE_REQUIREMENTS]
"""

Output ONLY the exact TypeScript type definitions, interfaces, and function signatures. 
Include JSDoc explaining error conditions and invariants.
DO NOT implement any function bodies (use \`throw new Error("unimplemented")\`).`,
        explanation: 'Locks in software boundaries and prevents hallucinations in runtime business logic.'
      }
    ],
    workflow: {
      id: 'wf-pb-02',
      title: 'Production LLM Integration Pipeline',
      estimatedTime: '45 minutes',
      difficulty: 'Architect',
      prerequisites: [
        'Git repository with CI/CD or strict local linting',
        'TypeScript configured with strict: true'
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Draft Interfaces First',
          details: 'Define unambiguous TypeScript contracts and input/output validation schemas (Zod/TypeBox) before asking for implementations.',
          proTip: 'Types serve as mathematical bounds for LLM generation.'
        },
        {
          stepNumber: 2,
          title: 'Generate in an Isolated Scratch File',
          details: 'Never allow AI code directly into your production directory. Generate into `scratch/trial.ts` and run tests.',
          codeOrCommand: 'mkdir -p scratch && npx vitest run scratch/trial.test.ts'
        },
        {
          stepNumber: 3,
          title: 'Line-by-Line Manual Code Review',
          details: 'Use `git diff` with patience. Inspect every imported dependency for size, security, and edge cases.',
          proTip: 'If you cannot explain why a line is present, delete it.'
        }
      ]
    }
  }
];
