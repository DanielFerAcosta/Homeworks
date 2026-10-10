import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDmO8nPCD4nfcINlqnZxQgaswzVD2EQopM',
  authDomain: 'challenge-09-aa3d5.firebaseapp.com',
  projectId: 'challenge-09-aa3d5',
  storageBucket: 'challenge-09-aa3d5.firebasestorage.app',
  messagingSenderId: '305680480746',
  appId: '1:305680480746:web:2499533f8ba3aebca05a93',
  measurementId: 'G-RNHNL2EWZ9'
};

// Reutiliza la aplicación predeterminada si ya está inicializada.
export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

// Autenticación: registro, login y logout.
export const firebaseAuth = getAuth(firebaseApp);

// Base de datos: almacenamiento de tareas.
export const firestoreDb = getFirestore(firebaseApp);