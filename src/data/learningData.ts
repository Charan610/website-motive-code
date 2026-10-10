import type { PromptItem, ResourceItem } from "../types/content";
export const LEARNING_PROMPTS: PromptItem[] = [
  {
    id: "learn-concept",
    title: "Understand a concept",
    purpose: "Build understanding through examples and questions.",
    targetModel: "Your preferred AI tool",
    variables: ["[TOPIC]", "[LEVEL]"],
    promptText:
      "Act as my personal tutor. I am learning [TOPIC] at [LEVEL]. Ask what I already know. Explain the concept using a simple example followed by a technical example. Ask me one question at a time and wait for my response. If I am wrong, give me a hint before explaining the mistake. Finish by asking me to explain the concept in my own words.",
    explanation:
      "Start from what you know, work through examples, then explain the idea without help.",
    category: "Learning",
  },
  {
    id: "learn-exam",
    title: "Prepare for an exam",
    purpose: "Practice from your own syllabus and notes.",
    targetModel: "Your preferred AI tool",
    variables: ["[SUBJECT/TOPIC]"],
    promptText:
      "Help me prepare for [SUBJECT/TOPIC] using my uploaded syllabus and notes as primary sources. Identify the concepts I need to understand, then generate practice questions by difficulty. Let me attempt each question before revealing the solution. Explain the reasoning, identify common mistakes, and distinguish information supported by my notes from anything that needs verification.",
    explanation:
      "Attempting a question before seeing the solution gives you a way to check your understanding.",
    category: "Learning",
  },
  {
    id: "learn-debug",
    title: "Debug code",
    purpose: "Find the cause before reaching for a rewrite.",
    targetModel: "Your preferred AI tool",
    variables: [],
    promptText:
      "Help me debug this code without immediately rewriting everything. First ask what I expected and what actually happened. Inspect the error, explain the likely cause, and give me a minimal hint. Help me test a fix, identify edge cases, and understand why the solution works. Never claim that code has passed a test unless it has actually been run.",
    explanation:
      "A small, testable change makes it easier to understand what caused a failure.",
    category: "Debugging & RCA",
  },
  {
    id: "learn-project",
    title: "Build a real project",
    purpose: "Make a small version, one milestone at a time.",
    targetModel: "Your preferred AI tool",
    variables: ["[PROJECT]"],
    promptText:
      "Act as my technical mentor for [PROJECT]. Ask about my experience, goals, requirements, and constraints. Help me define a small working version, choose an appropriate stack, and divide the project into milestones. Guide me through implementation one step at a time, explain important decisions, and help me test each milestone. Do not hide errors or invent successful test results.",
    explanation:
      "A small working version lets you test assumptions and learn through implementation.",
    category: "Architecture & Types",
  },
];
export const LEARNING_TOOLS: (ResourceItem & { guide?: string })[] = [
  {
    id: "chatgpt-study",
    name: "ChatGPT Study Mode",
    category: "Active Recall & Testing",
    url: "https://chatgpt.com/studymode",
    guide: "https://help.openai.com/en/articles/11780217-study-mode",
    description:
      "Guided explanations, practice questions, and knowledge checks with your study materials.",
    pricing: "Official Resource",
    whyItMatters:
      "Use when you want a tutor to guide you through a concept. Pair with Understand a concept or Prepare for an exam.",
    limitations:
      "Sign-in and account limits apply. Upload availability depends on your account. Answers can contain mistakes; verify against your course materials.",
    verified: true,
    reelRef: "Reel 02",
  },
  {
    id: "gemini-learning",
    name: "Google Gemini",
    category: "Deep Reading & Research",
    url: "https://gemini.google.com/",
    guide: "https://gemini.google/in/students/",
    description:
      "Explore explanations, research questions, and learning workflows.",
    pricing: "Official Resource",
    whyItMatters:
      "Use to explore a topic from different angles. Pair with the exam preparation prompt and your source notes.",
    limitations:
      "Account, region, and age requirements may apply. Student offers depend on eligibility and current terms. Check important claims against original sources.",
    verified: true,
    reelRef: "Reel 02",
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    category: "Local AI & Dev",
    url: "https://github.com/features/copilot",
    description: "Coding assistance within your development workflow.",
    pricing: "Official Resource",
    whyItMatters:
      "Use while implementing or debugging code. Pair with Debug code or Build a real project.",
    limitations:
      "A GitHub account and supported integration are required; features depend on access and plan. Inspect, test, and understand generated code.",
    verified: true,
    reelRef: "Reel 02",
  },
];
export const LEARNING_WORKFLOW = [
  ["Define", "State the problem and your desired outcome."],
  [
    "Contextualise",
    "Share relevant notes, code, requirements, and constraints.",
  ],
  ["Collaborate", "Ask for explanations, hints, and manageable steps."],
  ["Verify", "Test code and check claims against reliable sources."],
  ["Apply", "Demonstrate understanding without relying on AI."],
];
