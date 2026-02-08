// src/llm/byokKeyStore.ts
const KEY = "dreamer.byok.llmApiKey";

/**
 * Store key locally only (never in Firestore).
 * WARNING: localStorage is readable by any JS running on the origin.
 * Only acceptable for MVP with user consent and clear UI.
 */
export function setLlmApiKey(apiKey: string): void {
  localStorage.setItem(KEY, apiKey.trim());
}

export function getLlmApiKey(): string | null {
  const v = localStorage.getItem(KEY);
  return v && v.trim().length ? v : null;
}

export function clearLlmApiKey(): void {
  localStorage.removeItem(KEY);
}

/** For UX gating */
export function hasLlmApiKey(): boolean {
  return !!getLlmApiKey();
}
