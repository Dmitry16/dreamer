# MVP.md

**Dreamer — Minimum Lovable Product (Updated)**

This document defines the **scope, goals, and constraints** of the Dreamer MVP, aligned with the latest decisions:
- **Firestore-first**
- **No custom backend**
- **Client-orchestrated AI**
- **Strict Jungian / Inner Work ethics**

---

## 1. MVP Goal

Deliver a **complete, contained Jungian dreamwork session** that guides a user from dream capture to reflective integration **without overinterpretation, authority, or therapeutic claims**.

The MVP must:
- Respect the primacy of the dreamer’s own associations
- Present meaning as *hypotheses*, not truths
- Be calm, private, and reflective
- Remain technically simple and deployable

---

## 2. Target User Experience

A single user can:
1. Record a dream
2. Break it into symbolic elements
3. Reflect on personal associations
4. Explore multiple interpretive hypotheses
5. Engage in small, grounded integration
6. Return later to re-read the session

No account creation friction is required (anonymous auth acceptable).

---

## 3. Core MVP Features

### 3.1 Dream Capture
- Free-text dream input (long-form)
- Auto-filled, editable date/time
- Optional:
  - waking mood
  - life context
- Immediate persistence to Firestore

---

### 3.2 Dream Structuring (Breakdown)
- Client-triggered extraction of descriptive elements:
  - symbols
  - characters
  - places
  - emotions
  - actions / narrative shifts (optional)
- Elements displayed as editable cards
- User can:
  - edit labels
  - remove items (soft delete)
  - add missing elements
- User edits override AI output

---

### 3.3 Personal Associations
For each **symbol**:
- Free-text association
- Emotional valence:
  - positive / negative / mixed
- Salience rating (1–5)

Associations are:
- Optional
- Editable
- Persisted per symbol

---

### 3.4 Interpretive Hypotheses
- Generate **2–3 hypotheses** per dream
- Each hypothesis includes:
  - Jungian lens (e.g. compensation, shadow)
  - Evidence references (dream text, elements, associations)
  - Reflective “test” question
- User feedback:
  - “Resonates”
  - “Doesn’t fit”

**Hard constraint:**  
No hypothesis may be presented as correct, final, or authoritative.

---

### 3.5 Integration & Reflection
- 1–2 reflective questions
- 1 small integration suggestion (non-prescriptive)
- Optional journal input
- Journal text is editable and private

---

### 3.6 Dream History
- Chronological list of dreams
- Read-only replay of past sessions:
  - dream text
  - breakdown
  - associations
  - hypotheses + feedback
  - integration notes

No cross-dream analysis in MVP.

---

## 4. Explicit Non-Goals (MVP)

The MVP **will not** include:
- Active imagination exercises
- Archetype labeling UI
- Dream dictionaries or fixed meanings
- Diagnosis, prediction, or advice
- Social or sharing features
- Cross-dream pattern detection
- Therapist-facing tools

---

## 5. Ethical & Safety Constraints

- Interpretations are hypotheses, not conclusions
- User associations are primary
- Calm, non-clinical language only
- Clear mental-health disclaimer
- Graceful handling of distressing content
- No logging or training on dream text by default

---

## 6. Technical Constraints (MVP)

- React + TypeScript frontend
- Firestore as system of record
- Optional Firebase Anonymous Auth
- Client-side AI orchestration
- No custom backend services
- Minimal infrastructure and observability

---

## 7. Definition of “Done” for MVP

The MVP is considered complete when:
- A user can complete the full dreamwork flow end-to-end
- All steps persist correctly to Firestore
- Hypotheses are consistently framed as tentative
- The UI matches the defined design tokens and tone
- The system can be deployed publicly without violating safety constraints

---

## 8. Out of Scope (Explicitly Deferred)

- Backend AI proxy
- Paid accounts or subscriptions
- Analytics beyond basic performance/error tracking
- Mobile native apps
- Advanced moderation or clinical escalation

---

**This document is the authoritative scope definition for the Dreamer MVP.**
