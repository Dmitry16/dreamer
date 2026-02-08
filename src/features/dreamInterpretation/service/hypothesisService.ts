import type { Firestore } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import {
  listHypotheses,
  bulkUpsertHypotheses,
  setHypothesisFeedback,
  getDream,
  // TODO: Use these when integrating with AI service
  // listElements,
  // listAssociations,
} from "../../../services/firestore/firestoreRepo";
import type {
  DreamId,
  HypothesisDoc,
  HypothesisId,
  HypothesisFeedback,
  JungianLens,
} from "../../../shared/types/domain";

/**
 * Load existing hypotheses for a dream
 */
export async function loadHypotheses(
  db: Firestore,
  uid: string,
  dreamId: DreamId
): Promise<Array<{ id: HypothesisId; data: HypothesisDoc }>> {
  return await listHypotheses(db, uid, dreamId);
}

/**
 * Save user feedback for a hypothesis
 */
export async function saveFeedback(
  db: Firestore,
  uid: string,
  dreamId: DreamId,
  hypothesisId: HypothesisId,
  feedback: HypothesisFeedback
): Promise<void> {
  await setHypothesisFeedback(db, uid, dreamId, hypothesisId, feedback);
}

/**
 * Generate new hypotheses for a dream.
 * 
 * MVP implementation: Creates mock hypotheses for testing.
 * TODO: Integrate with AI service for actual hypothesis generation.
 * 
 * According to MVP.md:
 * - Generate 2-3 hypotheses per dream
 * - Each includes: Jungian lens, evidence references, reflective question
 * - Must be framed as hypotheses, not truths
 */
export async function generateHypotheses(
  db: Firestore,
  uid: string,
  dreamId: DreamId
): Promise<Array<{ id: HypothesisId; data: HypothesisDoc }>> {
  // Load dream context
  const dream = await getDream(db, uid, dreamId);
  if (!dream) {
    throw new Error("Dream not found");
  }

  // TODO: Load elements and associations for AI generation when integrated
  // await listElements(db, uid, dreamId);
  // await listAssociations(db, uid, dreamId);

  // MVP: Generate mock hypotheses
  // TODO: Replace with actual AI generation service
  const lenses: JungianLens[] = ["shadow", "compensation", "individuation"];
  const now = Timestamp.now();

  const hypotheses: Array<{ id: HypothesisId; data: HypothesisDoc }> = lenses.slice(0, 2).map((lens) => ({
    // Use crypto.randomUUID for better uniqueness
    id: crypto.randomUUID(),
    data: {
      lens,
      hypothesisText: generateMockHypothesisText(lens),
      evidence: [
        {
          type: "dream_text" as const,
          refId: "dream-main",
          quote: dream.rawText.slice(0, 100),
        },
      ],
      reflectiveQuestion: generateReflectiveQuestion(lens),
      createdAt: now,
    },
  }));

  // Save to Firestore
  await bulkUpsertHypotheses(db, uid, dreamId, hypotheses);

  return hypotheses;
}

/**
 * Generate mock hypothesis text based on lens
 * TODO: Replace with AI-generated content that uses dream context
 */
function generateMockHypothesisText(lens: JungianLens): string {
  const templates: Record<JungianLens, string> = {
    shadow: "This dream might reflect unacknowledged aspects of yourself that seek integration and recognition in your waking life.",
    compensation: "This dream might compensate for one-sided attitudes in your waking consciousness, offering a balancing perspective.",
    individuation: "This dream might indicate a step in your individuation journey, revealing aspects of your developing wholeness.",
    archetypal_dynamics: "This dream might express archetypal patterns that transcend personal experience and connect to universal human themes.",
    relational_anima_animus: "This dream might explore the relationship between your conscious identity and complementary unconscious qualities.",
  };

  return templates[lens];
}

/**
 * Generate reflective question based on lens
 * TODO: Make context-aware using dream content
 */
function generateReflectiveQuestion(lens: JungianLens): string {
  const questions: Record<JungianLens, string> = {
    shadow: "What parts of yourself do you find difficult to acknowledge or integrate?",
    compensation: "How might this dream balance or challenge your current waking attitudes?",
    individuation: "What aspects of yourself are seeking fuller expression in your life?",
    archetypal_dynamics: "What universal patterns or themes resonate with your current life situation?",
    relational_anima_animus: "How do the characters or relationships in this dream reflect different aspects of yourself?",
  };

  return questions[lens];
}
