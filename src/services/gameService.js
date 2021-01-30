import { CatGame } from "../common/Classes";
import { DB_REF_PLAYERS_PROP_IS_ONLINE } from '../common/constants.json';
import { playersRef, gamesRef } from "../firebase/configuration";
import { stringifyError } from "./authService";
export const handleJoinGame = () => {

}

export const handleStartGame = async (player) => {
    try {
        // create the game model and store it in DB
        let gameUid = gamesRef.push().key;
        let { uid } = player;
        let game = new CatGame(gameUid, uid);
        let gameReference = gamesRef.child(uid);
        let res = await gameReference.set(game);
        console.log(res, 'stored');
    } catch (error) {
        console.log(stringifyError(error));
    }

}
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

export const subscribeForChanges = (setPlayers) => playersRef.on('child_changed', (childSnapshot, prevChildKey) => {
    console.log('there is child_changed is online is false');
    getPlayersOnline(setPlayers);
});
 

export const unsubscribeForChanges = () => {
    console.log('changes are killed, since it was unmounted');
    playersRef.off();
}
 

function transformToArray(playersObject) {
    console.log(playersObject, 'player obj');
    let players = [];
    Object.keys(playersObject).forEach((key) => {
        let player = playersObject[key]
        players.push(player);
    }); 
    return players;
}
