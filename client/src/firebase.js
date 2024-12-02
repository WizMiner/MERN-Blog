// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-fc4ec.firebaseapp.com",
  projectId: "mern-blog-fc4ec",
  storageBucket: "mern-blog-fc4ec.firebasestorage.app",
  messagingSenderId: "828949419660",
  appId: "1:828949419660:web:587c18c514cbae1cc5cda9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
