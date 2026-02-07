# Architecture (Firestore-only)

```mermaid
flowchart LR
  UI[React App]
  FS[(Firestore)]
  LLM[LLM Provider]

  UI --> FS
  UI --> LLM
```
