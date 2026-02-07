# Suggested Technical Implementation

## Architecture Overview

- Client-heavy interpretation UX
- Backend for persistence and AI orchestration
- Stateless AI pipeline where possible

---

## Frontend
- React + TypeScript
- Component-driven UI
- Form-heavy, text-first experience
- Material UI or similar component library

Key components:
- DreamEditor
- SymbolCard
- AssociationForm
- HypothesisCard
- IntegrationPanel

---

## Backend
- Node.js (Express or Fastify)
- REST or simple RPC endpoints
- Auth optional for MVP (anonymous or local storage OK)

Core services:
- Dream persistence
- AI pipeline orchestration
- Safety & content moderation layer

---

## AI Pipeline (Multi-Step)

1. Extractor  
   Input: raw dream text  
   Output: structured symbols, emotions, scenes  
   No interpretation

2. Association Context Builder  
   Combine user associations + dream structure

3. Interpreter  
   Generate multiple hypotheses  
   Enforce "hypothesis, not conclusion" framing

4. Integrator  
   Produce reflective questions and practices

Structured JSON schemas recommended for each stage.

---

## Data Model (Simplified)

- User
- Dream
- Symbol
- Association
- Hypothesis
- IntegrationNote

---

## Privacy & Safety
- Encrypt stored dream text
- No training on user data by default
- Clear mental-health disclaimer
- Graceful handling of distressing content

---

## Deployment
- Firebase / Supabase / simple VPS
- Minimal infra for MVP
- Logging limited to errors and performance
