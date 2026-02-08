import { useCallback, useEffect, useMemo, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes, useNavigate, useParams } from "react-router";
import type { Firestore } from "firebase/firestore";
import {
  AppBar,
  Box,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import DashboardPage from "../screens/DashboardPage";
import DreamEntryPage from "../features/dreamCapture/ui/DreamEntryPage";
import DreamIntegrationPage from "../features/dreamIntegration/ui/DreamIntegrationPage";
import { ensureAnonymousAuth, getDb } from "./config/firebase";
import type { DreamId, UID } from "../shared/types/domain";

type NavItem = {
  label: string;
  path: string;
  requiresActiveDream?: boolean;
};

function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        textAlign: "center",
        color: "var(--color-text-secondary, #5F5F5A)",
      }}
    >
      <Typography variant="h4" sx={{ color: "var(--color-text-primary, #1E1E1C)", mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 520 }}>
        {description}
      </Typography>
    </Box>
  );
}

function DreamSessionPlaceholder() {
  const { dreamId } = useParams();

  return (
    <PlaceholderPage
      title="Dream Session"
      description={
        dreamId
          ? `Viewing dream ${dreamId}. This screen will host the session view.`
          : "Select a dream to continue this session."
      }
    />
  );
}

function DreamEntryScreen({ onDreamSelect }: { onDreamSelect: (dreamId: DreamId) => void }) {
  const navigate = useNavigate();
  const [state, setState] = useState<{
    status: "loading" | "ready" | "error";
    db: Firestore | null;
    uid: UID | null;
  }>({ status: "loading", db: null, uid: null });

  useEffect(() => {
    let isActive = true;

    async function init() {
      try {
        const user = await ensureAnonymousAuth();
        if (!isActive) return;
        setState({ status: "ready", db: getDb(), uid: user.uid as UID });
      } catch (error) {
        console.error("Failed to initialize dream entry:", error);
        if (!isActive) return;
        setState({ status: "error", db: null, uid: null });
      }
    }

    init();

    return () => {
      isActive = false;
    };
  }, []);

  if (state.status === "loading") {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (state.status === "error" || !state.db || !state.uid) {
    return (
      <PlaceholderPage
        title="Dream Entry"
        description="We could not start dream entry yet. Please try again in a moment."
      />
    );
  }

  return (
    <DreamEntryPage
      db={state.db}
      uid={state.uid}
      onContinue={(dreamId: DreamId) => {
        onDreamSelect(dreamId);
        navigate(`/dreams/${dreamId}`);
      }}
    />
  );
}

function DreamSessionRoute({ onDreamSelect }: { onDreamSelect: (dreamId: DreamId) => void }) {
  const { dreamId } = useParams();

  useEffect(() => {
    if (dreamId) onDreamSelect(dreamId as DreamId);
  }, [dreamId, onDreamSelect]);

  return <DreamSessionPlaceholder />;
}

function DreamIntegrationRoute({ onDreamSelect }: { onDreamSelect: (dreamId: DreamId) => void }) {
  const { dreamId } = useParams();

  useEffect(() => {
    if (dreamId) onDreamSelect(dreamId as DreamId);
  }, [dreamId, onDreamSelect]);

  return <DreamIntegrationPage dreamId={dreamId as DreamId | undefined} />;
}

function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeDreamId, setActiveDreamId] = useState<DreamId | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("dreamer.activeDreamId");
    if (stored) setActiveDreamId(stored as DreamId);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (activeDreamId) {
      window.localStorage.setItem("dreamer.activeDreamId", activeDreamId);
    } else {
      window.localStorage.removeItem("dreamer.activeDreamId");
    }
  }, [activeDreamId]);

  const handleDreamSelect = useCallback((dreamId: DreamId) => {
    setActiveDreamId(dreamId);
  }, []);

  const navItems = useMemo<NavItem[]>(
    () => [
      { label: "Dashboard", path: "/" },
      { label: "Record a Dream", path: "/dreams/new" },
      {
        label: "Dream Session View",
        path: activeDreamId ? `/dreams/${activeDreamId}` : "/dreams/active",
        requiresActiveDream: true,
      },
      { label: "Dream Breakdown", path: "/dreams/breakdown" },
      { label: "Associations", path: "/dreams/associations" },
      { label: "Interpretation", path: "/dreams/interpretation" },
      {
        label: "Integration",
        path: activeDreamId ? `/dreams/${activeDreamId}/integration` : "/dreams/integration",
      },
      { label: "Settings", path: "/settings" },
    ],
    [activeDreamId]
  );

  const visibleNavItems = navItems.filter(
    (item) => !item.requiresActiveDream || Boolean(activeDreamId)
  );

  const handleCloseDrawer = () => setDrawerOpen(false);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "var(--color-bg-primary, #FAFAF8)" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "var(--color-bg-secondary, #F2F2EE)",
          color: "var(--color-text-primary, #1E1E1C)",
          borderBottom: "1px solid var(--color-border-subtle, #E3E3DD)",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Dreamer
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: "var(--color-bg-primary, #FAFAF8)",
            color: "var(--color-text-primary, #1E1E1C)",
          },
        }}
      >
        <Box component="nav" aria-label="Primary navigation" sx={{ mt: 1 }}>
          <List>
            {visibleNavItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={handleCloseDrawer}
                  sx={{
                    px: 3,
                    py: 1.5,
                    color: "inherit",
                    textDecoration: "none",
                    "&.active": {
                      backgroundColor: "var(--color-bg-secondary, #F2F2EE)",
                    },
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ borderColor: "var(--color-border-subtle, #E3E3DD)" }} />
        </Box>
      </Drawer>

      <Toolbar />

      <Routes>
        <Route path="/" element={<DashboardPage onDreamSelect={handleDreamSelect} />} />
        <Route
          path="/dreams/new"
          element={<DreamEntryScreen onDreamSelect={handleDreamSelect} />}
        />
        <Route
          path="/dreams/:dreamId"
          element={<DreamSessionRoute onDreamSelect={handleDreamSelect} />}
        />
        <Route
          path="/dreams/breakdown"
          element={
            <PlaceholderPage
              title="Dream Breakdown"
              description="Structure your dream into characters, symbols, places, and emotions."
            />
          }
        />
        <Route
          path="/dreams/associations"
          element={
            <PlaceholderPage
              title="Associations"
              description="Capture personal meanings and emotional tone for each symbol."
            />
          }
        />
        <Route
          path="/dreams/interpretation"
          element={
            <PlaceholderPage
              title="Interpretation"
              description="Review hypotheses and reflect on how they resonate."
            />
          }
        />
        <Route path="/dreams/integration" element={<DreamIntegrationPage />} />
        <Route
          path="/dreams/:dreamId/integration"
          element={<DreamIntegrationRoute onDreamSelect={handleDreamSelect} />}
        />
        <Route
          path="/settings"
          element={
            <PlaceholderPage
              title="Settings"
              description="Manage your API key and preferences for Dreamer."
            />
          }
        />
      </Routes>
    </Box>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
