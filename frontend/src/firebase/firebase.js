import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyBKOfgTuU99wSXdVYaMdrF0UrSY7Xdk7vo",
    authDomain: "imageecommerce-2d1ad.firebaseapp.com",
    projectId: "imageecommerce-2d1ad",
    storageBucket: "imageecommerce-2d1ad.appspot.com",
    messagingSenderId: "153781482632",
    appId: "1:153781482632:web:6683603f13f437823a9b3d",
    measurementId: "G-0PFCME9EZ8"
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}