import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNI8XeL40j6zr716WxmX3Ly5hsQsIbZAU",
  authDomain: "cartao-desconto-legal.firebaseapp.com",
  projectId: "cartao-desconto-legal",
  storageBucket: "cartao-desconto-legal.firebasestorage.app",
  messagingSenderId: "941828558860",
  appId: "1:941828558860:web:07387f224c320137cc9e29",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const db = getFirestore(app)
export {app, auth, db}
