# Motivation Code — Content-to-Action Platform

**Live Production URL:** [https://website-motive-code.vercel.app](https://website-motive-code.vercel.app)

Motivation Code turns Instagram Reels into actionable software engineering competence. When a viewer watches a reel, they arrive here to get:
1. **The Step-by-Step Workflow** behind the reel.
2. **Verified Builder Tools** (no sponsored noise).
3. **Copyable Socratic Prompts** with instant clipboard feedback.
4. **An Active-Recall Playbook** (3D flip flashcards and 5-question quizzes per reel) so knowledge becomes permanent.

---

## ⚡ How to Add a New Reel in 2 Minutes (Zero Code Changes)

All content is strictly typed in [`src/data/reelsData.ts`](./src/data/reelsData.ts). Adding a new reel requires **zero component modifications, zero routing changes, and zero CSS edits**.

### Step 1: Open `src/data/reelsData.ts`
Append a new entry to the `REELS_DATA` array:

```ts
{
  id: 'reel-05',
  slug: 'reel-05-your-topic-slug',
  number: '05',
  title: 'Your Reel Title Here',
  subtitle: 'A punchy one-sentence subtitle explaining the practical takeaway.',
  topic: 'AI & LLMs', // 'AI & LLMs' | 'Engineering & CS' | 'Coding Workflows' | 'Builder Mindset'
  difficulty: 'Intermediate', // 'Beginner' | 'Intermediate' | 'Advanced'
  timeToBuild: '20 mins',
  tags: ['Prompting', 'Local AI', 'Architecture'],
  thumbnail: 'https://images.unsplash.com/your-image?auto=format&fit=crop&w=1200&q=80',
  publishedAt: 'Oct 2026',
  status: 'AVAILABLE', // 'AVAILABLE' | 'COMING_NEXT'
  duration: '0:55',
  coreThesis: 'State the core engineering principle tested in this video.',
  editorialQuote: 'The key quote highlighting the mental shift.',
  hasInteractiveTool: false,
  sections: {
    intro: {
      synopsis: 'Short summary of the reel.',
      scriptExcerpts: [
        'Hook from the video transcript',
        'Key insight statement'
      ],
      context: 'Why this matters for your engineering career.'
    },
    whatYoullBuild: 'A minimal reproducible test script verifying the concept offline.',
    problemAnalysis: {
      title: 'The Surface-Level Trap',
      narrative: 'Why most people fail when learning this concept.',
      comparisons: [
        {
          mistake: 'Junior assumption or passive habit',
          reality: 'Senior architectural reality or Socratic drill'
        }
      ]
    },
    commonMistakes: [
      {
        mistake: 'Leaving default timeout on API calls',
        reality: 'Causes hanging promises and silent memory leak',
        fix: 'Wrap inside an AbortController signal with 8000ms threshold.'
      }
    ],
    flashcards: [
      {
        id: 'fc-r5-1',
        front: 'What is the primary constraint when configuring this architecture?',
        back: 'The database connection pool limit and transaction lock timeouts.',
        hint: 'Think about database connection exhaustion.'
      }
    ],
    quiz: [
      {
        id: 'q-r5-1',
        question: 'Which method guarantees zero token leakage to third parties?',
        options: [
          'Sending encrypted headers over HTTPS',
          'Running a local open-weight model with Ollama completely offline',
          'Using private browsing mode',
          'Clearing the browser cache'
        ],
        correctIndex: 1,
        explanation: 'Local models running on local hardware never transmit prompt tokens across public networks.'
      }
    ],
    workflow: {
      id: 'wf-reel-05',
      title: 'Execution Timeline',
      estimatedTime: '20 minutes',
      difficulty: 'Intermediate',
      prerequisites: ['Node.js or Python installed', 'Terminal'],
      steps: [
        {
          stepNumber: 1,
          title: 'Setup & Cold Recall',
          details: 'Draft your solution unassisted for 5 minutes before opening any docs.',
          proTip: 'Struggling to recall primes your neural pathways.'
        }
      ]
    }
  }
}
```

### Step 2: Verify & Deploy
```bash
npm run build
git add src/data/reelsData.ts
git commit -m "feat: add Reel #05"
git push origin main
```
The new reel instantly surfaces on:
- **Homepage "Came from a reel?" Quick-Entry Jump Box**
- **The Reels Library** (`/reels`) with difficulty and topic filtering
- **Dedicated Hub URL** (`/reels/reel-05-your-topic-slug`)
- **Global ⌘K Command Palette** search index
- **Active Recall Playbook & Progress Dashboard**

---

## 🎨 Design System & Tokens

- **Base Background:** `#06080D` (Layered surfaces: `#0D1117`, `#131923`, `#1A2230`).
- **Primary Accent:** `#FF5E1E` (Warm terracotta/orange).
- **Secondary Technical Accent:** `#00E5FF` (High-contrast cyan).
- **Typography Scale:** Fluid responsive scale with `clamp()` tracking on headings.
- **Motion Curve:** `cubic-bezier(0.22, 1, 0.36, 1)` (spring physics with `prefers-reduced-motion` compliance).
- **Local Persistence:** Zero-login localStorage persistence for active streaks, completed workflows, and recall quiz mastery.

---

## 🛠 Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Vanilla CSS design tokens (`src/index.css` & `src/styles/components.css`)
- **Routing:** React Router DOM v7
- **Deployment:** Vercel Production
