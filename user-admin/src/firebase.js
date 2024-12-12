
import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-8eecf.firebaseapp.com",
  projectId: "mern-auth-8eecf",
  storageBucket: "mern-auth-8eecf.firebasestorage.app",
  messagingSenderId: "443198500541",
  appId: "1:443198500541:web:a8e9322c4749c52ae851d4"
};


export const app = initializeApp(firebaseConfig);