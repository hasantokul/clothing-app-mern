import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider, 
  signInWithPopup
} from "firebase/auth";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXWaJ3IcVKv5Kxo98wEeIxiYMLG2uRhhI",
  authDomain: "morbin-clothing.firebaseapp.com",
  projectId: "morbin-clothing",
  storageBucket: "morbin-clothing.appspot.com",
  messagingSenderId: "736964924781",
  appId: "1:736964924781:web:636650d01206d74d6a7664",
  measurementId: "G-XWP7HC1J3Y",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const {user} = await signInWithPopup(auth, googleProvider);
  console.log(user);
  const userSnapShot = await getDoc(doc(db, "users", user.email));
  if (!userSnapShot.exists()) {
    console.log("user doesn't exists")
    await setDoc(doc(db, "users", user.email), {displayName : user.displayName});
  }
}

export const signUpUser = async (email, password, formFields) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", email), formFields);
    await sendEmailVerification(auth.currentUser);
    alert("We have sent you an email, please verify your account");
    await signOut(auth);
  } catch (err) {
    console.log(err);
  }
};

export const signInUser = async (email, password) => {
  if (!email || !password) return;

  try {
    const {user} = await signInWithEmailAndPassword(auth, email, password);
    if (!user.emailVerified) {
      alert("please verify your email");
      return await signOut(auth);
    }
    window.location.href = "/"
  } catch (err) {
    console.log(err);
  }
};

export const authStateChangeListener = (callback) => {
  return onAuthStateChanged(auth, callback)
}

export const signOutUser = async (user) => {
  await signOut(user.auth);
}
