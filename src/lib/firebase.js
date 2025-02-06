// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_FIREBASE_DOMAIN_KEY,
  // databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_KEY,
  // projectId: import.meta.env.VITE_FIREBASE_PROJECT_KEY,
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_KEY,
  // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSENGER_KEY,
  // appId: import.meta.env.VITE_FIREBASE_APPID_KEY,
  authDomain: "chat-9b726.firebaseapp.com",
  databaseURL: "https://chat-9b726-default-rtdb.firebaseio.com",
  projectId: "chat-9b726",
  storageBucket: "chat-9b726.appspot.com",
  messagingSenderId: "687523257080",
  appId: "1:687523257080:web:57b58906ceb711d040b90d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
