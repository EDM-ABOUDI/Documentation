// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyACPZMf7MLh9uIygVk5jZDjNG0h5fcPc8k",
    authDomain: "documentation-react-project.firebaseapp.com",
    projectId: "documentation-react-project",
    storageBucket: "documentation-react-project.appspot.com",
    messagingSenderId: "638047080957",
    appId: "1:638047080957:web:e789e7031383349c6c8994",
    measurementId: "G-ESHS7M0ZJ3"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
