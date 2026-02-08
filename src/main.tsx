import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { initFirebase, ensureAnonymousAuth } from "./data/firebase";

import "./styles/dreamer-tokens.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0f4c81"
    },
    secondary: {
      main: "#d64545"
    }
  }
});

initFirebase();
ensureAnonymousAuth(); // or await inside app bootstrap if you prefer

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
