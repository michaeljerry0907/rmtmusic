import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";   // if using Firestore
import { getAuth } from "firebase/auth";             // if using Auth

// Check for missing environment variables
const requiredEnvVars = {
  VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID
};

const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  alert(`⚠️ Firebase Configuration Error!\n\nMissing environment variables:\n${missingVars.join("\n")}\n\nPlease check your .env file.`);
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  alert(`❌ Firebase Initialization Failed!\n\nError: ${error.message}\n\nPlease check your Firebase configuration.`);
  throw error;
}

// Initialize Firestore
let db;
try {
  db = getFirestore(app);
} catch (error) {
  alert(`❌ Firestore Connection Failed!\n\nError: ${error.message}`);
  throw error;
}

// Initialize Auth
let auth;
try {
  auth = getAuth(app);
} catch (error) {
  alert(`❌ Firebase Auth Connection Failed!\n\nError: ${error.message}`);
  throw error;
}

export { app, db, auth };
