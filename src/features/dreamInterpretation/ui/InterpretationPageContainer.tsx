import InterpretationPage from "./InterpretationPage";
import { getDb, ensureAnonymousAuth } from "../../../app/config/firebase";
import {
  loadHypotheses,
  saveFeedback,
  generateHypotheses,
} from "../service";
import type { DreamId, HypothesisId, HypothesisFeedback } from "../../../shared/types/domain";
import { useEffect, useState } from "react";

interface InterpretationPageContainerProps {
  dreamId: DreamId;
}

/**
 * Connected container for InterpretationPage
 * Wires up Firestore and service layer
 */
export default function InterpretationPageContainer({ dreamId }: InterpretationPageContainerProps) {
  const [uid, setUid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const user = await ensureAnonymousAuth();
        setUid(user.uid);
      } catch (err) {
        console.error("Failed to authenticate:", err);
        setError("Authentication failed");
      }
    }

    init();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!uid) {
    return <div>Loading...</div>;
  }

  const db = getDb();

  return (
    <InterpretationPage
      dreamId={dreamId}
      uid={uid}
      onLoadHypotheses={(dId, u) => loadHypotheses(db, u, dId)}
      onGenerateHypotheses={(dId, u) => generateHypotheses(db, u, dId)}
      onSaveFeedback={(dId: DreamId, hId: HypothesisId, feedback: HypothesisFeedback) =>
        saveFeedback(db, uid, dId, hId, feedback)
      }
    />
  );
}
