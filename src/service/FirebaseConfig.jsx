// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNuzBM72jZCUiR7fky8NsXLFclnr0IW6Y",
  authDomain: "trip-mates.firebaseapp.com",
  projectId: "trip-mates",
  storageBucket: "trip-mates.firebasestorage.app",
  messagingSenderId: "73465680311",
  appId: "1:73465680311:web:fcb2a58988ef9a2a655832",
  measurementId: "G-09LMLNRMK7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);