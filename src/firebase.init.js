// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxo4x2_ukbs-KwM2it9_6Kh3YiLvgUoPw",
  authDomain: "genius-car-services-5f46f.firebaseapp.com",
  projectId: "genius-car-services-5f46f",
  storageBucket: "genius-car-services-5f46f.appspot.com",
  messagingSenderId: "739929756128",
  appId: "1:739929756128:web:b30a63111e6645538e5b85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;