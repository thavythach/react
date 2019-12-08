import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCFmM2wgdhI8X-5HS_wP5XxR42izWyAEew",
    authDomain: "crown-db-3f008.firebaseapp.com",
    databaseURL: "https://crown-db-3f008.firebaseio.com",
    projectId: "crown-db-3f008",
    storageBucket: "crown-db-3f008.appspot.com",
    messagingSenderId: "1071502024406",
    appId: "1:1071502024406:web:0386c4016f056a48d7f377",
    measurementId: "G-KGCXN005BD"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    
    // if user doesn't exist
    if (!userAuth) return;

    // user exists
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    if (!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
} 

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Set up google authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account '});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;