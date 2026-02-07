# Technical Implementation

## Architecture
- React + TypeScript frontend
- Firestore for persistence
- Client-side AI orchestration
- Optional Firebase Auth (anonymous)

## Firestore Model
/users/{uid}
/users/{uid}/dreams/{dreamId}
/users/{uid}/dreams/{dreamId}/elements/{elementId}
/users/{uid}/dreams/{dreamId}/associations/{associationId}
/users/{uid}/dreams/{dreamId}/hypotheses/{hypothesisId}
/users/{uid}/dreams/{dreamId}/integration/main
