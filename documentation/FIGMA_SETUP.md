# FIGMA_SETUP.md  
**Dreamer MVP — Figma File Setup & Page Structure**

This document is a **ready-to-use setup guide** for creating the Dreamer MVP Figma file.  
It is designed to be imported into a repo, Confluence, or attached to Jira as the authoritative Figma setup reference.

---

## 1. Figma File Metadata

**File name**
```
Dreamer — MVP Design System & Screens
```

**Purpose**
- Single source of truth for design
- Shared components across UX, AI, and Firestore-driven flows
- Clean handoff to engineering

---

## 2. Top-Level Page Structure

Create the following pages **in order**:

```
01 — Cover & Principles
02 — Foundations (Tokens)
03 — Atoms
04 — Molecules
05 — Organisms (Optional)
06 — Screens — Core Flow
07 — Screens — States & Edge Cases
08 — Prototype Flows
09 — Dev Handoff
```

Do not reorder pages. This order mirrors the Jira epics and sprint flow.

---

## 3. Page-by-Page Setup

### 01 — Cover & Principles
**Purpose:** Context and alignment

Include:
- Project name + MVP version
- One-line product intent
- UX principles:
  - Interpretations are hypotheses
  - User meaning > system meaning
  - Calm, reflective pacing
- Explicit non-goals:
  - Therapy
  - Diagnosis
  - Prediction

_No components on this page._

---

### 02 — Foundations (Tokens)
**Purpose:** Design tokens (locked after approval)

Create frames:
- Colors
- Typography
- Spacing
- Motion Notes

Actions:
- Convert colors into Figma Color Styles
- Convert text styles into Figma Text Styles
- Name styles exactly as in `DESIGN_TOKENS.md`
- Lock page after approval

---

### 03 — Atoms
**Purpose:** Smallest reusable UI elements

Components to create:
- Button
  - Variants: Primary / Secondary / Destructive
  - States: Default / Hover / Disabled / Loading
- Text Input
  - Single-line
  - Multiline (long-form writing)
- Status Badge
- Icon primitives
- Divider

Rules:
- One component set per atom
- Variants over duplicated components

---

### 04 — Molecules
**Purpose:** Reusable UI blocks

Components to create:
- Dream List Item
- Element Card
- Association Card
- Hypothesis Card
- Integration Block

Rules:
- Must be screen-agnostic
- Built only from atoms
- No hardcoded screen spacing

---

### 05 — Organisms (Optional)
**Purpose:** Larger groupings (keep minimal)

Examples:
- Dream Breakdown Section
- Hypothesis Stack
- Associations Progress Group

Use only if reuse across screens is clear.

---

### 06 — Screens — Core Flow
**Purpose:** Main user journey

Frames to create:
- Dashboard
- Dream Entry
- Dream Breakdown
- Associations
- Interpretation
- Integration
- Dream Session (Read-only)

Rules:
- One frame per screen
- Use only molecules and atoms
- No local overrides

---

### 07 — Screens — States & Edge Cases
**Purpose:** Prevent ambiguity in implementation

Frames to include:
- Loading (AI processing)
- Empty states
- Partial completion
- Error states
- Read-only vs editable comparison

---

### 08 — Prototype Flows
**Purpose:** Interaction and pacing

Flows:
- Happy path (end-to-end dreamwork)
- Resume later
- Early exit

Notes:
- Keep motion subtle
- Avoid delight animations

---

### 09 — Dev Handoff
**Purpose:** Engineering clarity

Include:
- Final approved screens
- Component usage notes
- Spacing and typography callouts
- Links to Jira epics/stories
- Copy notes and tone constraints

This page is **engineer-first**.

---

## 4. Naming Conventions

### Components
```
Atom/Button
Molecule/HypothesisCard
Screen/DreamEntry
```

### Variants
```
state=default | hover | disabled
type=primary | secondary
status=draft | integrated
```

---

## 5. Governance Rules

- Tokens may not be overridden at screen level
- All new components must map to Jira tickets
- Ethical tone takes precedence over visual flair
- Any deviation must be documented

---

## 6. Import / Usage

This file should be:
- Checked into the repo as `FIGMA_SETUP.md`
- Linked from Jira (Design System epic)
- Linked inside the Figma Cover page

---

**This document defines the canonical Figma structure for Dreamer MVP.**
