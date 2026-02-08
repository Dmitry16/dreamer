import { Box, Card, CardActionArea, Stack, Typography } from "@mui/material";
import StatusBadge from "../../../shared/ui/StatusBadge";
import type { DreamDoc, DreamId } from "../model/types";

interface DreamListItemProps {
  dream: { id: DreamId; data: DreamDoc };
  onClick: (dreamId: DreamId) => void;
}

const MAX_EXCERPT_LENGTH = 120;

function formatDreamDate(timestamp: { toDate: () => Date }): string {
  const date = timestamp.toDate();
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export default function DreamListItem({ dream, onClick }: DreamListItemProps) {
  const { id, data } = dream;
  const excerpt = truncateText(data.rawText, MAX_EXCERPT_LENGTH);
  const dateStr = formatDreamDate(data.dreamedAt);

  return (
    <Card
      sx={{
        mb: 2,
        border: "1px solid var(--color-border-subtle, #E3E3DD)",
        boxShadow: "none",
        "&:hover": {
          backgroundColor: "var(--color-bg-secondary, #F2F2EE)",
        },
      }}
    >
      <CardActionArea onClick={() => onClick(id)}>
        <Box sx={{ p: 3 }}>
          <Stack spacing={1.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography
                variant="caption"
                sx={{
                  color: "var(--color-text-secondary, #5F5F5A)",
                  fontSize: "12px",
                }}
              >
                {dateStr}
              </Typography>
              <StatusBadge status={data.status} />
            </Stack>

            <Typography
              variant="body1"
              sx={{
                color: "var(--color-text-primary, #1E1E1C)",
                fontSize: "16px",
                lineHeight: "26px",
              }}
            >
              {excerpt}
            </Typography>

            {data.mood && (
              <Typography
                variant="caption"
                sx={{
                  color: "var(--color-text-muted, #8C8C86)",
                  fontSize: "12px",
                  fontStyle: "italic",
                }}
              >
                Mood: {data.mood}
              </Typography>
            )}
          </Stack>
        </Box>
      </CardActionArea>
    </Card>
  );
}
