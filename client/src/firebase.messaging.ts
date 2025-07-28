import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Debug: Log environment variables
console.log("Firebase Config Check:", {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? "✅ Set" : "❌ Missing",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
        ? "✅ Set"
        : "❌ Missing",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
        ? "✅ Set"
        : "❌ Missing",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
        ? "✅ Set"
        : "❌ Missing",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
        ? "✅ Set"
        : "❌ Missing",
    appId: import.meta.env.VITE_FIREBASE_MESSAGING_APP_ID ? "✅ Set" : "❌ Missing",
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY ? "✅ Set" : "❌ Missing",
});

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_MESSAGING_APP_ID,
};

// Debug: Log the config object
console.log("Firebase Config Object:", firebaseConfig);

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

console.log("Firebase App initialized:", app);
console.log("Firebase Messaging initialized:", messaging);

export const requestPermissionAndGetToken = async () => {
    try {
        const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        });
        if (token) {
            console.log("FCM Token:", token);
            return token;
        } else {
            console.warn("No registration token available.");
        }
    } catch (error) {
        console.error("An error occurred while retrieving token. ", error);
    }
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("Message received. ", payload);
            resolve(payload);
        });
    });
