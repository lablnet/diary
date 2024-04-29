import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkQe0tqgET22AuM-ZrDSO-Exigu8dPvUU",
  authDomain: "lablnet-86a04.firebaseapp.com",
  projectId: "lablnet-86a04",
  storageBucket: "lablnet-86a04.appspot.com",
  messagingSenderId: "489647771343",
  appId: "1:489647771343:web:f45ec8cbf2e2d22549f1ba"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth()
const firestore = getFirestore(firebaseApp)
// const analytics = getAnalytics(app)
const gProvider = new GoogleAuthProvider()

export {
  auth,
  firebaseApp,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  firestore,
  signInWithPopup,
  gProvider,
}
