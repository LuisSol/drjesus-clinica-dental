import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/database'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOM,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PRO_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STOR_BUC,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MSG_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MES_ID
};

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();
const rtdb = firebase.database()

export { auth, storage, db, firebase, rtdb }
