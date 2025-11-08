import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { app } from './config';

let auth: Auth;
let firestore: Firestore;

function initializeFirebase() {
  if (!app) {
    throw new Error('Firebase has not been initialized. Please check your configuration.');
  }

  auth = getAuth(app);
  firestore = getFirestore(app);

  return { app, auth, firestore };
}

export { initializeFirebase, app, auth, firestore };
