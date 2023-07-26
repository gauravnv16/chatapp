import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getDatabase } from "firebase/database";
import { GoogleAuthProvider } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   databaseURL: import.meta.env.VITE_DATABASE_URL,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
//   measurementId: import.meta.VITE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDw8O28Sw8y3OeA_MmUi3v7Bwl-H5OlAVw",
  authDomain: "glumechat-d7b20.firebaseapp.com",
  projectId: "glumechat-d7b20",
  storageBucket: "glumechat-d7b20.appspot.com",
  messagingSenderId: "142380434660",
  appId: "1:142380434660:web:f5a3acd46620ac41b798f1",
  measurementId: "G-JWVFXCRZ2L",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
// export const database = getDatabase(app);
