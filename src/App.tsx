import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(1200px 600px at 20% 10%, #f7f3e9 0%, #f0f4f8 55%, #e5ecf4 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 4
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Typography variant="overline" color="secondary.main">
            Dreamer
          </Typography>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 700 }}>
            Build bold ideas with React, Vite, and Material UI.
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", fontSize: 18 }}>
            A clean starter with a custom theme, sensible defaults, and room to grow.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button variant="contained" size="large">
              Get Started
            </Button>
            <Button variant="outlined" size="large" color="secondary">
              Explore Components
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
