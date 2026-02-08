import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Collapse,
  Stack,
  Typography,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
} from "@mui/icons-material";
import type { HypothesisDoc, HypothesisId, HypothesisFeedback } from "../model";

interface HypothesisCardProps {
  hypothesis: { id: HypothesisId; data: HypothesisDoc };
  onFeedback: (hypothesisId: HypothesisId, feedback: HypothesisFeedback) => void;
}

function formatLensName(lens: string): string {
  // Convert snake_case to Title Case
  return lens
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function HypothesisCard({ hypothesis, onFeedback }: HypothesisCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { id, data } = hypothesis;

  const handleFeedback = (feedback: HypothesisFeedback) => {
    onFeedback(id, feedback);
  };

  return (
    <Card
      sx={{
        mb: 3,
        border: "1px solid var(--color-border-subtle, #E3E3DD)",
        boxShadow: "none",
        backgroundColor: "var(--color-bg-primary, #FAFAF8)",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Stack spacing={2}>
          {/* Lens Badge */}
          <Box>
            <Chip
              label={formatLensName(data.lens)}
              size="small"
              sx={{
                backgroundColor: "var(--color-accent-secondary, #A5A58D)",
                color: "white",
                fontWeight: 500,
                fontSize: "12px",
              }}
            />
          </Box>

          {/* Hypothesis Text */}
          <Typography
            variant="body1"
            sx={{
              color: "var(--color-text-primary, #1E1E1C)",
              fontSize: "16px",
              lineHeight: "26px",
              fontStyle: "italic",
            }}
          >
            {data.hypothesisText}
          </Typography>

          {/* Evidence Section */}
          <Box>
            <Button
              onClick={() => setExpanded(!expanded)}
              endIcon={
                <ExpandMoreIcon
                  sx={{
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                />
              }
              sx={{
                color: "var(--color-text-secondary, #5F5F5A)",
                textTransform: "none",
                fontSize: "14px",
                p: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "var(--color-text-primary, #1E1E1C)",
                },
              }}
              aria-label={expanded ? "hide evidence" : "show evidence"}
            >
              {expanded ? "Hide" : "Show"} Evidence
            </Button>

            <Collapse in={expanded}>
              <Box sx={{ mt: 2, pl: 2, borderLeft: "2px solid var(--color-border-subtle, #E3E3DD)" }}>
                <Stack spacing={1.5}>
                  {data.evidence.map((evidence, index) => (
                    <Box key={index}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "var(--color-text-secondary, #5F5F5A)",
                          fontSize: "11px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {evidence.type === "dream_text" && "From dream"}
                        {evidence.type === "element" && "Symbol/Element"}
                        {evidence.type === "association" && "Your association"}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "var(--color-text-primary, #1E1E1C)",
                          fontSize: "14px",
                          mt: 0.5,
                        }}
                      >
                        "{evidence.quote}"
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Collapse>
          </Box>

          {/* Reflective Question */}
          <Box
            sx={{
              p: 2,
              backgroundColor: "var(--color-bg-secondary, #F2F2EE)",
              borderRadius: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "var(--color-text-secondary, #5F5F5A)",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                display: "block",
                mb: 0.5,
              }}
            >
              Reflective Question
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "var(--color-text-primary, #1E1E1C)",
                fontSize: "14px",
                fontStyle: "italic",
              }}
            >
              {data.reflectiveQuestion}
            </Typography>
          </Box>

          {/* Feedback Buttons */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant={data.userFeedback === "resonates" ? "contained" : "outlined"}
              startIcon={<ThumbUpIcon />}
              onClick={() => handleFeedback("resonates")}
              sx={{
                borderColor: "var(--color-accent-primary, #6B705C)",
                color:
                  data.userFeedback === "resonates"
                    ? "white"
                    : "var(--color-accent-primary, #6B705C)",
                backgroundColor:
                  data.userFeedback === "resonates"
                    ? "var(--color-accent-primary, #6B705C)"
                    : "transparent",
                textTransform: "none",
                "&:hover": {
                  borderColor: "var(--color-accent-primary, #6B705C)",
                  backgroundColor:
                    data.userFeedback === "resonates"
                      ? "var(--color-accent-primary, #6B705C)"
                      : "rgba(107, 112, 92, 0.1)",
                },
              }}
            >
              Resonates
            </Button>
            <Button
              variant={data.userFeedback === "does_not_fit" ? "contained" : "outlined"}
              startIcon={<ThumbDownIcon />}
              onClick={() => handleFeedback("does_not_fit")}
              sx={{
                borderColor: "var(--color-text-muted, #8C8C86)",
                color:
                  data.userFeedback === "does_not_fit"
                    ? "white"
                    : "var(--color-text-muted, #8C8C86)",
                backgroundColor:
                  data.userFeedback === "does_not_fit"
                    ? "var(--color-text-muted, #8C8C86)"
                    : "transparent",
                textTransform: "none",
                "&:hover": {
                  borderColor: "var(--color-text-muted, #8C8C86)",
                  backgroundColor:
                    data.userFeedback === "does_not_fit"
                      ? "var(--color-text-muted, #8C8C86)"
                      : "rgba(140, 140, 134, 0.1)",
                },
              }}
            >
              Doesn't Fit
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}
