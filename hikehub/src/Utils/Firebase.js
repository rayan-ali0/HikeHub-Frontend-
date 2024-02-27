// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3Zmw7L_iZW3OddnjaVUaL959aXThyvjY",
  authDomain: "hike-d0d50.firebaseapp.com",
  projectId: "hike-d0d50",
  storageBucket: "hike-d0d50.appspot.com",
  messagingSenderId: "570052641629",
  appId: "1:570052641629:web:10015285e7a8e9a7f45eb4",
  measurementId: "G-ZJLCMNCG30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app