import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCHe2xOORKjaltMuYntGvGE8SWBm6tuDdo",
  authDomain: "final-project-7846a.firebaseapp.com",
  projectId: "final-project-7846a",
  storageBucket: "final-project-7846a.appspot.com",
  messagingSenderId: "1018467955053",
  appId: "1:1018467955053:web:53a3054b19731f6ce92a64",
  measurementId: "G-SSLFKRT3XS",
});

export const db = firebaseConfig.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export default firebaseConfig;
