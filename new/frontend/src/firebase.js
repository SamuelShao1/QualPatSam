

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
apiKey: "AIzaSyB5uoRRbbrEUGdS00roOE5An2FLi7WvRYo",
  authDomain: "qualpat.firebaseapp.com",
  projectId: "qualpat",
  storageBucket: "qualpat.appspot.com",
  messagingSenderId: "590220504424",
  appId: "1:590220504424:web:71f2405699ff7637fcfadd",
  measurementId: "G-PSZRXCBG4E"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export const db = getFirestore(app);

export { auth, storage }