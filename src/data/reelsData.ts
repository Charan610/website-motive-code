import type { ReelItem } from '../types/content';

export const REELS_DATA: ReelItem[] = [
  {
    id: 'reel-02',
    slug: 'reel-02-ai-usage',
    number: '02',
    title: "You're Using AI Wrong",
    subtitle: 'Stop collecting answers. Start building mental models.',
    topic: 'AI & LLMs',
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
      // Note: Configurable resources area ready for specific additions
      resources: [
        {
          id: 'res-socratic-prompt',
          name: 'The Socratic Sparring System Prompt',
          category: 'Active Recall & Testing',
          url: '#prompts-section',
          description: 'A tuned system prompt that forces LLMs to reject giving direct solutions, interrogating your mental gaps instead.',
          pricing: 'Free / Open-Source',
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
          explanation: 'Reverses the dynamic from passive information consumption to active retrieval, strengthening synaptic pathways through cognitive friction.'
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
          explanation: 'Detects the "Illusion of Explanatory Depth" before an exam or job interview uncovers it.'
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
          explanation: 'Instills architectural skepticism — the core trait distinguishing senior builders from prompt-copying students.'
        }
      ],
      workflow: {
        id: 'wf-active-recall-ai',
        title: 'The 4-Stage Active AI Synthesis Protocol',
        estimatedTime: '25-35 minutes per concept',
        difficulty: 'Foundational',
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
    slug: 'reel-03-finishing-projects',
    number: '03',
    title: 'Why Your Side Projects Never Get Finished',
    subtitle: 'The graveyard of half-built repos and how to ship to real users.',
    topic: 'Builder Mindset',
    tags: ['Shipping', 'Scope Creep', 'SaaS Architecture', 'Junior Engineers'],
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    publishedAt: 'Upcoming',
    status: 'COMING_NEXT',
    duration: '0:52',
    coreThesis: 'You abandon projects at 80% because finishing requires dealing with unglamorous things: auth edge cases, error states, and real user feedback.',
    editorialQuote: 'A simple working CRUD deployed on Vercel beats an ambitious unfinished microservice architecture every single day.',
    hasInteractiveTool: false,
    sections: {
      intro: {
        synopsis: 'The architectural anti-patterns that cause developers to redesign and rewrite their side projects instead of pushing to production.',
        context: 'Production-ready frameworks to cut scope by 70% and deploy within 48 hours.',
      },
      problemAnalysis: {
        title: 'Scope Creep as a Psychological Defense',
        narrative: 'When we fear judgment on our software, we add more features to delay launching. True builders ship minimal, uncomfortably early prototypes.',
        comparisons: [
          {
            mistake: 'Adding payment tiers and complex roles before anyone has visited the homepage',
            reality: 'Deploying a 1-page utility that solves one person’s headache today'
          }
        ]
      }
    }
  },
  {
    id: 'reel-04',
    slug: 'reel-04-reading-docs',
    number: '04',
    title: 'How Senior Engineers Read Documentation',
    subtitle: 'Stop reading tutorials. Start understanding RFCs and specifications.',
    topic: 'Engineering & CS',
    tags: ['Specifications', 'Systems Design', 'Documentation', 'Seniority'],
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    publishedAt: 'Upcoming',
    status: 'COMING_NEXT',
    duration: '1:02',
    coreThesis: 'Tutorials teach you how someone else solved a problem yesterday. Documentation and source code teach you how the system actually behaves today.',
    editorialQuote: 'The best developers in the world do not google solutions. They read the source code and the RFC.',
    hasInteractiveTool: false,
    sections: {
      intro: {
        synopsis: 'A breakdown of the reading strategy used by staff engineers when approaching complex open-source frameworks.',
        context: 'How to navigate RFC specs, GitHub pull request discussions, and type definition files.',
      },
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
