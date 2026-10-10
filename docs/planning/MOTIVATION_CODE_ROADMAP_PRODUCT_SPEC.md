# Motivation Code — Personalized Engineering Roadmap Product Specification

**Document Version:** 1.0.0  
**Status:** Approved for Implementation  
**Product Mission:** Deliver on the Reel 03 promise: *"Help engineering students understand where they are, what to learn next, what to build next, and how to demonstrate progress."*

---

## 1. Product Architecture

The roadmap product is architected as an **explainable, evidence-informed recommendation engine** rather than a generic checklist. It operates across 4 core layers:

```
┌────────────────────────────────────────────────────────┐
│  1. Academic Context Layer (SRKR R20/R23 Curriculum)   │
│     - Branch (CSE, ECE, EEE, ME)                       │
│     - Semester (Sem 1 to Sem 8)                        │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│  2. Diagnostic & Prerequisite Verification Layer       │
│     - Goal & Time Constraints                          │
│     - Discriminative Prerequisite Checks (Mental Model)│
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│  3. Deterministic Decision Engine                      │
│     - Prerequisite Gap Detection -> Bridge Action      │
│     - Next 1–3 High-Yield Action Recommendations       │
│     - Practical Project Milestone & Acceptance Tests   │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│  4. Secure Persistence & Recovery Layer                │
│     - Immutable UUID + Collision-Free Display Name     │
│     - Cryptographic Recovery Key (MC-XXXX-XXXX-XXXX)   │
│     - Local Offline Cache + Cross-Device Restore       │
└────────────────────────────────────────────────────────┘
```

---

## 2. Screen & Interaction Flow

The roadmap workflow consists of 4 focused screens designed with zero cognitive overload:

### Screen 1: The Trust Framing & Onboarding (`/roadmap`)
- **Headline:** *"Find your next step in engineering."*
- **Sub-headline:** *"Not a generic 4-year checklist. An evidence-based diagnostic for SRKR students that tells you what to learn, what to build, and how to verify it."*
- **Primary CTA:** *"Start 3-Minute Diagnostic ↗"*
- **Secondary CTA:** *"Already have a plan? Restore with key"*

### Screen 2: Progressive Diagnostic Questionnaire (`/roadmap/diagnostic`)
- **Step 1: Your Academic Baseline**
  - Branch selector: CSE, ECE, EEE, Mechanical (with transparent notice for other branches).
  - Regulation: R23 (1st/2nd Year) or R20 (3rd/4th Year).
  - Current Year & Semester: Year 1 Sem 1 through Year 4 Sem 8.
- **Step 2: Goal & Commitment**
  - Primary objective: Software Placements, Core Engineering, GATE / Masters, Shipping Independent Products.
  - Weekly sustainable hours: < 5 hrs (Light), 5–10 hrs (Standard), 15+ hrs (Intensive).
  - Primary obstacle: Weak fundamentals, no projects to show, tutorial trap / no direction.
- **Step 3: Branch Prerequisite Check**
  - 3 targeted discrimination questions testing foundational prerequisites for that specific branch and stage.
  - Tests actual mental model (e.g., pointer dereferencing in C, voltage division in op-amps, free-body equilibrium) rather than self-reported confidence.

### Screen 3: The Personalized Roadmap View (`/roadmap/plan`)
- **Summary Badge Bar:** Branch · Semester · Goal · Est. Pace.
- **Section 1: Academic & Industry Position Diagnosis**
  - Where the student is right now compared to baseline expectations.
- **Section 2: Active Recovery Bridge (Conditional)**
  - If a foundational prerequisite was missed in the diagnostic, an explicit targeted bridge module is shown: *"Before tackling advanced systems, master this 2-week gap."*
- **Section 3: The Next 1–3 High-Yield Actions**
  - Priority 1: Required Core Milestone (What to study, order of topics, trusted resource).
  - Priority 2: Verifiable Build Challenge (Specific project, observable acceptance criteria, testing command).
  - Priority 3: Extracurricular Competitive / Gate Pillar (e.g., LeetCode 300-problem sheet pattern, hardware simulation).
- **Section 4: Competency & Verification Gate**
  - Observable checklist: *"How you know you are ready to move to the next stage."*
- **Section 5: Actions**
  - *"Save Plan & Get Recovery Key"*
  - *"Download Markdown / PDF Checklist"*
  - *"Adjust Diagnostic Answers"*

### Screen 4: Plan Recovery & Management (`/roadmap/recover`)
- Restore plan via UUID or secure 16-character recovery key.
- Displays full previous diagnostic snapshot without overwriting past progress.

---

## 3. Branch Diagnostic Questions

### 3.1 Computer Science & Engineering (CSE)
1. **Pointer & Memory Model:**
   - *Question:* In C/C++, if `int *p = malloc(sizeof(int)); *p = 42; free(p);`, what happens if you immediately run `printf("%d", *p);`?
   - *Options:*
     - A) Always prints 42 safely.
     - B) Compiler syntax error.
     - C) Undefined behavior (dangling pointer access to deallocated heap). [Correct]
     - D) Memory leak.
   - *Diagnostic Rule:* If incorrect, flag **C Memory & Pointer Prerequisite Bridge** before advanced Data Structures.

2. **Algorithm Complexity Invariant:**
   - *Question:* Which data structure gives guaranteed $O(1)$ average search, but degrades to $O(n)$ in the worst case with poor hashing?
   - *Options:*
     - A) Binary Search Tree
     - B) Hash Table / Unordered Map [Correct]
     - C) Min-Heap
     - D) B-Tree
   - *Diagnostic Rule:* If incorrect, flag **Algorithmic Invariants Bridge**.

3. **Database Transaction Isolation:**
   - *Question:* When two users attempt to purchase the last available concert ticket at the exact same millisecond, what prevents double-booking in a production SQL database?
   - *Options:*
     - A) JavaScript async/await in the frontend
     - B) ACID Transactions with row-level locks / isolation level [Correct]
     - C) Storing tickets in local storage
     - D) Increasing server CPU cores
   - *Diagnostic Rule:* Evaluates whether student is ready for full-stack portfolio projects.

### 3.2 Electronics & Communication Engineering (ECE)
1. **Semiconductor & Diode Basics:**
   - *Question:* In a silicon PN junction diode at room temperature, what is the approximate forward barrier potential?
   - *Options:*
     - A) 0.1 V
     - B) 0.7 V [Correct]
     - C) 2.5 V
     - D) 5.0 V
2. **Digital Logic Invariant:**
   - *Question:* What is the primary difference between a latch and a flip-flop in digital circuits?
   - *Options:*
     - A) Latches are synchronous; flip-flops are asynchronous.
     - B) Latches are level-sensitive; flip-flops are edge-triggered. [Correct]
     - C) Latches contain feedback; flip-flops do not.
     - D) Latches only work with CMOS logic.
3. **Embedded Systems Timing:**
   - *Question:* When handling a hardware sensor button press without debouncing circuitry, what occurs in the microcontroller interrupt?
   - *Options:*
     - A) The microcontroller clock slows down.
     - B) Multiple rapid false interrupt triggers due to physical contact bounce. [Correct]
     - C) The code resets to bootloader.
     - D) The pull-up resistor burns out.

### 3.3 Electrical & Electronics Engineering (EEE)
1. **AC Circuit Fundamentals:**
   - *Question:* In an ideal pure inductor connected across a sinusoidal AC voltage source, does the current lead or lag the voltage?
   - *Options:*
     - A) Current leads voltage by 90°.
     - B) Current lags voltage by 90°. [Correct]
     - C) Current and voltage are in phase.
     - D) Current is zero.
2. **Electrical Machines Invariant:**
   - *Question:* What happens to the speed of a DC shunt motor if the field circuit is accidentally opened while running under load?
   - *Options:*
     - A) The motor stops immediately.
     - B) The motor speed rises dangerously to runaway levels. [Correct]
     - C) The motor reverses direction.
     - D) The speed remains constant.
3. **Power Electronics Switching:**
   - *Question:* In a buck converter, how does the output average DC voltage compare to the input DC voltage?
   - *Options:*
     - A) Always strictly higher.
     - B) Always strictly lower or equal ($V_{out} = D \cdot V_{in}$). [Correct]
     - C) Inverted polarity only.
     - D) Independent of duty cycle.

### 3.4 Mechanical Engineering (ME)
1. **Statics & Free Body Equilibrium:**
   - *Question:* For a rigid 2D planar body in static equilibrium, what are the mandatory equilibrium conditions?
   - *Options:*
     - A) $\sum F_x = 0$ only
     - B) $\sum F_x = 0, \sum F_y = 0, \sum M_z = 0$ [Correct]
     - C) Velocity is maximum
     - D) Kinetic energy is constant
2. **Thermodynamic Cycles:**
   - *Question:* What is the theoretical upper limit on the thermal efficiency of any heat engine operating between two thermal reservoirs?
   - *Options:*
     - A) Rankine efficiency
     - B) Carnot efficiency ($1 - T_L/T_H$) [Correct]
     - C) 100%
     - D) Otto cycle efficiency
3. **Strength of Materials:**
   - *Question:* In a beam subjected to pure bending, where does the normal bending stress equal zero?
   - *Options:*
     - A) At the extreme top fiber
     - B) At the neutral axis [Correct]
     - C) At the extreme bottom fiber
     - D) At the fixed support point

---

## 4. Deterministic Recommendation Rules Engine

The roadmap does not use unpredictable LLM calls to invent curriculum. It executes **deterministic, auditable rules**:

### Rule R-01: Foundational Recovery Gating
- **Condition:** `selectedBranch == 'CSE' && diagnosticChecks.pointerKnowledge == false && currentYear >= 2`
- **Output:** Insert **"Bridge Module: C Memory Mechanics & Pointer Arithmetic"** as Priority #1 before algorithmic tree problems.
- **Student Rationale:** *"In Year 2/3, Data Structures assume pointer mechanics are second nature. Spending 7 days mastering heap/stack boundaries will unlock trees, graphs, and system design."*

### Rule R-02: Constraint-Aware Workload Sizing
- **Condition:** `weeklyHours < 6`
- **Output:** Scale active milestones from 3 to 1. Focus purely on the single highest-yield curricular project.
- **Student Rationale:** *"With limited weekly availability (< 5 hours), multi-tasking leads to tutorial abandonment. We focus 100% of your energy on this single verifiable artifact."*

### Rule R-03: ECE Hardware-Software Synthesis
- **Condition:** `selectedBranch == 'ECE' && (currentSemester == 3 || currentSemester == 4)`
- **Output:** Recommend Digital Logic + Verilog simulation over generic web development.
- **Student Rationale:** *"Core VLSI and embedded firms require verifiable Verilog or C drivers over standard React apps. Build this ALU testbench in Icarus Verilog."*

### Rule R-04: Mechanical Simulation Validation
- **Condition:** `selectedBranch == 'ME' && currentYear >= 3`
- **Output:** Recommend analytical hand-calculation first, followed by FEA in FreeCAD.
- **Student Rationale:** *"Industry hiring managers discard CAD models where stress was not first validated with free-body calculations. Calculate bending stress by hand before meshing."*

---

## 5. Security, Unique IDs & Privacy Specification

### Identity Model
1. **Immutable Internal ID:** Generated on first initialization via `crypto.randomUUID()` (e.g. `c4b8e192-3a1b-4f9e-8c7d-5a2e1b4c9f0a`).
2. **Human-Readable Display Name:** Chosen by the student (e.g. `charan_srkr_cse`).
   - Normalization: trimmed, lowercase alphanumeric + underscores, 3–20 characters.
   - Collision Handling: Check against existing registry. If collision occurs, prompt with friendly message: *"Name already in use. Choose another handle or restore your existing plan."*
3. **Zero-Knowledge Recovery Key:**
   - Cryptographically random 16-character token formatted as `MC-XXXX-XXXX-XXXX` generated via `crypto.getRandomValues()`.
   - **Critical Security Principle:** A student's saved plan can NEVER be viewed or modified by entering just a username. Ownership requires the unique Recovery Key or matching local session token.
4. **Data Isolation:**
   - Client stores state in `localStorage` under `mc_roadmap_profile_v1` with timestamped revisions.
   - Export feature provides standard JSON and printable Markdown.
   - Deletion feature allows one-click permanent local wipe.

---

## 6. Acceptance Criteria

- [x] All 4 primary branches (CSE, ECE, EEE, ME) have dedicated curriculum crosswalks and discrimination diagnostics.
- [x] Unsupported branches show honest "Research in progress" state.
- [x] Diagnostic questions test genuine mental models rather than confidence ratings.
- [x] Detected prerequisite gaps insert targeted recovery bridge modules.
- [x] Every recommendation provides: What to Learn, What to Build, and How to Verify.
- [x] Username collisions are handled gracefully.
- [x] Recovery keys allow plan restoration across devices without plaintext passwords.
- [x] Zero external API dependencies required for core roadmap generation (100% deterministic & offline capable).
