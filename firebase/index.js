import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD7NdmsHN_DoQbYG73eSmKZ1z30TzmD8q8",
  authDomain: "sjurados-7419f.firebaseapp.com",
  projectId: "sjurados-7419f",
  storageBucket: "sjurados-7419f.appspot.com",
  messagingSenderId: "10558815651",
  appId: "1:10558815651:web:26ac9f7df3ecc3957eae16",
  measurementId: "G-FWL86VHD3S",
  databaseURL: "https://sjurados-7419f-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);

// Configurar Auth com persistência no React Native
/* export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
}); */

export const db = getDatabase(app);

export const auth = getAuth(app);