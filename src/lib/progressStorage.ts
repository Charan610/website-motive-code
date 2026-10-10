import type { UserProgressData } from '../types/content';

const STORAGE_KEY = 'motivation_code_user_progress_v1';

export function getStoredProgress(): UserProgressData {
  if (typeof window === 'undefined') {
    return {
      completedReels: [],
      completedWorkflows: [],
      quizScores: {},
      masteredFlashcards: [],
      currentStreakDays: 0,
      lastActiveDate: '',
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial: UserProgressData = {
        completedReels: [],
        completedWorkflows: [],
        quizScores: {},
        masteredFlashcards: [],
        currentStreakDays: 0,
        lastActiveDate: '',
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return {
      completedReels: [],
      completedWorkflows: [],
      quizScores: {},
      masteredFlashcards: [],
      currentStreakDays: 0,
      lastActiveDate: '',
    };
  }
}

export function saveProgress(progress: UserProgressData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event('progress_updated'));
  } catch {
    // Ignore storage quota issues
  }
}

export function getStreak(): number {
  return getStoredProgress().currentStreakDays || 0;
}

export function isReelCompleted(reelId: string | number): boolean {
  const data = getStoredProgress();
  const idStr = String(reelId);
  return data.completedReels.includes(idStr);
}

export function markReelCompleted(reelId: string | number, completed = true): void {
  const data = getStoredProgress();
  const idStr = String(reelId);
  if (completed) {
    if (!data.completedReels.includes(idStr)) {
      data.completedReels.push(idStr);
      const today = new Date().toLocaleDateString('en-CA');
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
      if (data.lastActiveDate !== today) {
        data.currentStreakDays = data.lastActiveDate === yesterday.toLocaleDateString('en-CA') ? data.currentStreakDays + 1 : 1;
        data.lastActiveDate = today;
      }
    }
  } else {
    data.completedReels = data.completedReels.filter((id) => id !== idStr);
  }
  saveProgress(data);
}

export function toggleReelCompletion(reelId: string | number): boolean {
  const idStr = String(reelId);
  const next = !isReelCompleted(idStr);
  markReelCompleted(idStr, next);
  return next;
}

export function saveQuizScore(reelId: string | number, score: number, total = 5): void {
  const data = getStoredProgress();
  const idStr = String(reelId);
  const percentage = Math.round((score / (total || 1)) * 100);
  data.quizScores[idStr] = Math.max(data.quizScores[idStr] || 0, percentage);
  if (percentage >= 60 && !data.completedReels.includes(idStr)) {
    data.completedReels.push(idStr);
  }
  saveProgress(data);
}

export function isFlashcardMastered(cardId: string): boolean {
  const data = getStoredProgress();
  return data.masteredFlashcards.includes(cardId);
}

export function markFlashcardMastered(cardId: string, mastered = true): void {
  const data = getStoredProgress();
  if (mastered) {
    if (!data.masteredFlashcards.includes(cardId)) {
      data.masteredFlashcards.push(cardId);
    }
  } else {
    data.masteredFlashcards = data.masteredFlashcards.filter((id) => id !== cardId);
  }
  saveProgress(data);
}

export function toggleFlashcardMastery(cardId: string): boolean {
  const next = !isFlashcardMastered(cardId);
  markFlashcardMastered(cardId, next);
  return next;
}

export function resetAllProgress(): void {
  const blank: UserProgressData = {
    completedReels: [],
    completedWorkflows: [],
    quizScores: {},
    masteredFlashcards: [],
    currentStreakDays: 0,
    lastActiveDate: '',
  };
  saveProgress(blank);
}
