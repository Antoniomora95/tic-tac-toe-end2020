
import { DB_REF_PLAYERS_PROP_IS_ONLINE } from '../common/constants.json'
import { provider, app, playersRef }   from '../firebase/configuration'
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
            let playerReference = playersRef.child(uid);
            console.log(playerReference, 'player ref');
            await playerReference.child(DB_REF_PLAYERS_PROP_IS_ONLINE).set(false);
            updateAuthContext({});
            await app.auth().signOut();  
        } catch (error) {
            throw error;
        }
    } 
}