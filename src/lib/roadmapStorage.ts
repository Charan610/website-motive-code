import type { StudentProfile } from '../types/roadmap';

const STORAGE_PROFILE_KEY = 'mc_roadmap_profile_v1';
const STORAGE_REGISTRY_KEY = 'mc_roadmap_registry_v1';

export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function generateRecoveryKey(): string {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const bytes = new Uint8Array(6);
    crypto.getRandomValues(bytes);
    const hex = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0').toUpperCase())
      .join('');
    return `MC-${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex.slice(8, 12)}`;
  }
  const rand = Math.random().toString(36).substring(2, 14).toUpperCase();
  return `MC-${rand.slice(0, 4)}-${rand.slice(4, 8)}-${rand.slice(8, 12)}`;
}

export function normalizeUsername(raw: string): string {
  return raw.trim().toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 20);
}

// Registry helpers (simulates server-side registry in browser storage)
function getRegistry(): Record<string, StudentProfile> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_REGISTRY_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveRegistry(reg: Record<string, StudentProfile>): void {
  try {
    localStorage.setItem(STORAGE_REGISTRY_KEY, JSON.stringify(reg));
  } catch {
    // Ignore storage quota
  }
}

export function checkUsernameAvailable(rawUsername: string, currentId?: string): { available: boolean; normalized: string } {
  const normalized = normalizeUsername(rawUsername);
  if (!normalized || normalized.length < 3) {
    return { available: false, normalized };
  }

  const registry = getRegistry();
  const existingWithSameName = Object.values(registry).find(
    (p) => normalizeUsername(p.displayName) === normalized && p.id !== currentId
  );

  return {
    available: !existingWithSameName,
    normalized,
  };
}

export function saveStudentProfile(profile: StudentProfile): void {
  if (typeof window === 'undefined') return;
  try {
    const updated = {
      ...profile,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(updated));

    // Update global plan registry
    const registry = getRegistry();
    registry[profile.id] = updated;
    saveRegistry(registry);

    window.dispatchEvent(new Event('roadmap_profile_updated'));
  } catch {
    // Storage quota fallback
  }
}

export function getSavedStudentProfile(): StudentProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function restorePlanByKeyOrId(keyOrId: string): StudentProfile | null {
  if (typeof window === 'undefined') return null;
  const cleanInput = keyOrId.trim();
  if (!cleanInput) return null;

  const registry = getRegistry();

  // Search by exact Recovery Key or internal ID
  const found = Object.values(registry).find(
    (p) =>
      p.recoveryKey.toLowerCase() === cleanInput.toLowerCase() ||
      p.id.toLowerCase() === cleanInput.toLowerCase()
  );

  if (found) {
    saveStudentProfile(found);
    return found;
  }

  return null;
}

export function clearSavedPlan(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_PROFILE_KEY);
    window.dispatchEvent(new Event('roadmap_profile_updated'));
  } catch {
    // Ignore
  }
}

export function exportPlanAsMarkdown(profile: StudentProfile, checklist: string[]): string {
  return `# Motivation Code — Engineering Roadmap
**Student Handle:** ${profile.displayName}
**Plan ID:** ${profile.id}
**Recovery Token:** ${profile.recoveryKey}
**Branch:** SRKR B.Tech ${profile.branch} (Regulation: ${profile.regulation})
**Current Stage:** Year ${profile.year}, Semester ${profile.semester}
**Target Objective:** ${profile.goal}
**Weekly Pace:** ${profile.weeklyAvailability}
**Generated on:** ${new Date().toLocaleDateString()}

---

## The Motivation Code Rule
1. Do not ask AI for unearned code. Draft your mental model cold on a blank scratchpad first.
2. Build verified software: run automated test suites with \`-Wall -Wextra\`.
3. Keep the thinking yours.

## Competency Readiness Checklist
${checklist.map((item) => `- [ ] ${item}`).join('\n')}

---
*Preserve your recovery token (${profile.recoveryKey}) to restore your progress on any browser at https://website-motive-code.vercel.app/roadmap*
`;
}
