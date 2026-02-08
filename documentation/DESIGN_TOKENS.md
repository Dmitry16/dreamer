# DESIGN_TOKENS.md 

**Dreamer MVP — Visual Foundations**

This document defines the **design tokens and visual language** for the Dreamer MVP.  
All UI components, screens, and interactions must reference these tokens to maintain a calm, reflective, non-authoritative experience aligned with Jungian dreamwork principles.

---

## 1. Design Intent & Tone

**Core qualities**
- Reflective
- Calm
- Grounded
- Human
- Non-clinical
- Non-gamified

**Explicitly avoid**
- Bright or saturated colors
- High-contrast dashboards
- Productivity / analytics aesthetics
- Medical or therapeutic visual cues
- Aggressive success or error signaling

The interface should feel closer to a **personal journal with a quiet guide** than a “tool.”

---

## 2. Color Tokens

### 2.1 Base Neutrals
```css
--color-bg-primary:     #FAFAF8;
--color-bg-secondary:   #F2F2EE;
--color-bg-card:        #FFFFFF;
--color-border-subtle:  #E3E3DD;
```

### 2.2 Text Colors
```css
--color-text-primary:   #1E1E1C;
--color-text-secondary: #5F5F5A;
--color-text-muted:     #8C8C86;
```

### 2.3 Accent Colors (Use Sparingly)
```css
--color-accent-primary: #6B705C;
--color-accent-soft:    #DDBEA9;
```

### 2.4 Semantic Colors (Soft, Non-Alarmist)
```css
--color-success-soft:   #A5B7A0;
--color-neutral-soft:   #CED4DA;
--color-warning-soft:   #E6CCB2;
```

---

## 3. Typography Tokens

### 3.1 Typeface Guidance
Recommended families:
- Inter
- Source Serif 4
- IBM Plex Serif

Priority: **long-form readability over UI sharpness**.

### 3.2 Type Scale
```css
--font-heading-xl: 28px / 36px;
--font-heading-l:  22px / 30px;
--font-heading-m:  18px / 26px;

--font-body:       16px / 26px;
--font-body-small: 14px / 22px;
--font-meta:       12px / 18px;
```

### 3.3 Usage Rules
- Dream text → body
- Hypotheses → body (never emphasized as truth)
- Reflective questions → italic or softer color
- Status labels → meta

---

## 4. Spacing System
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 16px;
--space-4: 24px;
--space-5: 32px;
--space-6: 48px;
```

Rule: If it feels slightly too spacious, it is correct.

---

## 5. Containers & Elevation
```css
--radius-default: 8px;
--radius-small:   4px;
```

- Prefer borders over shadows
- Cards feel placed, not floating

---

## 6. Motion Guidance
- 150–200ms ease-out
- No bounce or spring
- No celebratory animations

---

## 7. Accessibility
- WCAG AA contrast
- ≥ 40px interactive targets
- No color-only signaling

---

## 8. Figma Setup
1. Create page: Foundations
2. Create frames: Colors, Typography, Spacing, Motion
3. Convert tokens to Figma styles
4. Lock the page

---

**This file is the single source of truth for Dreamer’s visual language.**
