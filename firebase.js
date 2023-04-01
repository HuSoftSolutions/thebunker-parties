/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAUOr1bVPL625XjELTaE2-OwInL6lueS-g',
  authDomain: 'thebunkerparties.firebaseapp.com',
  projectId: 'thebunkerparties',
  storageBucket: 'thebunkerparties.appspot.com',
  messagingSenderId: '804722565276',
  appId: '1:804722565276:web:d927c1f27ffde106b1cd59',
  measurementId: 'G-BJCMXC46FL',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const functions = getFunctions(app);

const sendEmail = httpsCallable(functions, 'sendEmail');

onAuthStateChanged(auth, (user) => {
  if (user) {
  } else {
    signInAnonymously(auth);
  }
});

export { app, sendEmail };
