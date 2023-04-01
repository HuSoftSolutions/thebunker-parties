/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';

console.log(process.env.NEXT_PUBLIC_API_KEY);
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const functions = getFunctions(app);

console.log('');

const sendEmail = httpsCallable(functions, 'sendEmail');

onAuthStateChanged(auth, (user) => {
  if (user) {
  } else {
    signInAnonymously(auth);
  }
});

export { app, sendEmail };
