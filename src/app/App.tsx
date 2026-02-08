import { useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import DashboardPage from "../screens/DashboardPage";
import { InterpretationPageContainer } from "../features/dreamInterpretation";
import type { DreamId } from "../shared/types/domain";

type Page = "dashboard" | "interpretation";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [selectedDreamId, setSelectedDreamId] = useState<DreamId | null>(null);

  // Simple demo navigation
  const handleNavigateToInterpretation = (dreamId: DreamId) => {
    setSelectedDreamId(dreamId);
    setCurrentPage("interpretation");
  };

  const handleNavigateToDashboard = () => {
    setCurrentPage("dashboard");
    setSelectedDreamId(null);
  };

  // Render based on current page
  if (currentPage === "interpretation" && selectedDreamId) {
    return (
      <Box>
        <Box sx={{ p: 2, borderBottom: "1px solid var(--color-border-subtle, #E3E3DD)" }}>
          <Container maxWidth="md">
            <Button onClick={handleNavigateToDashboard} variant="text">
              ← Back to Dashboard
            </Button>
          </Container>
        </Box>
        <InterpretationPageContainer dreamId={selectedDreamId} />
      </Box>
    );
  }

  return (
    <Box>
      {/* Demo: Add a simple navigation hint */}
      <Box
        sx={{
          p: 2,
          backgroundColor: "var(--color-bg-secondary, #F2F2EE)",
          borderBottom: "1px solid var(--color-border-subtle, #E3E3DD)",
        }}
      >
        <Container maxWidth="md">
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="caption" sx={{ color: "var(--color-text-secondary, #5F5F5A)" }}>
              Demo: Click on a dream to view interpretation options
            </Typography>
          </Stack>
        </Container>
      </Box>
      <DashboardPage onNavigateToInterpretation={handleNavigateToInterpretation} />
    </Box>
  );
}
