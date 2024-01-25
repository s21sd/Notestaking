
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDVrM2E3QmlmfvOFncHOgHNNALwRfzrdNA",
    authDomain: "notesapp-f1792.firebaseapp.com",
    projectId: "notesapp-f1792",
    storageBucket: "notesapp-f1792.appspot.com",
    messagingSenderId: "852179649541",
    appId: "1:852179649541:web:92ff1e40845e10186b886c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
