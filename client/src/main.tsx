import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppContextProvider } from "./contexts/AppContext.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("✅ Firebase Service Worker registered:", registration);
    })
    .catch((err) => {
      console.error("❌ Firebase SW registration failed:", err);
    });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider>
      <App />
      <Toaster />
    </AppContextProvider>
  </StrictMode>
);
