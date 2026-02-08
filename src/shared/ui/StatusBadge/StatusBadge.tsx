import { Chip } from "@mui/material";
import type { DreamStatus } from "../../types/domain";

interface StatusBadgeProps {
  status: DreamStatus;
}

const statusLabels: Record<DreamStatus, string> = {
  draft: "Draft",
  structured: "Structured",
  associated: "Associated",
  interpreted: "Interpreted",
  integrated: "Integrated",
};

const statusColors: Record<DreamStatus, "default" | "primary" | "secondary"> = {
  draft: "default",
  structured: "default",
  associated: "default",
  interpreted: "primary",
  integrated: "secondary",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Chip
      label={statusLabels[status]}
      color={statusColors[status]}
      size="small"
      sx={{
        fontSize: "12px",
        fontWeight: 500,
        textTransform: "capitalize",
      }}
    />
  );
}
