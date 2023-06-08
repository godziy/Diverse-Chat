// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC96KA9lD7MLYBCgWTlHoh6TGLq7cFGbFo",
  authDomain: "firechat-acadc.firebaseapp.com",
  projectId: "firechat-acadc",
  storageBucket: "firechat-acadc.appspot.com",
  messagingSenderId: "266461004729",
  appId: "1:266461004729:web:23dccdd1ed4f8695c42c68",
  measurementId: "G-ZHGKZVE10L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
