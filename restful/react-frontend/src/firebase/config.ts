import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBaqaB0rJ_C6jllGJkEkA7f193W4xqfY1M",
    authDomain: "relaxia-services.firebaseapp.com",
    projectId: "relaxia-services",
    storageBucket: "relaxia-services.appspot.com",
    messagingSenderId: "749853126635",
    appId: "1:749853126635:web:45fe57e76a2a793a0a33ae",
    measurementId: "G-P59LZ5SMDZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);