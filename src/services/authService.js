
import { app, database, provider } from '../firebase/configuration';
import { DB_REF_PLAYERS, DB_REF_PLAYERS_PROP_IS_ONLINE } from '../common/constants.json'

// https://firebase.google.com/docs/database/web/read-and-write?authuser=0
export const signupPlayer = async (player) => {
    try {
        let {uid} = player;
        await database.ref(`${DB_REF_PLAYERS}/${uid}`).set(player);
        return true;
    } catch (error) {
        throw error;
    }
}
export const loginWithPopup = async() => {
    try {
        let { user: firebasePlayer }  = await app.auth().signInWithPopup(provider);
        return firebasePlayer;
    } catch (error) {
        throw error;
    }
}
export const setPlayerOnline = async(uid) => {
    try {
        return await database.ref(`${DB_REF_PLAYERS}/${uid}`).child(DB_REF_PLAYERS_PROP_IS_ONLINE).set(true);
    } catch (error) {
        throw error;
    }
}
export const findOnePlayer = async (uid) => {
    try {
        let snapshot = await database.ref(`${DB_REF_PLAYERS}/${uid}`).get();
        return snapshot.val();
    } catch (error) {
        throw error;
    }
}

export const signOutPlayer = (updateAuthContext, uid) => {
    return async () => {
        try {
            await app.auth().signOut();
            await database.ref(`${DB_REF_PLAYERS}/${uid}`).child(DB_REF_PLAYERS_PROP_IS_ONLINE).set(false);
            updateAuthContext({});
        } catch (error) {
            throw error;
        }
    }
}

export const stringifyError = error => {
    if(error instanceof Error) {
        return error.toString();
    } else {
        return JSON.stringify(error);
    }
}