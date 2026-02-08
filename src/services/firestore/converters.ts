import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

import type {
  AssociationDoc,
  DreamDoc,
  DreamElementDoc,
  HypothesisDoc,
  IntegrationDoc,
  UserDoc,
} from "../../shared/types/domain";

function makeConverter<T extends DocumentData>(): FirestoreDataConverter<T> {
  return {
    toFirestore: (modelObject: T) => modelObject,
    fromFirestore: (
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ) => snapshot.data(options) as T,
  };
}

export const converters = {
  user: makeConverter<UserDoc>(),
  dream: makeConverter<DreamDoc>(),
  element: makeConverter<DreamElementDoc>(),
  association: makeConverter<AssociationDoc>(),
  hypothesis: makeConverter<HypothesisDoc>(),
  integration: makeConverter<IntegrationDoc>(),
} as const;
