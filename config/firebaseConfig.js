import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA8w2fTxopx4tkmFCRFTt6_iWumH0mKRns",
    authDomain: "carify-c094d.firebaseapp.com",
    projectId: "carify-c094d",
    storageBucket: "carify-c094d.appspot.com",
    messagingSenderId: "706963543358",
    appId: "1:706963543358:web:a67d0ed2afcba6a2ab886f",
    measurementId: "G-DMR712HJ5H"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

firebase.firestore();

export default firebase;