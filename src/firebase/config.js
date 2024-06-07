import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC2SWahWOXn4FefOW1W1zHSli-4c8l5NLo",
  authDomain: "fir-dfdf2.firebaseapp.com",
  projectId: "fir-dfdf2",
  storageBucket: "fir-dfdf2.appspot.com",
  messagingSenderId: "350610425120",
  appId: "1:350610425120:web:ac832bc9bab3f25b3f4345"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
