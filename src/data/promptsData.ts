import type { PromptItem } from '../types/content';
import { REELS_DATA } from './reelsData';

// Extract prompts from all reels
const reelPrompts: PromptItem[] = REELS_DATA.flatMap(reel => 
  (reel.sections.prompts || []).map(p => ({
    ...p,
    reelRef: `Reel #${reel.number}: ${reel.title}`
  }))
);

// Add dedicated vault prompts
export const VAULT_PROMPTS: PromptItem[] = [
  ...reelPrompts,
  {
    id: 'vault-01',
    title: 'Zero-Hallucination Type Contract Enforcer',
    purpose: 'Forces LLMs to declare strict TypeScript types & interfaces before writing any runtime logic.',
    targetModel: 'Claude 3.7 / GPT-4o / DeepSeek R1',
    variables: ['[FEATURE_REQUIREMENTS]', '[DOMAIN]'],
    promptText: `Act as a Staff Systems Architect.
Given these domain requirements for [DOMAIN]:
"""
[FEATURE_REQUIREMENTS]
"""

Output ONLY the exact TypeScript type definitions, interfaces, domain error union types, and pure function signatures.
Rules:
1. No \`any\` or unconstrained \`unknown\` types.
2. Every error condition must be represented in a Discriminated Union.
3. DO NOT write the function implementations yet (use \`throw new Error("unimplemented")\`).
Explain the domain boundaries after the types.`,
    explanation: 'Types act as algebraic bounds, constraining the token search space and preventing 90% of business logic hallucinations.',
    category: 'Architecture & Types',
    reelRef: 'Vault Architecture'
  },
  {
    id: 'vault-02',
    title: 'Root-Cause Exception Callstack Investigator',
    purpose: 'Stops you from asking "fix this bug" and guides you through understanding why the runtime state failed.',
    targetModel: 'Any Frontier LLM',
    variables: ['[EXCEPTION_LOG]', '[SURROUNDING_CODE]'],
    promptText: `Here is a runtime exception trace:
"""
[EXCEPTION_LOG]
"""

Surrounding context:
"""
[SURROUNDING_CODE]
"""

DO NOT provide the corrected code.
Explain:
1. The exact sequence of runtime call frames leading to the illegal state.
2. Which variable assumed a value that violated the function precondition?
3. Ask me 1 targeted question to verify whether my database query or state transition caused the invalid state.`,
    explanation: 'Trains developers to think along call stacks and memory invariants instead of blindly patching symptoms.',
    category: 'Debugging & RCA',
    reelRef: 'Vault Debugging'
  },
  {
    id: 'vault-03',
    title: '100x Scaling Bottleneck Pressure-Tester',
    purpose: 'Exposes database index locks, memory leaks, and concurrency hazards in your current architecture.',
    targetModel: 'Claude 3.7 Sonnet / DeepSeek R1',
    variables: ['[API_OR_DATABASE_SCHEMA]', '[TRAFFIC_PROFILE]'],
    promptText: `Analyze this endpoint architecture:
"""
[API_OR_DATABASE_SCHEMA]
"""

Current traffic is baseline, but will scale by 100x ([TRAFFIC_PROFILE]).
List the top 3 single points of failure:
1. Database contention (locks, connection pool exhaustion, N+1 queries).
2. Memory footprint or event loop blocking.
3. Cache invalidation race conditions.
For each bottleneck, describe the symptom and ask me how I plan to decouple it. Do not solve it for me.`,
    explanation: 'Instills senior architectural defense and system sizing discipline.',
    category: 'Performance & Scale',
    reelRef: 'Vault Architecture'
  }
];

export const promptsData = VAULT_PROMPTS;

