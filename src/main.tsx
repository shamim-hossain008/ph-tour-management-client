import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./providers/theme.providers";
import { store } from "./redux/store";
import { router } from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
);
