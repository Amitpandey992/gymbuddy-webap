import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppContextProvider } from "./contexts/AppContext.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider>
      <App />
      <Toaster />
    </AppContextProvider>
  </StrictMode>
);
