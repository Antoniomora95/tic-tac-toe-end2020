
import { Player } from "../common/Classes";
import { DB_REF_PLAYERS_KEYS } from '../common/constants.json';
import { getTime, stringifyError } from "../common/functions";
import {  playersRef } from "../firebase/configuration";


export const getPlayersOnline = async (setPlayers) => {
    try {
        // when you do not understand something select the method orderByChild --> and open the definiton on internet
        let dataSnapshot = await playersRef.orderByChild(DB_REF_PLAYERS_KEYS.IS_ONLINE).equalTo(true).once('value');
        let players = dataSnapshot && dataSnapshot.val() ? dataSnapshot.val() : {};
        setPlayers(transformToArray(players));
    } catch (error) {
        console.log(stringifyError(error));
    }
}
export const toogleIsPlaying = async(uid, isPlaying) => {
    try {
        let playerReference = playersRef.child(uid);
        await  playerReference.child(DB_REF_PLAYERS_KEYS.IS_PLAYING).set(isPlaying);
        return true;
    } catch (error) {
        console.log(stringifyError(error));
    }
}
export const toogleExistentGame = async(uid, existentChallenge) => {
    try {
        let playerReference = playersRef.child(uid);
        await playerReference.child(DB_REF_PLAYERS_KEYS.EXISTENT_CHALLENGE).set(existentChallenge);
        return true;
    } catch (error) {
        console.log(stringifyError(error));
    }
}

export const subscribeChangedPlayers = (setPlayers) => playersRef.on('child_changed', (childSnapshot, prevChildKey) => {
    console.log('child changed');
    getPlayersOnline(setPlayers);
});
export const subscribeAddedPlayers = (setPlayers) => playersRef.on('child_added', (childSnapshot, prevChildKey) => {
    console.log('child added');
    getPlayersOnline(setPlayers);
});
 

export const unsubscribeFromPlayers = () => {
    playersRef.off();
}
 

function transformToArray(object) {
    let players = [];
    Object.keys(object).forEach((key) => {
        let player = object[key];
        let { uid, name, email, imageUrl, isOnline, isPlaying, existentChallenge, loggedAt } = player;
        players.push(new Player(uid, name, email, imageUrl, isOnline, isPlaying, existentChallenge, loggedAt));
    });
    return players;
}