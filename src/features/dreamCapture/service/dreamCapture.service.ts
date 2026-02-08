import type { Firestore } from "firebase/firestore";

import {
  createDream,
  updateDream,
  type CreateDreamInput,
  type UpdateDreamInput,
} from "../../../services/firestore/firestoreRepo";
import type { DreamId, UID } from "../../../shared/types/domain";

export async function createDreamEntry(
  db: Firestore,
  uid: UID,
  input: CreateDreamInput
): Promise<{ dreamId: DreamId }> {
  const result = await createDream(db, uid, input);
  return { dreamId: result.dreamId };
}

export async function updateDreamEntry(
  db: Firestore,
  uid: UID,
  dreamId: DreamId,
  patch: UpdateDreamInput
): Promise<void> {
  await updateDream(db, uid, dreamId, patch);
}
