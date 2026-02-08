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
    - Draft / Structured/ Associated / Interpreted / Integrated
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

---

## BYOK (Bring Your Own Key) — UX Pattern

This section defines the **UX pattern for optional BYOK (Bring Your Own LLM API Key)** usage in the Dreamer MVP.

BYOK allows users to run AI-assisted dreamwork using **their own LLM API key**, stored **locally on their device only**, with no server-side persistence.

---

### Purpose

- Enable AI functionality without running a backend proxy
- Preserve user privacy and data ownership
- Keep MVP infrastructure minimal
- Make AI usage explicit and consent-based

---

### UX Principles (Non-Negotiable)

- **Opt-in only** — no AI calls without an explicit user-provided key
- **Local-only storage** — keys are never written to Firestore
- **User control** — keys can be viewed, replaced, or removed at any time
- **Clear boundaries** — explain limitations and risks in plain language
- **Non-blocking** — core journaling UX remains usable without a key

---

### Entry Points

BYOK UI may be accessed from:
- A lightweight **Settings** entry in the dashboard
- A gated prompt when the user first reaches an AI-dependent step:
  - Dream Breakdown
  - Interpretation
  - Integration

---

### Settings Screen / Modal (BYOK)

**Components**
- API Key input field (password-type)
- Provider label (e.g. “OpenAI-compatible API key”)
- Buttons:
  - **Save key**
  - **Remove key**
- Status indicator:
  - “Key stored locally on this device”
  - or “No API key set”

**Copy (example)**
> “Your API key is stored only on this device.  
> It is never uploaded, logged, or saved to our database.”

---

### Storage Rules (UX-Level Contract)

- API keys are stored using browser local storage
- Keys are:
  - scoped to the current browser/device
  - removed on user request
  - lost if browser storage is cleared
- The app must **never**:
  - sync keys across devices
  - attach keys to user records
  - include keys in logs or analytics

---

### AI-Gated Flow Behavior

If **no API key is present**:

- AI-dependent steps display a **soft gate**, not an error
- Example messaging:
  > “To generate interpretations, add your own API key — or continue without AI.”

Available actions:
- Add API key
- Skip AI step and continue journaling
- Return to dashboard

No dead ends.

---

### Error States

Handled gently and explicitly:
- Invalid key
- Network error
- Provider error / rate limit

Errors:
- Never expose raw provider messages
- Never blame the user
- Always allow retry or key removal

---

### Ethical Framing (Important)

The presence of a user-supplied key **does not change** the interpretive posture:

- Interpretations remain hypotheses
- No authoritative language
- No escalation into advice or diagnosis
- AI output is always editable, dismissible, and secondary to user reflection

---

### Non-Goals (BYOK)

- No automatic key generation
- No key sharing
- No provider-specific lock-in UI
- No usage analytics tied to keys

---

### Future Migration Path (Non-MVP)

This UX pattern intentionally mirrors a future upgrade path:
- Replace BYOK with a secure backend proxy
- Preserve the same user-facing semantics
- Maintain explicit consent and transparency

---

## Status Lifecycle (implicit UX logic)
