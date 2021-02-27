import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import {DB_REF_PLAYERS, DB_REF_GAME} from '../common/constants.json';

const firebaseConfig = {
    databaseURL: process.env.REACT_APP_DATABASE,
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID 
};
const app = firebase.apps && firebase.apps.length > 0 ? firebase.apps[0] : firebase.initializeApp(firebaseConfig)

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

console.log(provider, 'deas');
const database = app.database();

const playersRef = database.ref(`${DB_REF_PLAYERS}`);
const gamesRef = database.ref(`${DB_REF_GAME}`);

export  {
    provider, app, database, playersRef, gamesRef
}

