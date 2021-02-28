import { stringifyError, isValidUser, isExistentChallenge } from "../common/functions";
import {   gamesRef } from "../firebase/configuration";
import { toogleExistentChallenge } from "./playerService";
import  { DB_REF_GAME_AVAILABLE_STATUSES } from '../common/constants.json';
import { findOnePlayer } from "./authService";
import { CatGame } from "../common/Classes";


const handleStartGame = async (authPlayer, challengedPlayer) => {
    try {
        // create the game model and store it in DB
        console.log('block the view');
        let { uid: player1Uid, existentChallenge: challengePlayer1 } = authPlayer;
        let {uid: player2Uid, existentChallenge: challengePlayer2 } = challengedPlayer;

        // get both players
        const [player1, player2 ] = await Promise.all([findOnePlayer(player1Uid), findOnePlayer(player2Uid)]);
        if((isValidUser(player1)) && isValidUser(player2)){
            if(!isExistentChallenge(player1) && !isExistentChallenge(player2)){
                let gameUid = gamesRef.push().key;
                let game = new CatGame(gameUid, player1Uid, player2Uid);
                let gameReference = gamesRef.child(gameUid);
                let gameSet = await gameReference.set(game);
                const [res1, res2 ] = await Promise.all([toogleExistentChallenge(player1Uid, true), toogleExistentChallenge(player2Uid, true)]);
            } else {
                throw new Error(`There is an existent challenge for 1 or both players :(`);
            }
        } else {
            throw new Error(`Auth player or Challenged player are not valid`);
        }
        return true;
    } catch (error) {
        console.log(stringifyError(error));
    }
}

const subscribeForChallenges = ( authPlayer, setChallenge, setModalOpen ) => gamesRef.on('child_added', (childSnapshot, prevChildKey) => {
    console.log(childSnapshot, 'auth player now');
    // only new games and if this for me authPlayer
    let game = childSnapshot.val();
    if(game && isNewGame(game) && isValidUser(authPlayer) && isChallengeForAuthPlayer(game, authPlayer)) {
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
