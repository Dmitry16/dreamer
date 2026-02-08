import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Firestore } from "firebase/firestore";

import type { DreamId, UID } from "../../../shared/types/domain";
import type {
  CreateDreamInput,
  UpdateDreamInput,
} from "../../../services/firestore/firestoreRepo";
import {
  createDreamEntry,
  updateDreamEntry,
} from "../service/dreamCapture.service";

type DreamEntryDeps = {
  createDream: typeof createDreamEntry;
  updateDream: typeof updateDreamEntry;
};

type DreamEntryPageProps = {
  db: Firestore;
  uid: UID;
  dreamId?: DreamId;
  autosaveDelayMs?: number;
  onContinue?: (dreamId: DreamId) => void;
  deps?: DreamEntryDeps;
};

const DEFAULT_AUTOSAVE_MS = 600;

export default function DreamEntryPage({
  db,
  uid,
  dreamId,
  autosaveDelayMs = DEFAULT_AUTOSAVE_MS,
  onContinue,
  deps,
}: DreamEntryPageProps) {
  const [rawText, setRawText] = useState("");
  const [mood, setMood] = useState("");
  const [lifeContext, setLifeContext] = useState("");
  const [draftId, setDraftId] = useState<DreamId | null>(dreamId ?? null);

  const createInFlightRef = useRef<Promise<DreamId> | null>(null);
  const saveTimerRef = useRef<number | null>(null);

  const services = useMemo(
    () => ({
      createDream: deps?.createDream ?? createDreamEntry,
      updateDream: deps?.updateDream ?? updateDreamEntry,
    }),
    [deps]
  );

  const isContinueEnabled = rawText.trim().length > 0;

  const buildCreateInput = (): CreateDreamInput | null => {
    const trimmed = rawText.trim();
    if (!trimmed) return null;

    const moodValue = mood.trim();
    const lifeContextValue = lifeContext.trim();

    return {
      rawText: trimmed,
      ...(moodValue ? { mood: moodValue } : {}),
      ...(lifeContextValue ? { lifeContext: lifeContextValue } : {}),
    };
  };

  const buildUpdatePatch = (): UpdateDreamInput => {
    const moodValue = mood.trim();
    const lifeContextValue = lifeContext.trim();

    return {
      rawText,
      ...(moodValue ? { mood: moodValue } : { mood: "" }),
      ...(lifeContextValue ? { lifeContext: lifeContextValue } : { lifeContext: "" }),
    };
  };

  const saveDraft = useCallback(async () => {
    if (draftId) {
      await services.updateDream(db, uid, draftId, buildUpdatePatch());
      return;
    }

    if (createInFlightRef.current) {
      await createInFlightRef.current;
      return;
    }

    const createInput = buildCreateInput();
    if (!createInput) return;

    const createPromise = services
      .createDream(db, uid, createInput)
      .then((result) => result.dreamId);

    createInFlightRef.current = createPromise;

    try {
      const createdId = await createPromise;
      setDraftId(createdId);
    } finally {
      createInFlightRef.current = null;
    }
  }, [db, uid, draftId, services, rawText, mood, lifeContext]);

  const scheduleAutosave = useCallback(() => {
    if (saveTimerRef.current !== null) {
      window.clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = window.setTimeout(() => {
      void saveDraft();
    }, autosaveDelayMs);
  }, [autosaveDelayMs, saveDraft]);

  useEffect(() => {
    scheduleAutosave();
    return () => {
      if (saveTimerRef.current !== null) {
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, [rawText, mood, lifeContext, scheduleAutosave]);

  const handleContinue = async () => {
    await saveDraft();
    if (draftId && onContinue) onContinue(draftId);
  };

  const handleBlur = () => {
    void saveDraft();
  };

  return (
    <main aria-label="Dream Entry">
      <header>
        <h1>Record your dream</h1>
        <p>Capture your dream as you remember it.</p>
      </header>

      <section>
        <label htmlFor="dream-text">Dream</label>
        <textarea
          id="dream-text"
          name="dreamText"
          placeholder="Write your dream as you remember it..."
          value={rawText}
          onChange={(event) => setRawText(event.target.value)}
          onBlur={handleBlur}
          rows={8}
        />
      </section>

      <section>
        <label htmlFor="dream-mood">Waking mood (optional)</label>
        <input
          id="dream-mood"
          name="mood"
          type="text"
          value={mood}
          onChange={(event) => setMood(event.target.value)}
          onBlur={handleBlur}
        />
      </section>

      <section>
        <label htmlFor="dream-context">Life context (optional)</label>
        <textarea
          id="dream-context"
          name="lifeContext"
          value={lifeContext}
          onChange={(event) => setLifeContext(event.target.value)}
          onBlur={handleBlur}
          rows={4}
        />
      </section>

      <button type="button" disabled={!isContinueEnabled} onClick={handleContinue}>
        Continue
      </button>
    </main>
  );
}
