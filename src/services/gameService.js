import { CatGame } from "../common/Classes";
import { DB_REF_GAME, DB_REF_PLAYERS, DB_REF_PLAYERS_PROP_IS_ONLINE } from '../common/constants.json';
import { database } from "../firebase/configuration";
import { stringifyError } from "./authService";

export const handleJoinGame = () => {

}

export const handleStartGame = async (player) => {
    try {
        // create the game model and store it in DB
        let gameUid = database.ref().child(DB_REF_GAME).push().key;
        let { uid } = player;
        let game = new CatGame(gameUid, uid)
        let res = await database.ref(`${DB_REF_GAME}/${gameUid}`).set(game);
        console.log(res, 'stored');
        // every time a player logs in or logs out
        //var activePlayersRef = database.ref(DB_REF_ACTIVE_PLAYERS)
        //activePlayersRef.on('child_changed', (data) => {})
    } catch (error) {
        console.log(stringifyError(error));
    }

}
export const getPlayersOnline = async (setPlayers)=> {
    try {
        // when you do not understand something select the method orderByChild --> and open the definiton on internet
        let dataSnapshot = await database.ref(`${DB_REF_PLAYERS}`).orderByChild(DB_REF_PLAYERS_PROP_IS_ONLINE).equalTo(true).once('value');
        let players = dataSnapshot.val();
        setPlayers(transformToArray(players));
    } catch (error) {
        console.log(stringifyError(error));
    }
}

export const subscribeForChanges = (setPlayers) => {
        database.ref(`${DB_REF_PLAYERS}`)
            .on('child_changed', (childSnapshot, prevChildKey) => {
                getPlayersOnline(setPlayers);
            });
}
export const unsubscribeForChanges = () => {
    database.ref(`${DB_REF_PLAYERS}`).off('child_changed', subscribeForChanges);
}


function transformToArray(playersObject) {
    let players = [];
    Object.keys(playersObject).forEach((key) => {
        let player = playersObject[key]
        players.push(player);
    });
    return players;
}

