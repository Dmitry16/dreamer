import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { NavLink } from "react-router";
import type { DreamId } from "../../../shared/types/domain";

type DreamIntegrationPageProps = {
  dreamId?: DreamId;
};

const DEFAULT_QUESTIONS = [
  "What feels most alive or unfinished about this dream right now?",
  "What small step could honor the feeling this dream leaves you with?",
];

export default function DreamIntegrationPage({ dreamId }: DreamIntegrationPageProps) {
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
          <Stack spacing={1}>
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
              Integration
            </Typography>
          </Stack>

          {!dreamId ? (
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                borderColor: "var(--color-border-subtle, #E3E3DD)",
                backgroundColor: "var(--color-bg-card, #FFFFFF)",
              }}
            >
              <Stack spacing={2}>
                <Typography
                  variant="h6"
                  sx={{ color: "var(--color-text-primary, #1E1E1C)" }}
                >
                  Choose a dream to continue integration
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "var(--color-text-muted, #8C8C86)" }}
                >
                  Select a dream from your history or record a new one to begin
                  integration.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    variant="outlined"
                    component={NavLink}
                    to="/"
                    sx={{
                      borderColor: "var(--color-accent-primary, #6B705C)",
                      color: "var(--color-accent-primary, #6B705C)",
                    }}
                  >
                    View Dashboard
                  </Button>
                  <Button
                    variant="contained"
                    component={NavLink}
                    to="/dreams/new"
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
            </Paper>
          ) : (
            <Stack spacing={3}>
              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  borderColor: "var(--color-border-subtle, #E3E3DD)",
                  backgroundColor: "var(--color-bg-card, #FFFFFF)",
                }}
              >
                <Stack spacing={2}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ color: "var(--color-text-primary, #1E1E1C)" }}
                  >
                    Reflective Summary
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "var(--color-text-secondary, #5F5F5A)" }}
                  >
                    This is a gentle summary of what has surfaced so far. Let it
                    be a starting point rather than a conclusion.
                  </Typography>
                </Stack>
              </Paper>

              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  borderColor: "var(--color-border-subtle, #E3E3DD)",
                  backgroundColor: "var(--color-bg-card, #FFFFFF)",
                }}
              >
                <Stack spacing={2}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ color: "var(--color-text-primary, #1E1E1C)" }}
                  >
                    Reflective Questions
                  </Typography>
                  <Stack spacing={1.5}>
                    {DEFAULT_QUESTIONS.map((question) => (
                      <Typography
                        key={question}
                        variant="body1"
                        sx={{ color: "var(--color-text-secondary, #5F5F5A)" }}
                      >
                        {question}
                      </Typography>
                    ))}
                  </Stack>
                </Stack>
              </Paper>

              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  borderColor: "var(--color-border-subtle, #E3E3DD)",
                  backgroundColor: "var(--color-bg-card, #FFFFFF)",
                }}
              >
                <Stack spacing={2}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ color: "var(--color-text-primary, #1E1E1C)" }}
                  >
                    Practice Suggestion
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "var(--color-text-secondary, #5F5F5A)" }}
                  >
                    Try a small, grounding action that echoes the dream's feeling
                    or image. Keep it gentle and optional.
                  </Typography>
                </Stack>
              </Paper>

              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  borderColor: "var(--color-border-subtle, #E3E3DD)",
                  backgroundColor: "var(--color-bg-card, #FFFFFF)",
                }}
              >
                <Stack spacing={2}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ color: "var(--color-text-primary, #1E1E1C)" }}
                  >
                    Journal
                  </Typography>
                  <TextField
                    label="Journal (optional)"
                    multiline
                    minRows={4}
                    placeholder="Write anything that feels worth keeping."
                    sx={{
                      "& .MuiInputBase-root": {
                        backgroundColor: "var(--color-bg-secondary, #F2F2EE)",
                      },
                    }}
                  />
                </Stack>
              </Paper>
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
