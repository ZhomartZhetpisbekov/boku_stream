// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoxMJjIbIKL_tJRsK0-gavD_u4sTkKef4",
  authDomain: "netflix-clone-d1ca5.firebaseapp.com",
  projectId: "netflix-clone-d1ca5",
  storageBucket: "netflix-clone-d1ca5.appspot.com",
  messagingSenderId: "660740193101",
  appId: "1:660740193101:web:9252c39183f4b963f9d504"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
