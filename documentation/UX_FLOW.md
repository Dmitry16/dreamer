# UX Flow — Minimum Lovable Product  
**Firestore-First · Backendless · Client-Orchestrated AI**

This document defines the user experience flow for the Dreamer MVP and maps each step **line-by-line** to Jira stories. It also provides **Figma-ready screen requirements** for design and implementation.

---

## 1. Home / Dashboard

**Jira stories**
- EPIC: Dream History & Navigation  
- STORY: Dashboard (Record a Dream + history list)

### Purpose
Entry point and continuity across dreamwork sessions.

### Screen components (Figma-ready)
- Primary button: **Record a Dream**
- Dream list (vertical)
  - Date (formatted)
  - Short excerpt (1–2 lines, ellipsis)
  - Optional status badge:
    - Draft / Structured / Interpreted / Integrated
- Empty state:
  - Illustration (optional)
  - Text: “No dreams yet. Record your first dream.”

### Interactions
- Tap **Record a Dream** → Dream Entry
- Tap dream list item → Dream Session View (read-only)

### Data behavior
- Query Firestore:
  - `/users/{uid}/dreams`
- Sort by `dreamedAt desc`

---

## 2. Dream Entry

**Jira stories**
- EPIC: Dream Capture & Persistence  
- STORY: Dream Entry Screen (UI)  
- STORY: Dream Storage Abstraction

### Purpose
Capture raw dream material with minimal friction.

### Screen components (Figma-ready)
- Multiline text area (primary focus)
  - Placeholder: “Write your dream as you remember it…”
- Optional inputs:
  - Mood (single-line text)
  - Life context (multiline, smaller)
- Primary CTA: **Continue**
- Secondary (implicit): autosave indicator

### Interactions
- Continue button enabled only if dream text is non-empty
- Autosave on blur / debounce

### Data behavior
- Create or update Firestore doc:
  - `/users/{uid}/dreams/{dreamId}`
- No AI calls
- Status set to `draft`

---

## 3. Dream Breakdown (Structuring)

**Jira stories**
- EPIC: Dream Structuring (AI Extraction)  
- STORY: Extraction Pipeline  
- STORY: Dream Breakdown UI

### Purpose
Externalize the dream into editable symbolic elements.

### Screen components (Figma-ready)
- Sectioned card layout:
  - Characters
  - Symbols
  - Places
  - Emotions
- Each card:
  - Editable label
  - Delete (soft delete)
- Add element button per section

### Interactions
- Initial load triggers Extractor AI
- User edits override AI output
- Deleted items are hidden but recoverable

### Data behavior
- Extracted elements written to:
  - `/users/{uid}/dreams/{dreamId}/elements/{elementId}`
- Fields:
  - `kind`, `label`, `source`, `deleted`
- Status updated to `structured`

---

## 4. Associations Screen

**Jira stories**
- EPIC: Personal Associations  
- STORY: Associations Screen  
- STORY: Association Data Persistence

### Purpose
Capture **personal meaning**, not symbolic definitions.

### Screen components (Figma-ready)
For each **symbol**:
- Prompt text block
- Free-text input (association)
- Emotional valence selector (3-state)
- Salience slider (1–5)
- Progress indicator:
  - “3 of 5 symbols completed”

### Interactions
- Save on change
- Skip allowed
- Return later allowed

### Data behavior
- Write per-symbol association:
  - `/users/{uid}/dreams/{dreamId}/associations/{associationId}`
- Linked by `elementId`
- Status updated to `associated` once ≥1 association exists

---

## 5. Interpretation Screen

**Jira stories**
- EPIC: Interpretive Hypotheses  
- STORY: Hypothesis Generation Pipeline  
- STORY: Hypothesis UI

### Purpose
Offer meaning as **testable hypotheses**, not conclusions.

### Screen components (Figma-ready)
- Expandable hypothesis cards (2–3):
  - Jungian lens badge
  - Hypothesis text
  - Evidence section (collapsible)
  - Reflective question
- Feedback buttons:
  - Resonates
  - Doesn’t fit

### Interactions
- Generate hypotheses on first entry
- Feedback stored per hypothesis
- No “correct” state

### Data behavior
- Client assembles context from Firestore
- Client calls Interpreter AI
- Save to:
  - `/users/{uid}/dreams/{dreamId}/hypotheses/{hypothesisId}`
- Status updated to `interpreted`

---

## 6. Integration

**Jira stories**
- EPIC: Integration & Reflection  
- STORY: Integration Generation  
- STORY: Integration Journaling Save/Edit

### Purpose
Bridge insight to lived experience, gently and ethically.

### Screen components (Figma-ready)
- Reflective summary block
- 1–2 reflective questions
- Integration practice suggestion (small, non-prescriptive)
- Optional journal textarea

### Interactions
- Journal autosaves
- No validation pressure

### Data behavior
- Save integration to:
  - `/users/{uid}/dreams/{dreamId}/integration/main`
- Status updated to `integrated`

---

## 7. Save & Return

**Jira stories**
- EPIC: Dream History & Navigation  
- STORY: Dream Session View

### Purpose
Close the session without forcing conclusions.

### Screen components (Figma-ready)
- Completion confirmation
- CTA: **Return to Dashboard**
- Secondary: “View this dream later”

### Data behavior
- No new writes required
- Session remains fully revisitable
- No automatic regeneration

---

## UX & Ethical Constraints (Global)

**Mapped Jira epic**
- Safety, Ethics & Disclaimers

### Rules
- Interpretations are hypotheses, not truths
- No diagnosis, prediction, or advice
- User edits always override AI
- Distressing content handled neutrally

---

## Design System Notes (for Figma)

- Typography: readable, journal-like
- Emphasis hierarchy:
  - Dream text > associations > hypotheses
- Avoid:
  - Clinical language
  - Overconfident tone
- Prefer:
  - Soft dividers
  - Expand/collapse patterns
  - Clear progress cues

---

## Status Lifecycle (implicit UX logic)
