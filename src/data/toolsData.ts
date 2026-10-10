import { LEARNING_TOOLS } from './learningData';
import type { ResourceItem } from '../types/content';

export const TOOLS_DATA: ResourceItem[] = [
  ...LEARNING_TOOLS,
  {
    id: 'tool-socratic-sparring',
    name: 'Socratic Sparring System Prompt',
    category: 'Active Recall & Testing',
    url: '/reels/reel-02-ai-usage#prompts-section',
    description: 'A purpose-tuned system prompt designed to convert any frontier LLM into a rigorous oral examiner that refuses to give answers and forces deep technical reasoning.',
    pricing: 'Built-in Tool',
    isLocalOrBuiltIn: true,
    whyItMatters: 'Use questions to check what you understand before interviews or exams.',
    limitations: 'Requires user discipline; slower than asking for direct answers.',
    verified: false,
    reelRef: 'Reel 02'
  },
  {
    id: 'tool-ollama',
    name: 'Ollama — Local LLM Runner',
    category: 'Local AI & Dev',
    url: 'https://ollama.com/',
    description: 'Get up and running with Llama 3, Mistral, Qwen 2.5 Coder, and DeepSeek locally on macOS, Linux, and Windows via a simple CLI.',
    pricing: 'Official Resource',
    whyItMatters: 'Run supported models on your own machine. Performance and privacy depend on your model and configuration.',
    limitations: 'Requires minimum 8GB RAM for 7B/8B models; large parameter models require dedicated Apple Silicon or GPU compute.',
    verified: false,
    reelRef: 'Reel 02'
  },
  {
    id: 'tool-bruno',
    name: 'Bruno — Offline-First Git-Friendly API Client',
    category: 'Local AI & Dev',
    url: 'https://www.usebruno.com/',
    description: 'A modern, fast open-source desktop API client that saves request collections directly in plain text files in your Git repository.',
    pricing: 'Official Resource',
    whyItMatters: 'Unlike Postman or Insomnia, it does not mandate cloud synchronization or expose sensitive development API tokens.',
    limitations: 'GUI is focused purely on REST/GraphQL; not designed for heavy synthetic load testing.',
    verified: false,
    reelRef: 'Reel 03'
  },
  {
    id: 'tool-anki',
    name: 'Anki — Spaced Repetition Engine',
    category: 'Active Recall & Testing',
    url: 'https://apps.ankiweb.net/',
    description: 'The golden standard of spaced repetition software. Retain algorithms, systems design principles, and syntax cold without prompts.',
    pricing: 'Official Resource',
    whyItMatters: 'Forces high-yield active recall algorithms (SM-2 / FSRS) to prevent forgetting curves.',
    limitations: 'Desktop UI is utilitarian; creating effective flashcards requires upfront synthesis.',
    verified: false,
    reelRef: 'Reel 02'
  },
  {
    id: 'tool-excalidraw',
    name: 'Excalidraw',
    category: 'Code Architecture',
    url: 'https://excalidraw.com/',
    description: 'Virtual collaborative whiteboard tool that lets you sketch diagrams with a hand-drawn aesthetic.',
    pricing: 'Official Resource',
    whyItMatters: 'Diagramming data structures and microservice boundary lines before code prevents prompt hallucinations.',
    limitations: 'Free web version uses browser local storage unless hosted or integrated with Obsidian.',
    verified: false,
    reelRef: 'Reel 02'
  },
  {
    id: 'tool-obsidian',
    name: 'Obsidian — Second Brain Markdown Graph',
    category: 'Deep Reading & Research',
    url: 'https://obsidian.md/',
    description: 'A powerful, local-first knowledge base that sits on top of a local folder of plain Markdown files with bidirectional linking.',
    pricing: 'Official Resource',
    whyItMatters: 'Own your notes completely. Connect engineering concepts across time with zero vendor lock-in.',
    limitations: 'End-to-end sync across mobile requires iCloud or optional paid Obsidian Sync service.',
    verified: false,
    reelRef: 'Reel 01'
  },
  {
    id: 'tool-bundlephobia',
    name: 'Bundlephobia',
    category: 'Code Architecture',
    url: 'https://bundlephobia.com/',
    description: 'Inspect the performance cost, minified byte size, and tree-shakeability of any npm package before installing.',
    pricing: 'Official Resource',
    whyItMatters: 'Prevents dependency bloat and keeps frontend bundles lightweight.',
    limitations: 'Analyzes client-side JavaScript packages; not applicable for backend-only native binary modules.',
    verified: false,
    reelRef: 'Reel 04'
  },
  {
    id: 'tool-remotion',
    name: 'Remotion — Code-Driven Video Creation',
    category: 'Code Architecture',
    url: 'https://www.remotion.dev/',
    description: 'Create videos programmatically using React, TypeScript, CSS, and modern browser APIs rendered via Chromium & FFmpeg.',
    pricing: 'Official Resource',
    whyItMatters: 'Allows scalable, pixel-perfect motion graphics, typography synchronisation, and reproducible video pipelines.',
    limitations: 'Requires React and TypeScript knowledge; heavier render pipeline than pre-rendered video editors.',
    verified: false,
    reelRef: 'Reel 01'
  }
];

export const toolsData = TOOLS_DATA;

