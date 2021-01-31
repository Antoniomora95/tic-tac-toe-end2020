
import { app, provider, playersRef } from '../firebase/configuration';
import { DB_REF_PLAYERS_PROP_IS_ONLINE } from '../common/constants.json'

// https://firebase.google.com/docs/database/web/read-and-write?authuser=0
export const signupPlayer = async (player) => {
    try {
        let {uid} = player;
        await playersRef.child(uid).set(player);
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
        let playerReference = playersRef.child(uid);
        return await  playerReference.child(DB_REF_PLAYERS_PROP_IS_ONLINE).set(true);
    } catch (error) {
        throw error;
    }
}
export const findOnePlayer = async (uid) => {
    try {
        let playerReference = playersRef.child(uid);
        let snapshot = await playerReference.get();
        return snapshot.val();
    } catch (error) {
        throw error;
    }
}

export const signOutPlayer = (updateAuthContext, uid) => {
    return async () => {
        try {
            await app.auth().signOut();
            let playerReference = playersRef.child(uid);
            await playerReference.child(DB_REF_PLAYERS_PROP_IS_ONLINE).set(false);
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