import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@radix-ui/themes/styles.css";
import "./index.css";
import "./styles/theme.css";
import App from "./App.tsx";
import { AppContextProvider } from "./contexts/AppContext.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import { Theme } from "@radix-ui/themes";

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
        <Theme>
            <AppContextProvider>
                <App />
                <Toaster />
            </AppContextProvider>
        </Theme>
    </StrictMode>
);
