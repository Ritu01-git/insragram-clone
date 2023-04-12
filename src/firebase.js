import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDYwvvavhkJbxyxFLMcDwyd8-pR3S2mntY",
    authDomain: "instagram-clone-e1051.firebaseapp.com",
    projectId: "instagram-clone-e1051",
    storageBucket: "instagram-clone-e1051.appspot.com",
    messagingSenderId: "406094639964",
    appId: "1:406094639964:web:172588ffa89b649e608799",
    measurementId: "G-1QFF0E621T"
});
// const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
// const storage = firebaseApp.storage();
// export default firebaseApp;
export {db, auth};
