import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, addDoc, collection, Firestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBbrzV0a9EwWNWcilFmRfD1fK0Ncy07B9k",
  authDomain: "netflix-289c5.firebaseapp.com",
  projectId: "netflix-289c5",
  storageBucket: "netflix-289c5.firebasestorage.app",
  messagingSenderId: "1072806276333",
  appId: "1:1072806276333:web:7fc8a21d50a332e80430e4",
  measurementId: "G-N6688Z6K01"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email,password) =>{
    try {
        await signInWithEmailAndPassword (auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};