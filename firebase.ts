// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzx3WunT9O5ffpLBD0otwEFEt8kwIS0DI",
  authDomain: "boku-stream.firebaseapp.com",
  projectId: "boku-stream",
  storageBucket: "boku-stream.appspot.com",
  messagingSenderId: "1044012570906",
  appId: "1:1044012570906:web:11082e67e8c37f575074a3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
