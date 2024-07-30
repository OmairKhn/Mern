// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAeujWW4Erlp8RtZWUQAT73LAHQhecDPys",
  authDomain: "phone-book-7c4f2.firebaseapp.com",
  projectId: "phone-book-7c4f2",
  storageBucket: "phone-book-7c4f2.appspot.com",
  messagingSenderId: "825642493951",
  appId: "1:825642493951:web:baa1515cbac7d8425069ca"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, firebaseConfig };