# Project Architecture

**Dreamer — Jungian Dreamwork Web Application**

This document summarizes the architectural decisions for the Dreamer project and defines a scalable, loosely coupled folder structure suitable for an MVP that can evolve into a long‑term product.

The architecture is **Firestore‑first**, **backendless**, and **client‑orchestrated**, with a strong emphasis on domain clarity and ethical AI boundaries.

---

## Architectural Principles

1. **Domain-first, not screen-first**
   - Core concepts (Dream, Element, Hypothesis, etc.) are modeled explicitly.
   - UI and workflows are layered on top of stable domain primitives.

2. **Loosely coupled by design**
   - Firestore access is abstracted behind repositories.
   - AI logic is centralized and provider-agnostic.
   - Features orchestrate entities; entities never depend on features.

3. **MVP simplicity with scale headroom**
   - Minimal abstractions initially.
   - Clear seams for future growth (encryption, analytics, multi-provider AI).

4. **Ethical & safety-aware AI usage**
   - Interpretations are framed as hypotheses, not diagnoses.
   - No dream text is logged or sent to analytics.

---

## Conceptual Layers

```
[ screens ]        → routing-level pages
     ↓
[ features ]       → user workflows (verbs)
     ↓
[ entities ]       → domain nouns (persistent meaning)
     ↓
[ services ]       → infrastructure (AI, Firestore, analytics)
```

---

## Entities vs Modules (Key Distinction)

- **Modules**: generic folders grouped by convenience or screens.
- **Entities**: domain primitives with meaning, lifecycle, and persistence.

Create an **entity** when:
- It represents a real domain concept
- It persists to Firestore
- It appears in multiple workflows
- A non‑developer can name it

Examples:
- Dream
- Element
- Association
- Hypothesis
- Integration

---

## Complete Folder Structure

```
src/
  app/
    App.tsx
    routes.tsx
    providers/
      FirebaseProvider.tsx
      ThemeProvider.tsx
      AuthProvider.tsx
    store/                 # optional (keep minimal in MVP)
    config/
      env.ts
      firebase.ts
    styles/
      tokens.css
      theme.ts

  shared/
    ui/                    # reusable, dumb UI components
      Button/
      Card/
      TextArea/
      StatusBadge/
      index.ts
    lib/
      date.ts
      id.ts
      invariant.ts
      logger.ts
    types/
      brand.ts
      domain.ts
    constants/
      copy.ts              # disclaimers, tone-safe copy
      routes.ts

  entities/
    dream/
      model/
        types.ts
        status.ts
      api/
        dream.repo.ts
        dream.fs.repo.ts
      ui/
        DreamListItem.tsx

    element/
      model/
        types.ts
      api/
        element.repo.ts
        element.fs.repo.ts
      ui/
        ElementCard.tsx

    association/
      model/
        types.ts
      api/
        association.repo.ts
        association.fs.repo.ts
      ui/
        AssociationForm.tsx

    hypothesis/
      model/
        types.ts
      api/
        hypothesis.repo.ts
        hypothesis.fs.repo.ts
      ui/
        HypothesisCard.tsx

    integration/
      model/
        types.ts
      api/
        integration.repo.ts
        integration.fs.repo.ts
      ui/
        IntegrationPanel.tsx

  features/
    dreamCapture/
      ui/
        DreamEntryPage.tsx
      model/
        useDreamAutosave.ts
      service/
        dreamCapture.service.ts

    dreamStructuring/
      ui/
        DreamBreakdownPage.tsx
      service/
        extractElements.service.ts

    dreamInterpretation/
      ui/
        InterpretationPage.tsx
      service/
        generateHypotheses.service.ts

    dreamIntegration/
      ui/
        IntegrationPage.tsx
      service/
        generateIntegration.service.ts

    byok/
      ui/
        ByokModal.tsx
        SettingsPage.tsx
      service/
        keyStorage.service.ts

  screens/
    DashboardPage.tsx
    DreamSessionReadOnlyPage.tsx
    NotFoundPage.tsx

  services/
    ai/
      client/
        llmClient.ts
        openaiCompat.ts
      prompts/
        extractor.ts
        interpreter.ts
        integrator.ts
      schemas/
        extractor.schema.ts
        interpreter.schema.ts
        integrator.schema.ts
      safety/
        framing.ts          # enforce “hypothesis” posture
        redact.ts           # avoid accidental logging

    firestore/
      paths.ts              # canonical collection paths
      converters.ts         # Firestore converters
      timestamps.ts

    analytics/
      client.ts             # minimal + no PII

    crypto/
      optionalEncrypt.ts    # future: field-level encryption

  test/
    fixtures/
    builders/

public/
```

---

## Dependency Rules (Non‑Negotiable)

1. `screens/` may import **features**, **entities**, **shared**, **services**
2. `features/` may import **entities**, **shared**, **services**
3. `entities/` may import **shared** and **services/firestore** only
4. `services/ai/` is framework‑agnostic (no React imports)
5. Firestore SDK access only via `*.repo.ts`
6. Design tokens flow one way: tokens → theme → UI

---

## MVP Simplification Option

For an early MVP iteration, you may:
- Merge `screens/` into feature pages
- Skip global state management
- Keep only Firestore + AI services

The folder structure already supports this without refactoring.

---

## One‑Sentence Summary

> This architecture treats **dreamwork concepts as first‑class domain entities**, keeps workflows explicit and decoupled, and allows the UI, AI, and persistence layers to evolve independently without structural rewrites.
