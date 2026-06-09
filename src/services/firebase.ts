import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfnFIOnI9yfiIZI6PrB1zjicAF3pSAvgI",
  authDomain: "barberia-panel.firebaseapp.com",
  projectId: "barberia-panel",
  storageBucket: "barberia-panel.firebasestorage.app",
  messagingSenderId: "135865824370",
  appId: "1:135865824370:web:52ab2ffdbbaf1d41647eeb",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);