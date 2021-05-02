import firebase from 'firebase/app';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCEDZVMGS-4vsYViYsPsq5GlONg4UyM3AA",
    authDomain: "my-project-36b93.firebaseapp.com",
    projectId: "my-project-36b93",
    storageBucket: "my-project-36b93.appspot.com",
    messagingSenderId: "942405178387",
    appId: "1:942405178387:web:8a18e1a483a25511e91be6"
};

firebase.initializeApp(firebaseConfig);

export default firebase;