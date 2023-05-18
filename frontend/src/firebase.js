// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCWD1dl6uPRzVuWBmNoqSHiG5bICAjmym4",
    authDomain: "react-firebase-storage-72d5a.firebaseapp.com",
    projectId: "react-firebase-storage-72d5a",
    storageBucket: "react-firebase-storage-72d5a.appspot.com",
    messagingSenderId: "935001396190",
    appId: "1:935001396190:web:5d51470706fd5952e2434f",
    measurementId: "G-QH956FRDML"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);