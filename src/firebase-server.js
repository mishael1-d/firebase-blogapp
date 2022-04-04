// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeeHNQ9NXmpKYO1PDZ9qe_AnsClZoUTtI",
  authDomain: "blogproject-fa980.firebaseapp.com",
  projectId: "blogproject-fa980",
  storageBucket: "blogproject-fa980.appspot.com",
  messagingSenderId: "949903099972",
  appId: "1:949903099972:web:57118489a419d139299411"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebase = app
export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()