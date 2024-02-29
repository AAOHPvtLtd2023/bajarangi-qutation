import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import 'firebase/compat/database'


const firebaseConfig = {
    apiKey: "AIzaSyD7cGu7WmkvjeZjKsNZF8XhvOnsvxvRDH0",
    authDomain: "bajarangi-quotation-2024.firebaseapp.com",
    projectId: "bajarangi-quotation-2024",
    storageBucket: "bajarangi-quotation-2024.appspot.com",
    messagingSenderId: "667385552315",
    appId: "1:667385552315:web:db4ca98683351efe83389e",
    measurementId: "G-7BX1Y68ZX1"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const database = firebase.database();


export default firebase;