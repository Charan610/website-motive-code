import { LEARNING_PROMPTS, LEARNING_TOOLS, LEARNING_WORKFLOW } from './learningData';
import type { ReelItem } from '../types/content';

export const REELS_DATA: ReelItem[] = [
  {
    id: 'reel-02',
    slug: 'reel-02-ai-usage',
    number: '02',
    title: "You're Using AI Wrong",
    subtitle: 'Stop collecting answers. Start building mental models.',
    topic: 'AI & LLMs',
    difficulty: 'Intermediate',
    timeToBuild: '25 mins',
    tags: ['Active Recall', 'Prompt Architecture', 'CS Retention', 'Mental Models'],
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    publishedAt: 'Oct 2026',
    status: 'AVAILABLE',
    duration: '0:58',
    coreThesis: 'Most students use LLMs like an escape hatch from cognitive friction. When you bypass friction, you bypass neuroplasticity. Use AI as a sparring partner, not an answer dispenser.',
    editorialQuote: 'In the real world, nobody cares how good your prompt was. They care what you can actually build without it.',
    hasInteractiveTool: true,
    sections: {
      intro: {
        synopsis: 'Short-form content highlighted the reality check: you upload your syllabus, prompt for questions, copy answers, and pass the exam with 100% score but 0% retention. This resource hub turns that confrontation into a permanent mental upgrade.',
        context: 'Designed for engineering students, junior developers, and self-taught builders who find themselves helpless the minute the prompt box disappears.',
        scriptExcerpts: [
          "You're not using AI to learn. You're using it to escape learning.",
          "You upload your syllabus... Copy the answers... Exam score: 100%. Retention: 0%.",
          "Congratulations. You got the answer. But can you explain it without AI?",
          "Don't ask AI to think for you. Use it to think with you. Learn the concept. Build the project. Debug the code.",
          "Stop collecting answers. Start building skills."
        ]
      },
      whatYoullBuild: 'An unassisted, self-contained implementation of an algorithmic mental model with zero copilot aids, verified by a strict Socratic interrogation test.',
      commonMistakes: [
        {
          mistake: 'Copying generated code directly into production files.',
          reality: 'Creates phantom familiarity where syntax looks obvious but cannot be modified under stress.',
          fix: 'Re-type every line by hand in a scratch file while verbalizing the memory invariants.'
        },
        {
          mistake: 'Asking the LLM: "Fix this error for me."',
          reality: 'Leaves you blind to runtime call stack mechanics.',
          fix: 'Feed only the error line: "Explain what runtime condition triggers this invariant violation without giving the code fix."'
        },
        {
          mistake: 'Stopping when tests pass once.',
          reality: 'Edge cases and concurrency race conditions remain undetected.',
          fix: 'Prompt the model: "What 3 boundary conditions break this code when load multiplies 100x?"'
        }
      ],
      downloadableResource: {
        title: 'The Socratic Sparring Cheat Sheet & System Prompts',
        url: '#prompts-section',
        type: 'Prompt Pack',
        badge: 'Official Pack'
      },
      resources: [
        {
          id: 'res-socratic-prompt',
          name: 'The Socratic Sparring System Prompt',
          category: 'Active Recall & Testing',
          url: '#prompts-section',
          description: 'A tuned system prompt that forces LLMs to reject giving direct solutions, interrogating your mental gaps instead.',
          pricing: 'Built-in Tool',
          isLocalOrBuiltIn: true,
          whyItMatters: 'Forces high cognitive friction, resulting in 4x long-term retention compared to passive reading.',
          limitations: 'Requires patience; slower than instant copy-pasting answers.',
          verified: true,
          reelRef: 'Reel 02'
        },
        {
          id: 'res-anki-systems',
          name: 'Anki for Software Engineering Architecture',
          category: 'Deep Reading & Research',
          url: 'https://apps.ankiweb.net/',
          description: 'Spaced repetition software for internalizing fundamental CS primitives: OS kernels, networking protocols, and complexity tables.',
          pricing: 'Free / Open-Source',
          whyItMatters: 'Separates concepts you recall cold from those you only recognize with a prompt.',
          limitations: 'Deck authoring requires personal discipline.',
          verified: true,
          reelRef: 'Reel 02'
        },
        {
          id: 'res-excalidraw',
          name: 'Excalidraw Architecture Canvas',
          category: 'Code Architecture',
          url: 'https://excalidraw.com/',
          description: 'Virtual collaborative whiteboard for diagramming systems before touching a code editor or prompt.',
          pricing: 'Free / Open-Source',
          whyItMatters: 'Forces spatial & causal clarity: if you cannot draw data flow, you cannot prompt it accurately.',
          limitations: 'Free canvas; manual export management.',
          verified: true,
          reelRef: 'Reel 02'
        },
        {
          id: 'res-local-ollama',
          name: 'Ollama — Local Offline LLM Sandbox',
          category: 'Local AI & Dev',
          url: 'https://ollama.com/',
          description: 'Run lightweight open weights (Llama 3, Qwen 2.5 Coder, DeepSeek) locally on your Mac or Linux laptop without cloud telemetry.',
          pricing: 'Free / Open-Source',
          whyItMatters: 'Zero latency experiments, complete privacy, and zero API cost for active study drills.',
          limitations: 'Requires 8GB+ RAM; GPU acceleration recommended for larger weights.',
          verified: true,
          reelRef: 'Reel 02'
        }
      ],
      prompts: [
        {
          id: 'prompt-socratic-drill',
          title: 'The Socratic Sparring Partner',
          purpose: 'Forces the LLM to interrogate you like a tough technical interviewer rather than spoon-feeding answers.',
          targetModel: 'Claude 3.7 Sonnet / ChatGPT-4o / DeepSeek R1',
          variables: ['[CONCEPT]', '[TARGET_ROLE]', '[DIFFICULTY]'],
          promptText: `Act as a senior principal software engineer conducting an oral technical defense. 
I want to master [CONCEPT]. 
DO NOT explain [CONCEPT] to me directly. DO NOT output code solutions.
Instead, ask me ONE targeted, probing question to test whether I understand the underlying mechanics rather than the surface definition.
Wait for my answer. 
When I answer:
1. Identify any missing edge cases, flawed assumptions, or buzzwords in my explanation.
2. Ask the next question that forces me to reason deeper.
Keep your questions strict, concise, and focused on real-world engineering tradeoffs.`,
          explanation: 'Reverses the dynamic from passive information consumption to active retrieval, strengthening synaptic pathways through cognitive friction.',
          category: 'Socratic Interrogation',
          reelRef: 'Reel 02'
        },
        {
          id: 'prompt-feynman-hunter',
          title: 'The Jargon Hunter & Feynman Test',
          purpose: 'Diagnoses whether you actually understand an algorithm or are just regurgitating keywords.',
          targetModel: 'Any Frontier LLM',
          variables: ['[MY_EXPLANATION]', '[TOPIC]'],
          promptText: `Here is my attempt to explain [TOPIC] in plain English:
"""
[MY_EXPLANATION]
"""

Critique this strictly:
1. Highlight any jargon words where I used a term without demonstrating that I understand what happens under the hood.
2. What physical analogy or mental model is flawed in my description?
3. What is the single biggest question a junior engineer would still have after reading my explanation?
DO NOT rewrite my explanation for me. Just diagnose my blind spots.`,
          explanation: 'Detects the "Illusion of Explanatory Depth" before an exam or job interview uncovers it.',
          category: 'Cognitive Diagnostics',
          reelRef: 'Reel 02'
        },
        {
          id: 'prompt-tradeoff-audit',
          title: 'Architectural Tradeoff Pressure-Tester',
          purpose: 'Stops you from asking "What is the best way?" and forces you to analyze why compromises exist in code.',
          targetModel: 'Claude 3.7 / GPT-4o',
          variables: ['[CHOSEN_STACK_OR_PATTERN]', '[SYSTEM_GOAL]'],
          promptText: `I am planning to implement [CHOSEN_STACK_OR_PATTERN] for [SYSTEM_GOAL].
List the 3 catastrophic failure modes or scaling bottlenecks this choice introduces when throughput increases by 100x.
For each failure mode, ask me how I plan to mitigate it, without suggesting the solution yourself.`,
          explanation: 'Instills architectural skepticism — the core trait distinguishing senior builders from prompt-copying students.',
          category: 'Systems Design',
          reelRef: 'Reel 02'
        }
      ],
      flashcards: [
        {
          id: 'fc-1',
          front: 'What is the "Fluency Illusion" when using AI for coding?',
          back: 'Because an AI-generated explanation feels easy to read and understand, your brain falsely assumes it has mastered the concept without forming true synaptic recall pathways.',
          hint: 'Think about the difference between recognition vs recall.'
        },
        {
          id: 'fc-2',
          front: 'Why does "Cognitive Friction" produce 4x higher retention?',
          back: 'Active retrieval forces neural reconstruction of the solution pathway, releasing neuromodulators that signal the brain to encode long-term memory.',
          hint: 'Relates to the Bjork desirable difficulties principle.'
        },
        {
          id: 'fc-3',
          front: 'What is the core rule of the Socratic Sparring Prompt?',
          back: 'Forbid the model from outputting direct code or definitions. Require it to ask one probing technical edge-case question at a time.',
          hint: 'Transforms the AI from an oracle into an examiner.'
        },
        {
          id: 'fc-4',
          front: 'What is the "Cold Recall Draft" step in the protocol?',
          back: 'Taking 5 to 10 minutes with zero internet access to sketch out your initial mental model and pseudo-code on a blank canvas.',
          hint: 'The friction of initial failure primes the brain.'
        }
      ],
      quiz: [
        {
          id: 'q-1',
          question: 'When an AI outputs code in 2 seconds, which psychological cognitive bias is primarily triggered?',
          options: [
            'Dunning-Kruger Effect',
            'Fluency Illusion (Recognition without Recall)',
            'Confirmation Bias',
            'Sunk Cost Fallacy'
          ],
          correctIndex: 1,
          explanation: 'Fluency illusion occurs when high readability tricks the brain into mistaking effortless comprehension for durable independent competence.'
        },
        {
          id: 'q-2',
          question: 'What is the primary difference between a junior prompt and an architect-grade Socratic prompt?',
          options: [
            'Junior prompts ask for answers; architect prompts ask for failure modes and critique of the engineer\'s draft.',
            'Architect prompts are 1,000 words longer.',
            'Junior prompts use smaller models.',
            'Architect prompts only request Python code.'
          ],
          correctIndex: 0,
          explanation: 'Architects force the model to stress-test their mental models and highlight blind spots rather than blindly delegating architectural decisions.'
        },
        {
          id: 'q-3',
          question: 'In the 4-Stage Active AI Protocol, what MUST happen before opening the AI chat window?',
          options: [
            'Install three new VS Code extensions.',
            'Write a 5-minute unassisted Cold Recall Draft on a blank page.',
            'Search GitHub issues.',
            'Read 10 medium blog posts.'
          ],
          correctIndex: 1,
          explanation: 'The unassisted Cold Recall Draft isolates the exact boundary where certainty breaks down, priming neural networks to retain the answer.'
        },
        {
          id: 'q-4',
          question: 'Why should software developers learn local-first offline tools like Ollama and Anki?',
          options: [
            'Because cloud servers are always shut down.',
            'To ensure cognitive and tooling capability remains intact when offline, without vendor lock-in.',
            'Because open-source models are always faster than frontier models.',
            'To save 5 dollars on cloud bills.'
          ],
          correctIndex: 1,
          explanation: 'Offline independence ensures deep conceptual retention and zero telemetry reliance for proprietary engineering.'
        },
        {
          id: 'q-5',
          question: 'What is the "Jargon Hunter" test designed to detect?',
          options: [
            'Grammar errors in your code comments.',
            'Hand-wavy filler words (like "basically" or "under the hood") used to disguise gaps in mechanical understanding.',
            'Unsupported TypeScript syntax.',
            'Slow HTTP response headers.'
          ],
          correctIndex: 1,
          explanation: 'Students frequently use technical jargon as a defense mechanism when they cannot describe what actually happens to pointers or memory at runtime.'
        }
      ],
      workflow: {
        id: 'wf-active-recall-ai',
        title: 'The 4-Stage Active AI Synthesis Protocol',
        estimatedTime: '25-35 minutes per concept',
        difficulty: 'Intermediate',
        prerequisites: ['Blank notepad or Excalidraw tab', 'Target concept or code problem'],
        steps: [
          {
            stepNumber: 1,
            title: 'The Silent Cold-Recall Draft',
            details: 'Close all AI tabs and documentation. Take 5 minutes to write down your understanding of the concept, including edge cases and a rough diagram, using only what is in your head.',
            proTip: 'Even if you only write two sentences, the failure to recall primes your brain to absorb the answer.'
          },
          {
            stepNumber: 2,
            title: 'Deploy the Socratic Sparring Prompt',
            details: 'Paste your cold-draft into your LLM using "The Jargon Hunter" prompt. Demand that the model attack your assumptions without rewriting the code.',
            proTip: 'If the model uses a word you cannot define on a whiteboard, stop and drill that word immediately.'
          },
          {
            stepNumber: 3,
            title: 'The Unprompted Feynman Defense',
            details: 'Close the chat window. Explain the concept out loud or in writing as if teaching a first-year student. If you hesitate, return to the gap.',
            proTip: 'Speaking out loud activates vocal motor cortex loops that solidify comprehension.'
          },
          {
            stepNumber: 4,
            title: 'Implement in Raw Code',
            details: 'Write a self-contained test case or minimal reproducing script in your IDE without copilot auto-complete turned on. Verify passing test runs.',
            codeOrCommand: 'node test-concept.mjs # Must execute with zero external boilerplate'
          }
        ]
      },
      problemAnalysis: {
        title: 'The Illusion of Competence',
        narrative: 'When an AI outputs an elegant explanation or code snippet in 3 seconds, your brain experiences fluency illusion: because the text is easily understood, your brain assumes it has mastered the concept. But recognition is not recall, and consumption is not execution.',
        comparisons: [
          {
            mistake: 'Prompting: "Write me a binary search tree in TypeScript with insert & delete."',
            reality: 'Prompting: "Quiz me on edge cases when deleting a node with two children in a BST. Do not give me code until I explain the pointer logic."'
          },
          {
            mistake: 'Copying code blocks directly into your editor without reading line-by-line.',
            reality: 'Typing every line by hand, deliberately asking: "Why did the model pick this data structure over an indexed map?"'
          },
          {
            mistake: 'Using AI to rewrite your bugged function before inspecting call stacks.',
            reality: 'Feeding only the error trace: "Explain what condition causes this boundary violation without writing the fix."'
          }
        ]
      },
      interactiveTool: {
        id: 'tool-reliance-audit',
        title: 'The AI Reliance Self-Audit & Feynman Gauge',
        description: 'Test whether you own your code or if AI owns your brain. Enter a technical concept you recently learned and diagnose your genuine retention level.',
        type: 'reliance-audit'
      },
      nextSteps: [
        {
          title: 'Try Playbook 01: Active-Recall AI Coding',
          link: '/playbooks',
          description: 'A complete step-by-step masterguide on turning every ChatGPT session into verifiable GitHub PRs.'
        },
        {
          title: 'Explore the Verified Tools Directory',
          link: '/tools',
          description: 'Handpicked, builder-tested utilities that prioritize privacy, local compute, and cognitive depth.'
        }
      ]
    }
  },
  {
    id: 'reel-01',
    slug: 'reel-01-browser-tabs',
    number: '01',
    title: 'The Illusion of 100 Browser Tabs',
    subtitle: 'Why bookmarking and tab hoarding is the enemy of building.',
    topic: 'Coding Workflows',
    difficulty: 'Beginner',
    timeToBuild: '15 mins',
    tags: ['Developer Workflow', 'Focus', 'Attention Economy', 'Building'],
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    publishedAt: 'Sep 2026',
    status: 'AVAILABLE',
    duration: '0:45',
    coreThesis: 'Hoarding browser tabs gives you the cheap dopamine hit of research without the uncomfortable commitment of execution.',
    editorialQuote: 'Tabs are postponed decisions. Close them and write three failing test cases instead.',
    hasInteractiveTool: false,
    sections: {
      intro: {
        synopsis: 'Why keeping 87 tabs open across three browser windows destroys working memory and stalls real software engineering.',
        context: 'Actionable protocols to transition from infinite passive reading into deliberate terminal execution.',
      },
      whatYoullBuild: 'A lightweight Single-Tab Terminal Protocol with a persistent scratch file architecture.',
      commonMistakes: [
        {
          mistake: 'Leaving 50 tabs open as "reading backlog".',
          reality: 'Creates micro-distractions and consumes 4GB of RAM without ever being read.',
          fix: 'Bookmark to an offline markdown file or discard immediately.'
        }
      ],
      flashcards: [
        {
          id: 'fc-r1-1',
          front: 'What psychological effect causes tab hoarding?',
          back: 'Open Loop Anxiety (Zeigarnik Effect). The brain holds active tension for unfinished research tasks.',
          hint: 'Unfinished tasks demand working memory.'
        }
      ],
      quiz: [
        {
          id: 'q-r1-1',
          question: 'What is the single most effective way to eliminate tab hoarding during development?',
          options: [
            'Buy a 49-inch curved monitor.',
            'Dump references into an offline scratch markdown note and close the browser.',
            'Use a tab suspender extension.',
            'Open more browser windows.'
          ],
          correctIndex: 1,
          explanation: 'Externalizing references into an active text file releases working memory loops.'
        }
      ],
      problemAnalysis: {
        title: 'Working Memory Fragmentation',
        narrative: 'Every open tab represents an unresolved open loop in your cognitive stack. High-leverage builders maintain extreme single-focus workspaces.',
        comparisons: [
          {
            mistake: 'Leaving 40 documentation tabs open "just in case"',
            reality: 'Pinning one official API reference and writing a scratch script in your terminal'
          }
        ]
      }
    }
  },
  {
    id: 'reel-03',
    slug: 'reel-03-what-to-learn-next',
    number: '03',
    title: "You're in Engineering: What Should You Learn Next?",
    subtitle: 'Stop collecting random tutorials. An evidence-based roadmap for your branch and semester.',
    topic: 'Engineering & CS',
    difficulty: 'Intermediate',
    timeToBuild: '20 mins',
    tags: ['Curriculum Roadmap', 'SRKR Engineering', 'Prerequisite Checks', 'Verifiable Builds'],
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    publishedAt: 'Oct 2026',
    status: 'AVAILABLE',
    duration: '0:58',
    coreThesis: 'Most engineering students fall into two traps: collecting tutorials without building, or jumping straight to advanced frameworks without foundational mental models. You need an explainable path: know where you are, what to learn next, what to build next, and how to verify readiness.',
    editorialQuote: 'A student who can write a memory-safe buffer in raw C and explain the stack is 10x more valuable than someone who prompted a React dashboard they cannot modify.',
    hasInteractiveTool: true,
    sections: {
      intro: {
        synopsis: 'Short-form Reel 03 broke down the reality: you ask seniors what to do and they say "learn MERN stack" or "learn AI". But if you do not understand pointers, OS threads, or circuit fundamentals, high-level tools will crumble. This resource connects your degree to verifiable skill milestones.',
        context: 'Built specifically for SRKR Engineering College (Autonomous) students across CSE, ECE, EEE, and Mechanical Engineering, crosswalked against R20 and R23 autonomous regulations.',
        scriptExcerpts: [
          "You're in engineering. What should you learn next?",
          "Everyone tells you to learn 5 different frameworks, 3 cloud certs, and 100 LeetCode problems.",
          "Stop collecting roadmaps from people who never built systems.",
          "Check where you are right now. Test your foundational prerequisites.",
          "Build observable projects that prove competence, not tutorial completions."
        ]
      },
      whatYoullBuild: 'A personalized semester action plan with tested prerequisite mental models, verifiable build milestones, and acceptance test commands.',
      commonMistakes: [
        {
          mistake: 'Following generic 4-year internet roadmaps that ignore your actual branch curriculum.',
          reality: 'Causes severe burnout and misalignment with college exams and practical engineering foundations.',
          fix: 'Use branch-specific roadmap crosswalks mapped to your autonomous syllabus (R20/R23).'
        },
        {
          mistake: 'Skipping foundational prerequisite checks (like C memory or basic circuit laws) to jump straight to AI.',
          reality: 'Creates fragile understanding where errors cannot be diagnosed without LLMs.',
          fix: 'Pass diagnostic gate checks. Complete recovery bridges before tackling advanced systems.'
        },
        {
          mistake: 'Assuming watching course videos equals mastery.',
          reality: 'Passive consumption triggers fluency illusion.',
          fix: 'Require observable build projects with testable commands before progressing.'
        }
      ],
      downloadableResource: {
        title: 'SRKR Autonomous Engineering Action Plan & Markdown Checklist',
        url: '/roadmap',
        type: 'Interactive Roadmap Tool',
        badge: 'Reel 03 Engine'
      },
      resources: [
        {
          id: 'res-srkr-roadmap',
          name: 'Motivation Code Engineering Roadmap Engine',
          category: 'Active Recall & Testing',
          url: '/roadmap',
          description: 'A 3-minute diagnostic engine tailored to SRKR autonomous curricula that tests mental models and outputs targeted build milestones.',
          pricing: 'Built-in Tool',
          isLocalOrBuiltIn: true,
          whyItMatters: 'Provides explainable next actions rather than overwhelming multi-year checklists.',
          limitations: 'Currently active for CSE, ECE, EEE, and ME.',
          verified: true,
          reelRef: 'Reel 03'
        },
        {
          id: 'res-nptel-hrd',
          name: 'NPTEL & SWAYAM Core Courses',
          category: 'Deep Reading & Research',
          url: 'https://nptel.ac.in/',
          description: 'IIT faculty-curated courses for discrete mathematics, algorithms, signals & systems, and thermodynamics.',
          pricing: 'Official Resource',
          whyItMatters: 'Strict mathematical depth and syllabus alignment with autonomous engineering regulations.',
          limitations: 'Requires high self-discipline to complete 12-week cycles.',
          verified: true,
          reelRef: 'Reel 03'
        },
        {
          id: 'res-beej-c',
          name: "Beej's Guide to C Programming & Network Sockets",
          category: 'Code Architecture',
          url: 'https://beej.us/guide/',
          description: 'The gold standard free textbook on memory allocation, pointers, and POSIX socket programming.',
          pricing: 'Free / Open-Source',
          whyItMatters: 'Explains exactly what the OS and CPU do without distracting abstractions.',
          limitations: 'Text-heavy; requires hands-on terminal practice.',
          verified: true,
          reelRef: 'Reel 03'
        }
      ],
      flashcards: [
        {
          id: 'fc-r3-1',
          front: 'What is a "Recovery Bridge" in engineering learning?',
          back: 'A targeted, short remediation module that repairs missing foundational concepts (e.g. C pointers or circuit theorems) before advancing.',
          hint: 'Repairing prerequisites before scaling.'
        },
        {
          id: 'fc-r3-2',
          front: 'Why should milestone completion require an observable build project?',
          back: 'Watching a video only builds passive recognition. Building an artifact with passing test cases proves cognitive retention and execution competence.',
          hint: 'Recognition vs. recall.'
        }
      ],
      quiz: [
        {
          id: 'q-r3-1',
          question: 'What is the most effective approach for a 2nd year engineering student with missing 1st year fundamentals?',
          options: [
            'Ignore the past and try to build a complex full-stack web application.',
            'Run a focused 2-week recovery bridge to master the foundational gap (e.g. C pointers or circuit laws) before advancing.',
            'Enroll in three new paid bootcamp certifications.',
            'Switch branches.'
          ],
          correctIndex: 1,
          explanation: 'Targeted recovery bridges restore the cognitive prerequisites necessary for durable higher-level reasoning.'
        },
        {
          id: 'q-r3-2',
          question: 'In the Motivation Code framework, how do you verify you are ready to progress to the next milestone?',
          options: [
            'By spending 20 hours watching video lectures.',
            'By passing observable competency criteria and executing verifiable build projects with tests.',
            'By getting 100% on an unproctored quiz.',
            'By asking an AI to write your lab record.'
          ],
          correctIndex: 1,
          explanation: 'Observable builds and unassisted explanation are the only reliable criteria of engineering readiness.'
        }
      ],
      problemAnalysis: {
        title: 'The Tutorial Collector Trap',
        narrative: 'Students amass bookmarks, roadmaps, and certifications, yet hesitate to write code or analyze a circuit without AI or a tutorial. True engineering readiness is built through disciplined prerequisite checks and verifiable hands-on execution.',
        comparisons: [
          {
            mistake: 'Downloading a 500-item GitHub roadmap and feeling overwhelmed',
            reality: 'Focusing on the next 1–3 high-yield actions tailored to your specific semester and branch'
          },
          {
            mistake: 'Assuming high GPA guarantees practical engineering capability',
            reality: 'Complementing curriculum courses with independent verifiable build artifacts'
          }
        ]
      },
      interactiveTool: {
        id: 'tool-engineering-roadmap',
        title: 'The 3-Minute Engineering Roadmap Diagnostic',
        description: 'Test your foundational mental models and get an explainable action plan for SRKR B.Tech curricula.',
        type: 'reliance-audit'
      },
      nextSteps: [
        {
          title: 'Take the 3-Minute Engineering Roadmap Diagnostic',
          link: '/roadmap',
          description: 'Personalized to your branch, regulation, and current semester with recovery bridges.'
        },
        {
          title: 'Explore the Socratic Prompt Desk',
          link: '/prompts',
          description: 'Force AI to interrogate your thinking rather than writing solutions for you.'
        }
      ]
    }
  },
  {
    id: 'reel-04',
    slug: 'reel-04-reading-docs',
    number: '04',
    title: 'How Senior Engineers Read Documentation',
    subtitle: 'Stop reading tutorials. Start understanding RFCs and specifications.',
    topic: 'Engineering & CS',
    difficulty: 'Advanced',
    timeToBuild: '30 mins',
    tags: ['Specifications', 'Systems Design', 'Documentation', 'Seniority'],
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    publishedAt: 'Upcoming',
    status: 'AVAILABLE',
    duration: '1:02',
    coreThesis: 'Tutorials teach you how someone else solved a problem yesterday. Documentation and source code teach you how the system actually behaves today.',
    editorialQuote: 'The best developers in the world do not google solutions. They read the source code and the RFC.',
    hasInteractiveTool: false,
    sections: {
      intro: {
        synopsis: 'A breakdown of the reading strategy used by staff engineers when approaching complex open-source frameworks.',
        context: 'How to navigate RFC specs, GitHub pull request discussions, and type definition files.',
      },
      whatYoullBuild: 'A source-diving workflow: inspect TypeScript .d.ts files and RFC specs to diagnose library edge cases.',
      flashcards: [
        {
          id: 'fc-r4-1',
          front: 'Where is the ground truth of any TypeScript library located?',
          back: 'Inside the node_modules/@types definition files and original exported source, not blog tutorials.',
          hint: 'Cmd+Click function definitions.'
        }
      ],
      quiz: [
        {
          id: 'q-r4-1',
          question: 'What is the fastest way to understand the invariant contracts of an open-source library?',
          options: [
            'Search random Medium tutorials.',
            'Inspect the exported TypeScript interfaces and unit test suite.',
            'Ask on Reddit.',
            'Wait for a YouTube course.'
          ],
          correctIndex: 1,
          explanation: 'Unit tests and type definitions explicitly document expected inputs, failure conditions, and intended design.'
        }
      ],
      problemAnalysis: {
        title: 'The Medium-Post Trap',
        narrative: 'Outdated blog posts create cargo-cult patterns. Learn to read TypeScript declarations and source implementations directly.',
        comparisons: [
          {
            mistake: 'Searching StackOverflow for outdated answers to framework bugs',
            reality: 'Cmd+Clicking the function definition in node_modules to read the exact implementation'
          }
        ]
      }
    }
  }
];

const learningReel = REELS_DATA[0];
learningReel.coreThesis = 'Getting an answer from AI is not the same as understanding it.';
learningReel.sections.intro.synopsis = 'Use AI to understand concepts, debug code, and build projects while keeping the thinking yours.';
learningReel.sections.intro.scriptExcerpts = undefined;
learningReel.sections.prompts = LEARNING_PROMPTS;
learningReel.sections.resources = LEARNING_TOOLS;
learningReel.sections.workflow = {id:'learning-workflow',title:'From question to capability',estimatedTime:'At your own pace',difficulty:'Beginner',prerequisites:['A topic or problem to explore'],steps:LEARNING_WORKFLOW.map(([title,details],i)=>({stepNumber:i+1,title,details}))};
export const reelsData = REELS_DATA;

