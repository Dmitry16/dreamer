import type {
  AssociationId,
  DreamId,
  ElementId,
  HypothesisId,
  UID,
} from "../../shared/types/domain";

export const paths = {
  user: (uid: UID) => `users/${uid}`,
  dreams: (uid: UID) => `users/${uid}/dreams`,
  dream: (uid: UID, dreamId: DreamId) => `users/${uid}/dreams/${dreamId}`,

  elements: (uid: UID, dreamId: DreamId) =>
    `users/${uid}/dreams/${dreamId}/elements`,
  element: (uid: UID, dreamId: DreamId, elementId: ElementId) =>
    `users/${uid}/dreams/${dreamId}/elements/${elementId}`,

  associations: (uid: UID, dreamId: DreamId) =>
    `users/${uid}/dreams/${dreamId}/associations`,
  association: (uid: UID, dreamId: DreamId, associationId: AssociationId) =>
    `users/${uid}/dreams/${dreamId}/associations/${associationId}`,

  hypotheses: (uid: UID, dreamId: DreamId) =>
    `users/${uid}/dreams/${dreamId}/hypotheses`,
  hypothesis: (uid: UID, dreamId: DreamId, hypothesisId: HypothesisId) =>
    `users/${uid}/dreams/${dreamId}/hypotheses/${hypothesisId}`,

  integrationMain: (uid: UID, dreamId: DreamId) =>
    `users/${uid}/dreams/${dreamId}/integration/main`,
} as const;
