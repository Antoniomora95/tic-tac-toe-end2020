import { CatGame } from "../common/Classes";
import { DB_REF_GAME, DB_REF_ACTIVE_PLAYERS } from '../common/constants.json';
import { database } from "../firebase/configuration";
import { stringifyError } from "./authService";

export const handleJoinGame = () => {

}

export const handleStartGame =  async(player) => {
    try {
        // create the game model and store it in DB
    let gameUid = database.ref().child(DB_REF_GAME).push().key;
    let { uid } = player;
    let game = new CatGame(gameUid, uid)
        let res = await database.ref(`${DB_REF_GAME}/${gameUid}`).set(game);
        console.log(res, 'stored');
        // every time a player logs in or logs out
        var activePlayersRef = database.ref(DB_REF_ACTIVE_PLAYERS)
        activePlayersRef.on('child_changed', (data) => {

        })
    } catch (error) {
        console.log(stringifyError(error));
    }
    
}