import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDTpfRwWyu1PrLq7VZJJ0vyeT2qg8L48EE",
  authDomain: "glumehat.firebaseapp.com",
  databaseURL: "https://glumehat-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "glumehat",
  storageBucket: "glumehat.appspot.com",
  messagingSenderId: "1001799626374",
  appId: "1:1001799626374:web:e499fa3cf75655433cab07",
  measurementId: "G-JJTC8K0L0T"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);
