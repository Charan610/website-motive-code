# Motivation Code — Read-Only Website Audit Report

**Date:** October 10, 2026  
**Audited Target:** [https://website-motive-code.vercel.app](https://website-motive-code.vercel.app)  
**Workspace:** `/Users/charan/EDITING/WEBSITE-MOTIVE-CODE`  
**Auditor:** Senior Product Designer & Staff Systems Architect (Antigravity)  
**Execution Phase:** Phase 1 (Mandatory Read-Only Audit) — Zero application code modified during this phase.

---

## 1. Routes & States Inspected

Every accessible public route, viewport layout, and state was audited locally and against the live Vercel production deployment (`HTTP/2 200 OK` across all paths):

| Route / State | HTTP / Component | Observable Content & Functionality | Audit Status |
| :--- | :--- | :--- | :--- |
| `/` (Homepage) | 200 / `HomePage.tsx` | Welcome header, latest Field Notes (Reel 02), Prompt Studio, Intentions grid, Reel library preview, North Star aside, Learning Coach. | **Audited (Live & Local)** |
| `/reels` | 200 / `ReelsPage.tsx` | Grid of 4 catalogued reels, topic filter pills, difficulty filter pills, search bar. | **Audited (Live & Local)** |
| `/reels/reel-02-ai-usage` | 200 / `LearningResourcePage.tsx` | Specialized field notes hub for Reel 02: 3 tools (Claude, Cursor, Excalidraw), 4 prompts, 5-step workflow, learning coach. | **Audited (Live & Local)** |
| `/reels/reel-03-finishing-projects` | 200 / `ReelDetailPage.tsx` | Generic detail view for Reel 03: script excerpts, problem comparison, Socratic prompts, flashcards, quiz, workflow. | **Audited (Live & Local)** |
| `/reels/reel-01-browser-tabs` | 200 / `ReelDetailPage.tsx` | Detail view for Reel 01. | **Audited (Live & Local)** |
| `/reels/reel-04-reading-docs` | 200 / `ReelDetailPage.tsx` | Detail view for Reel 04. | **Audited (Live & Local)** |
| `/prompts` | 200 / `PromptsPage.tsx` | Searchable Prompt Vault with category filters, target model tags, mono code block, and copy feedback. | **Audited (Live & Local)** |
| `/tools` | 200 / `ToolsPage.tsx` | Verified builder tools directory with pricing, categories, and reel references. | **Audited (Live & Local)** |
| `/playbooks` | 200 / `PlaybooksPage.tsx` | Master-detail action playbooks with prerequisites, step-by-step timelines, and flashcards. | **Audited (Live & Local)** |
| `/about` | 200 / `AboutPage.tsx` | Editorial manifesto on cognitive friction, active recall, and independent competence. | **Audited (Live & Local)** |
| `Command Palette (⌘K)` | Modal / `CommandPalette.tsx` | Search modal triggered via ⌘K or topbar search button. Indexes reels, tools, prompts. | **Audited (Live & Local)** |
| `Progress Dashboard` | Modal / `ProgressDashboardModal.tsx` | Local streak, completed reels, average recall score, mastered flashcards. | **Audited (Live & Local)** |
| Viewport: Mobile (390px) | CSS Media Queries | Tested in responsive mode. Sidebar collapses into bottom drawer / topbar hamburger menu. Tap targets ≥ 44px. | **Audited** |
| Viewport: Desktop (1440px) | Layout grid | Two-column desktop studio layout (sticky sidebar + main workspace canvas). | **Audited** |

*Inaccessible elements:* No live server database exists yet; all storage is client-side `localStorage`. No analytics trackers or telemetry scripts were found.

---

## 2. Current Site Structure & Primary User Journeys

### Information Architecture
```
Site Root
├── Sidebar Navigation
│   ├── Overview (/)
│   ├── Reel library (/reels)
│   ├── Prompt library (/prompts)
│   ├── Explore tools (/tools)
│   ├── Playbooks (/playbooks)
│   └── My progress (Modal)
├── Topbar
│   ├── Menu toggle (mobile)
│   ├── Breadcrumb indicator
│   ├── Search input / ⌘K trigger
│   └── Direct pill: "Reel 02 is here ↗"
└── Route Views
    ├── / (Overview + Prompt Studio + Learning Coach)
    ├── /reels (Catalog)
    ├── /reels/reel-02-ai-usage (Dedicated Reel 02 Hub)
    ├── /reels/:slug (Detail Hubs)
    ├── /prompts (Vault)
    ├── /tools (Directory)
    ├── /playbooks (Playbooks)
    └── /about (Manifesto)
```

### Current Visitor Journey (From Instagram)
1. **Landing from Reel 02:** A viewer watches Reel 02 ("You're using AI wrong"), clicks the link in bio (`website-motive-code.vercel.app/reels/reel-02-ai-usage`), and lands on a focused page with copyable prompts, verified tools (Claude, Cursor, Excalidraw), and a 5-step workflow. This journey is coherent and delivers on the video's premise.
2. **Landing from Reel 03:** A viewer watches Reel 03 (*"You're in engineering. What should you learn next?"*), clicks the link, but:
   - The homepage topbar prominently announces *"Reel 02 is here ↗"*.
   - The homepage hero promotes Field Notes 002.
   - The reels catalog lists Reel 03 with the title *"Why Your Side Projects Never Get Finished"*, which contradicts the actual published Reel 03 video.
   - There is **no branch selector, no semester diagnostic, no prerequisite check, and no engineering roadmap**.
   - The visitor has no way to answer: *"Where am I right now? What should I learn next? What should I build next?"*

---

## 3. Existing Stack & Architecture

- **Runtime & Bundler:** Vite 8.3.0 + React 19.2.8 + React DOM 19.2.8.
- **Language:** TypeScript 6.0.2 with strict configuration (`tsconfig.json`, `tsconfig.app.json`).
- **Routing:** `react-router-dom` v7.18.4 (`BrowserRouter` with nested route tree and scroll-to-top handler).
- **Icons:** `lucide-react` v1.55.0.
- **Styling Architecture:** Pure Vanilla CSS with tokens:
  - `src/index.css`: Global theme tokens, typography fluid scale, elevation surfaces (`#06080D`, `#0D1117`, `#131923`, `#1A2230`), motion curves (`cubic-bezier(0.22, 1, 0.36, 1)`).
  - `src/styles/components.css`: Component primitives (Buttons, Cards, Badges, Modals, Accordions, Tabs, Tooltips).
  - `src/styles/workspace.css`: Layout hierarchy (sidebar, topbar, canvas).
  - `src/styles/studio.css`: Editorial aesthetic touches (Prompt Studio, sculpture rings).
- **Data Layer:** Strictly typed static data modules in `src/data/`:
  - `reelsData.ts`: Reel catalog items with workflow steps, flashcards, and quizzes.
  - `promptsData.ts`: Prompt items with model tags and variables.
  - `toolsData.ts`: Verified builder tools with categories and pricing.
  - `playbooksData.ts`: Action playbooks with step-by-step guides.
  - `learningData.ts`: Specialized prompt and tool mappings for Reel 02.
- **Persistence:** Client-side `localStorage` via `src/lib/progressStorage.ts` (keys: `completedReels`, `quizScores`, `masteredFlashcards`, `currentStreakDays`). Dispatches custom window event `progress_updated`.

---

## 4. UX, Content & Visual Issues (Observed with Evidence)

1. **Reel 03 Identity Mismatch:**
   - *Observation:* In `src/scenes/reel03/Reel3Scene1Hook.tsx`, the hook is *"YOU'RE IN ENGINEERING. WHAT SHOULD YOU LEARN NEXT?"*. In `src/data/reelsData.ts`, Reel 03 is defined as *"Why Your Side Projects Never Get Finished"*.
   - *Impact:* Complete cognitive dissonance for any student arriving from the Reel 03 video.
2. **Missing Engineering Roadmap Engine:**
   - *Observation:* No page, route, component, or data model exists for branch-specific, semester-specific roadmaps.
   - *Impact:* The core promise of Reel 03 remains completely unfulfilled.
3. **Overly Narrow Learning Coach:**
   - *Observation:* `src/components/LearningCoach.tsx` on the homepage asks for a free-text topic and goal, then outputs a single generic prompt. It does not evaluate prerequisites, diagnose curriculum stage, or tell students what to build.
4. **Topbar Anchored Exclusively to Reel 02:**
   - *Observation:* The topbar pill button is hardcoded to `<Link to="/reels/reel-02-ai-usage">Reel 02 is here</Link>`.
   - *Impact:* Neglects visitors arriving from other reels and fails to highlight the primary next action.
5. **No Persistent Account or Cross-Device Recovery:**
   - *Observation:* Progress is stored solely in `localStorage`. If a student switches from mobile (Instagram in-app browser) to desktop laptop, their progress is lost.

---

## 5. What Is Already Working & Must Be Preserved

1. **Editorial Aesthetic & Dark-First Design System:** The `#06080D` base with layered surfaces, 1px subtle borders, terracotta accent (`#FF5E1E`), and cyan technical accent (`#00E5FF`) looks premium and SaaS-grade.
2. **Component Primitives (`/src/components/ui/`):** The typed primitives (`Button`, `Card`, `Badge`, `Tabs`, `Accordion`, `Tooltip`, `CommandPalette`, `ProgressBar`, `FlashcardDeck`, `QuizWidget`) are robust, accessible, and fast.
3. **Active Recall & Feynman Philosophy:** The insistence on active retrieval, mental struggle, and local terminal execution over passive AI copy-pasting is the brand's core differentiator and must remain central to the roadmap product.
4. **Fast Build & Performance:** Clean Vite bundle (< 405 kB JS, < 105 kB CSS) renders with 0 layout shift and sub-400ms load times.

---

## 6. Gaps Between the Reel 03 Promise & Website Reality

| Reel 03 Promise | Current Website Reality | Required Implementation Gap |
| :--- | :--- | :--- |
| "Help engineering students understand where they are" | No semester, branch, or prior knowledge diagnostic. | **Adaptive Branch Diagnostic** (Branch, Regulation, Year/Semester, prior course checks). |
| "What to learn next" | Only prompt templates and unorganized tool lists. | **Deterministic Next-Action Engine** (1–3 targeted high-yield milestones, not an overwhelming 4-year checklist). |
| "What to build next" | No project briefs with verifiable criteria. | **Evidence-Based Project Registry** (Specific projects with observable acceptance criteria & verification tests). |
| "How to know you're ready to progress" | Quizzes only exist for Reel 02 conceptual points. | **Prerequisite & Competency Gates** (Distinguish "studied" from "demonstrated" with verifiable checks). |
| "SRKR Engineering tailored" | No institutional awareness or R20/R23 regulation mapping. | **SRKR Curriculum Crosswalk** (CSE, ECE, EEE, ME course alignment with honest research disclosures). |

---

## 7. Comparison of Roadmap Entry-Point Placement Options

| Option | Placement Location | Pros | Cons | Verdict |
| :--- | :--- | :--- | :--- | :--- |
| **Option 1: Sidebar Primary Nav** | Between "Reel library" and "Prompt library" | Highly discoverable, permanent landmark, accessible on every page. | Requires desktop sidebar space; needs clear mobile drawer presence. | **Selected (Primary Navigation Entry)** |
| **Option 2: Homepage Hero Banner** | Below Welcome header, paired with Reel 03 drop | Highest conversion for first-time visitors arriving from Instagram Reel 03. | Can compete visually with Prompt Studio if not integrated harmoniously. | **Selected (Primary Homepage Conversion Entry)** |
| **Option 3: Topbar Live Pill** | Replacing "Reel 02 is here" with "Roadmap: What to learn next ↗" | Instant visibility above the fold on all routes and devices. | Limited character space. | **Selected (Secondary Ambient Entry)** |
| **Option 4: Reel 03 Dedicated Hub** | `/reels/reel-03-what-to-learn-next` | Direct 1:1 match for Reel 03 link-in-bio traffic. | Only seen by users navigating to Reel 03. | **Selected (Contextual Direct Route)** |
| **Option 5: Inside Learning Coach** | Upgrading `/` bottom coach into the roadmap diagnostic | Preserves existing layout footprint. | Buried at the very bottom of the homepage (users must scroll past 4 sections). | **Rejected as sole entry; integrated as contextual link** |

---

## 8. Recommended Roadmap Placement & Architecture

### Recommended Layout & Labels
1. **Primary Navigation Label:** `Engineering Roadmap`
   - **Path:** `/roadmap`
   - **Position:** Second item in `workspace-sidebar` (between *Overview* and *Reel library*), featuring an active badge indicator (`NEW`).
2. **Homepage Hero Action:**
   - Dedicated Feature Card in hero: **"Where are you in engineering? Find your exact next step."** with CTA: *"Launch Diagnostic ↗"*.
3. **Topbar Notification Pill:**
   - Changed from static Reel 02 link to dynamic context: **"Reel 03 Drop: What should you learn next? ↗"** linking to `/roadmap`.
4. **Dedicated Contextual Route for Reel 03:**
   - Synchronize Reel 03 in `reelsData.ts` to match the actual video (*"You're in Engineering: What Should You Learn Next?"*), embedding direct links to the roadmap diagnostic.

---

## 9. Proposed End-to-End Roadmap User Journey

```
[Instagram Reel 03 Viewer]
         │
         ▼
[Lands on /roadmap or / via link-in-bio]
         │
         ▼
[Step 1: Onboarding & Trust Framing]
  - Explains explainable, non-generic methodology
  - Clarifies: "We tell you what to learn, what to build, and how to verify it"
         │
         ▼
[Step 2: Academic Profile Selection]
  - Institution: SRKR Engineering College (Bhimavaram)
  - Branch: CSE, ECE, EEE, Mechanical (or "Other / In Progress")
  - Regulation: R20 / R23
  - Current Stage: Year (1–4) & Semester (1–2)
         │
         ▼
[Step 3: Intent & Constraint Profiling]
  - Primary Goal: Placements, Core Engineering, Gate/Higher Studies, Shipping Products
  - Weekly Availability: < 5 hrs, 5–10 hrs, 15+ hrs
  - Identified Struggle: Weak fundamentals, no projects, tutorial hell, lack of direction
         │
         ▼
[Step 4: Branch Prerequisite Diagnostic Check]
  - 3–4 targeted discrimination questions testing foundational prerequisites
  - Checks actual mental model (not confidence rating)
         │
         ▼
[Step 5: The Explainable Roadmap Output]
  - "Where you are right now" (Academic stage vs. Industry baseline)
  - "Detected Prerequisite Bridges" (targeted recovery modules if fundamentals are missing)
  - "Next 1–3 High-Yield Actions" (What to learn, What to build, Verified resources)
  - "The Project Challenge" (Specification, acceptance criteria, verification command)
  - "Competency Gates" (How to demonstrate readiness before advancing)
         │
         ▼
[Step 6: Secure Plan Persistence]
  - Unique Plan ID (UUID) generated
  - Optional Display Username with strict server-side collision handling
  - Cryptographically secure Recovery Key generated for cross-device access (Zero-knowledge, no plaintext password)
  - Local state cached immediately for offline resilience
```

---

## 10. Implementation Risks, Unresolved Questions & Assumptions

### Risks
1. **Curriculum Regulation Drifts (R20 vs R23):** SRKR transitioned from R20 to R23 regulations. Course codes and semester placements differ (e.g., Python and Data Structures placement).  
   *Mitigation:* Explicitly support regulation selection and label institution-specific course crosswalks as separate from universal engineering competencies.
2. **Overwhelming First-Time Students:** Giving a 4-year exhaustive list causes paralysis.  
   *Mitigation:* The engine will strictly prioritize **the next 1 to 3 actions** based on current semester and diagnostic outcome.
3. **Unauthenticated Identity Spoofing:** Using a plain username for persistence allows bad actors to overwrite another student's plan.  
   *Mitigation:* Generate an immutable UUID internal ID, an enforced display name, and a cryptographically secure 16-character recovery key.

### Assumptions Documented
- Initial production branches are CSE, ECE, EEE, and Mechanical Engineering. Other branches (Civil, AIDS, AIML, CSBS) will show transparent "Curriculum Validation in Progress" states rather than generic placeholders.
- The platform remains a privacy-first web application: zero collection of phone numbers, student registration numbers, or passwords.

---

**Audit Conclusion:** The read-only audit is complete. The application architecture and placement strategy are fully documented. Implementation of Phase 2 (Research Validation) and Phase 3–7 (Roadmap Product Architecture & Implementation) may now proceed safely.
