
import { DB_REF_PLAYERS_KEYS, DB_REF_GAME_AVAILABLE_STATUSES  } from '../common/constants.json';
import { getTime, stringifyError } from '../common/functions';
import { provider, app, playersRef }   from '../firebase/configuration';
import { handleDeclineCancelGame } from './gameService'
import { toogleExistentGame, toogleIsPlaying } from './playerService';
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
        // uid, name, email, imageUrl, isOnline = false, isPlaying = false, existentChallenge = false, loggedAt = new Date()
        
        let playerReference = playersRef.child(uid);
        let objectUpdate = {[DB_REF_PLAYERS_KEYS.IS_ONLINE]: true, [DB_REF_PLAYERS_KEYS.LOGGED_AT]: getTime()}
        return await playerReference.update(objectUpdate); 
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
            let challengeClosed = false;
            if(currentGame && currentGame.uid) {
                let { player1: player1Uid, player2: player2Uid, status } = currentGame;
                // do not cancel a game that was already won [finished]
                if(status === DB_REF_GAME_AVAILABLE_STATUSES.ACCEPTED || status === DB_REF_GAME_AVAILABLE_STATUSES.STARTED) {
                    await handleDeclineCancelGame(currentGame, DB_REF_GAME_AVAILABLE_STATUSES.CANCELED);
                }
                await Promise.all(
                    [
                        toogleIsPlaying(player1Uid, false),
                        toogleIsPlaying(player2Uid, false),
                        toogleExistentGame(player1Uid, false),
                        toogleExistentGame(player2Uid, false),
                        playerReference.child(DB_REF_PLAYERS_KEYS.IS_ONLINE).set(false)
                    ]
                    );
            } else {
                await playerReference.child(DB_REF_PLAYERS_KEYS.IS_ONLINE).set(false);
            }
            updateAuthUser();
            updateAuthGame();
            await app.auth().signOut();  
        } catch (error) {
            console.log(stringifyError(error), 'error in 59');
        }
    }  
} 