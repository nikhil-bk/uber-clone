import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "uber-clone-next-36806.firebaseapp.com",
  projectId: "uber-clone-next-36806",
  storageBucket: "uber-clone-next-36806.appspot.com",
  messagingSenderId: "486495454642",
  appId: "1:486495454642:web:599fd15f91cf39385190ab",
  measurementId: "G-KFK2T89VQT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider=new GoogleAuthProvider()
const auth=getAuth()
export {app,provider,auth}