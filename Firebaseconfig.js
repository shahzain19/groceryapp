// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getApps, getApp } from 'firebase/app'; // To check existing Firebase app instances
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBvD9bnHTfABemsaMBHvub52pSuOkcamQQ",
  authDomain: "swiftcart-6105f.firebaseapp.com",
  projectId: "swiftcart-6105f",
  storageBucket: "swiftcart-6105f.firebasestorage.app",
  messagingSenderId: "426453914902",
  appId: "1:426453914902:web:4b921a0a7184e2e7abac37"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Firebase Auth only if not already initialized
let authentication;
try {
  authentication = getAuth(app); // Use existing Auth instance if available
} catch {
  authentication = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}


const database = getFirestore();

export{authentication,database}