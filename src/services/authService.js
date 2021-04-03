
import { DB_REF_PLAYERS_KEYS, DB_REF_GAME_AVAILABLE_STATUSES  } from '../common/constants.json';
import { provider, app, playersRef }   from '../firebase/configuration';
import { handleDeclineCancelGame } from './gameService'
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
        return await  playerReference.child(DB_REF_PLAYERS_KEYS.IS_ONLINE).set(true);
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

export const signOutPlayer = (updateAuthUser, updateAuthGame, uid, currentGame) => {
    return async () => { 
        try {
            // set user offline, set false existent challenge and cancel game
            let playerReference = playersRef.child(uid);
            if(currentGame && currentGame.uid) {
                await handleDeclineCancelGame(currentGame, DB_REF_GAME_AVAILABLE_STATUSES.CANCELED);
            }
            await playerReference.child(DB_REF_PLAYERS_KEYS.IS_ONLINE).set(false);
            updateAuthUser();
            updateAuthGame();
            await app.auth().signOut();  
        } catch (error) {
            throw error;
        }
    } 
}