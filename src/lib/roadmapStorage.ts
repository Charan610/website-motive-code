import { BRANCH_REGISTRY } from '../data/roadmapData';
import type { StudentProfile } from '../types/roadmap';

const STORAGE_PROFILE_KEY = 'mc_roadmap_profile_v1';
const STORAGE_REGISTRY_KEY = 'mc_roadmap_registry_v1';

export function isStudentProfile(value: unknown): value is StudentProfile {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const p = value as Record<string, unknown>;
  return ['id', 'displayName', 'recoveryKey', 'createdAt', 'lastUpdated'].every(k => typeof p[k] === 'string' && p[k] !== '')
    && BRANCH_REGISTRY.some(b => b.isSupported && b.code === p.branch)
    && ['R20', 'R23'].includes(String(p.regulation))
    && [1, 2, 3, 4].includes(p.year as number)
    && [Number(p.year) * 2 - 1, Number(p.year) * 2].includes(p.semester as number)
    && ['placements', 'core_engineering', 'higher_studies', 'products'].includes(String(p.goal))
    && ['light', 'standard', 'intensive'].includes(String(p.weeklyAvailability))
    && ['fundamentals', 'projects', 'no_direction', 'time'].includes(String(p.primaryObstacle))
    && !!p.diagnosticAnswers && typeof p.diagnosticAnswers === 'object' && !Array.isArray(p.diagnosticAnswers)
    && Object.values(p.diagnosticAnswers).every(v => Number.isInteger(v) && Number(v) >= 0 && Number(v) < 4)
    && Array.isArray(p.completedActionIds) && p.completedActionIds.every(v => typeof v === 'string');
}

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

// Local registry of plans saved in this browser
function getRegistry(): Record<string, StudentProfile> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_REGISTRY_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return Object.fromEntries(Object.entries(parsed).filter(([, value]) => isStudentProfile(value)));
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

export function saveStudentProfile(profile: StudentProfile): boolean {
  if (typeof window === 'undefined' || !isStudentProfile(profile)) return false;
  try {
    const updated = {
      ...profile,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(updated));

    // Update this browser’s plan registry
    const registry = getRegistry();
    registry[profile.id] = updated;
    saveRegistry(registry);

    window.dispatchEvent(new Event('roadmap_profile_updated'));
    return true;
  } catch {
    return false; // Browser storage may be disabled or full.
  }
}

export function getSavedStudentProfile(): StudentProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_PROFILE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isStudentProfile(parsed) ? parsed : null;
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
2. Verify your build against its acceptance criteria, using tests and compiler warnings where applicable.
3. Keep the thinking yours.

## Competency Readiness Checklist
${checklist.map((item) => `- [ ] ${item}`).join('\n')}

---
*The recovery key only works in the original browser while its saved data remains available. Keep this export as a separate copy; it is not an importable backup.*
`;
}
