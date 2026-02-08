import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import DreamListItem from "../entities/dream/ui";
import { subscribeDreams } from "../services/firestore/firestoreRepo";
import { getDb, ensureAnonymousAuth } from "../app/config/firebase";
import type { DreamDoc, DreamId } from "../shared/types/domain";

interface DashboardPageProps {
  onNavigateToInterpretation?: (dreamId: DreamId) => void;
}

export default function DashboardPage({ onNavigateToInterpretation }: DashboardPageProps = {}) {
  const [dreams, setDreams] = useState<Array<{ id: DreamId; data: DreamDoc }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    async function init() {
      try {
        const user = await ensureAnonymousAuth();

        const db = getDb();
        unsubscribe = subscribeDreams(db, user.uid, (dreamList) => {
          setDreams(dreamList);
          setLoading(false);
        });
      } catch (error) {
        console.error("Failed to initialize dashboard:", error);
        setLoading(false);
      }
    }

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleRecordDream = () => {
    // TODO: Navigate to dream entry page
    console.log("Record a dream");
  };

  const handleDreamClick = (dreamId: DreamId) => {
    // Navigate to interpretation if handler provided, otherwise log
    if (onNavigateToInterpretation) {
      onNavigateToInterpretation(dreamId);
    } else {
      console.log("Open dream:", dreamId);
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
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  color: "var(--color-text-primary, #1E1E1C)",
                  fontWeight: 600,
                }}
              >
                Dream History
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleRecordDream}
                sx={{
                  backgroundColor: "var(--color-accent-primary, #6B705C)",
                  "&:hover": {
                    backgroundColor: "var(--color-accent-primary, #6B705C)",
                    opacity: 0.9,
                  },
                }}
              >
                Record a Dream
              </Button>
            </Stack>
          </Stack>

          {/* Dream List or Empty State */}
          {dreams.length === 0 ? (
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
                No dreams yet
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--color-text-muted, #8C8C86)",
                  mb: 3,
                }}
              >
                Start your dreamwork journey by recording your first dream
              </Typography>
              <Button
                variant="outlined"
                onClick={handleRecordDream}
                sx={{
                  borderColor: "var(--color-accent-primary, #6B705C)",
                  color: "var(--color-accent-primary, #6B705C)",
                }}
              >
                Get Started
              </Button>
            </Box>
          ) : (
            <Stack spacing={0}>
              {dreams.map((dream) => (
                <DreamListItem
                  key={dream.id}
                  dream={dream}
                  onClick={handleDreamClick}
                />
              ))}
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
