// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase, ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXQx1WlKHksyVb2t84UKIfV3-2wOuuuUs",
  authDomain: "intproject-bddb2.firebaseapp.com",
  projectId: "intproject-bddb2",
  storageBucket: "intproject-bddb2.appspot.com",
  messagingSenderId: "845310420194",
  appId: "1:845310420194:web:1fc0147ec8ed408a346abb",
  databaseURL: "https://intproject-bddb2-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app); // Initialize Database