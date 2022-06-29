// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzoqIxlaz1BL08kVp-vWqEb3kZ828TAic",
  authDomain: "rnm-upload.firebaseapp.com",
  projectId: "rnm-upload",
  storageBucket: "rnm-upload.appspot.com",
  messagingSenderId: "2078784167",
  appId: "1:2078784167:web:1e80894c1f49eafb5af982"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;