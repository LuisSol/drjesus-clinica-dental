import * as admin from 'firebase-admin';

const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;

if(!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PRO_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            /* https://stackoverflow.com/a/41044630/1332513 */
            privateKey: firebasePrivateKey.replace(/\\n/g, '\n')
        }),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL
    });
}

export const verifyToken = (token) => {
    return admin.auth().verifyIdToken(token)
           .catch(error => { throw error } );
}

export const getUserData = (uid) => {
    return admin.auth().getUser(uid);
}