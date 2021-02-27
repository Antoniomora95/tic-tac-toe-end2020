import { CatGame } from "../common/Classes";
import { stringifyError, userLoggedIn } from "../common/functions";
import {   gamesRef } from "../firebase/configuration";
import { toogleIsPlaying } from "./playerService";
import  { DB_REF_GAME_AVAILABLE_STATUSES } from '../common/constants.json';


const handleStartGame = async (authPlayer, challengedPlayer) => {
    try {
        // create the game model and store it in DB
        let gameUid = gamesRef.push().key;
        let { uid: player1Uid } = authPlayer;
        let {uid: player2Uid} = challengedPlayer;
        let game = new CatGame(gameUid, player1Uid, player2Uid);
        let gameReference = gamesRef.child(gameUid);
        let gameSet = await gameReference.set(game);
        // toggle playing prop to  true to block any other incoming request
        await toogleIsPlaying(player1Uid, true);
        return true;
    } catch (error) {
        console.log(stringifyError(error));
    }
}

const subscribeForChallenges = ( authPlayer, setChallenge, setModalOpen ) => gamesRef.on('child_added', (childSnapshot, prevChildKey) => {
    console.log(childSnapshot, 'auth player now');
    // only new games and if this for me authPlayer
    let game = childSnapshot.val();
    if(game && isNewGame(game) && userLoggedIn(authPlayer) && isChallengeForAuthPlayer(game, authPlayer)) {
        debugger
        setChallenge(game);
        setModalOpen(true);
    }
});

const unsubscribeForChallenges = (setPlayers) => {
    gamesRef.off();
}
function isNewGame(game) {
    return game.status && game.status === DB_REF_GAME_AVAILABLE_STATUSES.IS_NEW
}
function isChallengeForAuthPlayer(game, authPlayer) {
    return game && game.player2 && game.player2 === authPlayer.uid;
}

export {
    handleStartGame, subscribeForChallenges, unsubscribeForChallenges
}
