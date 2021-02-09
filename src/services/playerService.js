
import { Player } from "../common/Classes";
import { DB_REF_PLAYERS_PROP_IS_ONLINE, DB_REF_PLAYERS_PROP_IS_PLAYING } from '../common/constants.json';
import { stringifyError } from "../common/functions";
import { playersRef } from "../firebase/configuration";

export const getPlayersOnline = async (setPlayers) => {
    try {
        // when you do not understand something select the method orderByChild --> and open the definiton on internet
        let dataSnapshot = await playersRef.orderByChild(DB_REF_PLAYERS_PROP_IS_ONLINE).equalTo(true).once('value');
        let players = dataSnapshot && dataSnapshot.val() ? dataSnapshot.val() : {};
        
        setPlayers(transformToArray(players));
    } catch (error) {
        console.log(stringifyError(error));
    }
}
export const toogleIsPlaying = async(uid, isPlaying) => {
    try {
        let playerReference = playersRef.child(uid);
        await  playerReference.child(DB_REF_PLAYERS_PROP_IS_PLAYING).set(isPlaying);
        return true;
    } catch (error) {
        console.log(stringifyError(error));
    }
}

export const subscribeForChanges = (setPlayers) => playersRef.on('child_changed', (childSnapshot, prevChildKey) => {
    getPlayersOnline(setPlayers);
});
export const subscribeForChildAdded = (setPlayers) => playersRef.on('child_added', (childSnapshot, prevChildKey) => {
    getPlayersOnline(setPlayers);
});
 

export const unsubscribeForChanges = () => {
    playersRef.off();
}
 

function transformToArray(object) {
    let players = [];
    Object.keys(object).forEach((key) => {
        let player = object[key];
        let { uid, name, email, imageUrl, isOnline, isPlaying } = player;
        players.push(new Player(uid, name, email, imageUrl, isOnline, isPlaying));
    }); 
    return players;
}