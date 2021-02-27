import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { DB_REF_PLAYERS, DB_REF_GAME } from '../common/constants.json';

const defaultScopes = ['profile', 'email'];
const defaultParameters = { promt: 'select_account' }
const defaultRefs = [DB_REF_PLAYERS, DB_REF_GAME];

const firebaseConfig = {
    databaseURL: process.env.REACT_APP_DATABASE,
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
}
class FirebaseManager {

    constructor(providerScopes = defaultScopes, providerParameters = defaultParameters, databaseRefs = defaultRefs) {
        debugger
        this.app = this.initializeApp();
        this.database = this.app.database();
        this.databaseReferences = this.initializeRefs(databaseRefs);
        this.provider = this.initializeProvider();
        this.addProviderScopes(providerScopes);
        this.setProviderParameters(providerParameters)
    }

    initializeApp = () => {
        // check if the app is already initialized
        return firebase.apps && firebase.apps.length > 0 ? firebase.apps[0] : firebase.initializeApp(firebaseConfig);
    }

    initializeProvider = () => {
        return new firebase.auth.GoogleAuthProvider();
    }

    addProviderScopes = (scopes) => {
        if (scopes && Array.isArray(scopes)) {
            scopes.forEach(scope => {
                this.provider.addScope(scope);
            })
        }
    }

    setProviderParameters = (parameters) => {
        this.provider.setCustomParameters(parameters);
    }

    initializeRefs = (databaseRefs) => {
        let references = {};
        databaseRefs.forEach(ref => {
            references[`${ref}Ref`] = this.database.ref(ref)
        });
        return references;
    }
    createDatabaseReference = (reference) => {
        return this.database.ref(reference)
    }
}

let firebaseManager = new FirebaseManager();

console.log('really', firebaseManager, 'sdsd');
export const { app, database, databaseReferences, provider } = firebaseManager 