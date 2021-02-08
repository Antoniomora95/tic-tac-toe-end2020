import { CatGame } from "../common/Classes";
import { stringifyError } from "../common/functions";
import { gamesRef } from "../firebase/configuration";
import { toogleIsPlaying } from "./playerService";

export const handleStartGame = async (player) => {
    try {
        // create the game model and store it in DB
        let gameUid = gamesRef.push().key;
        let { uid: player1Uid } = player;
        let game = new CatGame(gameUid, player1Uid);
        let gameReference = gamesRef.child(gameUid);
        let gameSet = await gameReference.set(game);
        // toggle playing prop to  true to block any other coming request
        await toogleIsPlaying(player1Uid, true);
        console.log(gameSet, 'game Set');
    } catch (error) {
        console.log(stringifyError(error));
    }
}
