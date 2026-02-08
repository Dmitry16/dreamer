import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import { AutoAwesome as AutoAwesomeIcon } from "@mui/icons-material";
import HypothesisCard from "../../../entities/hypothesis/ui";
import type {
  DreamId,
  HypothesisDoc,
  HypothesisId,
  HypothesisFeedback,
} from "../../../shared/types/domain";

interface InterpretationPageProps {
  dreamId: DreamId;
  uid: string;
  onLoadHypotheses: (dreamId: DreamId, uid: string) => Promise<Array<{ id: HypothesisId; data: HypothesisDoc }>>;
  onGenerateHypotheses: (dreamId: DreamId, uid: string) => Promise<Array<{ id: HypothesisId; data: HypothesisDoc }>>;
  onSaveFeedback: (dreamId: DreamId, hypothesisId: HypothesisId, feedback: HypothesisFeedback) => Promise<void>;
}

export default function InterpretationPage({
  dreamId,
  uid,
  onLoadHypotheses,
  onGenerateHypotheses,
  onSaveFeedback,
}: InterpretationPageProps) {
  const [hypotheses, setHypotheses] = useState<Array<{ id: HypothesisId; data: HypothesisDoc }>>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHypotheses() {
      try {
        setLoading(true);
        const loaded = await onLoadHypotheses(dreamId, uid);
        setHypotheses(loaded);
        setError(null);
      } catch (err) {
        console.error("Failed to load hypotheses:", err);
        setError("Failed to load interpretations");
      } finally {
        setLoading(false);
      }
    }

    loadHypotheses();
  }, [dreamId, uid, onLoadHypotheses]);

  const handleGenerate = async () => {
    try {
      setGenerating(true);
      setError(null);
      const generated = await onGenerateHypotheses(dreamId, uid);
      setHypotheses(generated);
    } catch (err) {
      console.error("Failed to generate hypotheses:", err);
      setError("Failed to generate interpretations. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleFeedback = async (hypothesisId: HypothesisId, feedback: HypothesisFeedback) => {
    try {
      await onSaveFeedback(dreamId, hypothesisId, feedback);
      // Update local state to reflect feedback
      setHypotheses((prev) =>
        prev.map((h) =>
          h.id === hypothesisId
            ? { ...h, data: { ...h.data, userFeedback: feedback } }
            : h
        )
      );
    } catch (err) {
      console.error("Failed to save feedback:", err);
      // Optionally show error to user
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--color-bg-primary, #FAFAF8)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "var(--color-bg-primary, #FAFAF8)",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4}>
          {/* Header */}
          <Stack spacing={2}>
            <Typography
              variant="overline"
              sx={{
                color: "var(--color-text-secondary, #5F5F5A)",
                fontSize: "12px",
                letterSpacing: "0.1em",
              }}
            >
              Dreamer
            </Typography>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: "var(--color-text-primary, #1E1E1C)",
                fontWeight: 600,
              }}
            >
              Interpretation
            </Typography>

            {/* Ethical Disclaimer */}
            <Alert
              severity="info"
              sx={{
                backgroundColor: "var(--color-bg-secondary, #F2F2EE)",
                color: "var(--color-text-primary, #1E1E1C)",
                border: "1px solid var(--color-border-subtle, #E3E3DD)",
                "& .MuiAlert-icon": {
                  color: "var(--color-accent-primary, #6B705C)",
                },
              }}
            >
              These are invitations for reflection, not conclusions. They represent testable
              possibilities, not truths. Your own associations and feelings remain primary.
            </Alert>
          </Stack>

          {/* Error State */}
          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {/* Content */}
          {hypotheses.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 8,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "var(--color-text-muted, #8C8C86)",
                  mb: 2,
                }}
              >
                No interpretations yet
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--color-text-muted, #8C8C86)",
                  mb: 3,
                }}
              >
                Generate interpretive hypotheses to explore potential meanings in your dream
              </Typography>
              <Button
                variant="contained"
                startIcon={<AutoAwesomeIcon />}
                onClick={handleGenerate}
                disabled={generating}
                sx={{
                  backgroundColor: "var(--color-accent-primary, #6B705C)",
                  "&:hover": {
                    backgroundColor: "var(--color-accent-primary, #6B705C)",
                    opacity: 0.9,
                  },
                }}
              >
                {generating ? "Generating..." : "Generate Interpretations"}
              </Button>
            </Box>
          ) : (
            <Stack spacing={0}>
              {hypotheses.map((hypothesis) => (
                <HypothesisCard
                  key={hypothesis.id}
                  hypothesis={hypothesis}
                  onFeedback={handleFeedback}
                />
              ))}
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
