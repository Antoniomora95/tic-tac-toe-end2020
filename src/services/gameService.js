import { stringifyError, isValidUser, isExistentChallenge } from "../common/functions";
import {   gamesRef } from "../firebase/configuration";
import { toogleExistentChallenge } from "./playerService";
import  { DB_REF_GAME_AVAILABLE_STATUSES } from '../common/constants.json';
import { findOnePlayer } from "./authService";
import { CatGame } from "../common/Classes";


const handleCreateGame = async (authPlayer, challengedPlayer) => {
    try {
        // create the game model and store it in DB
        console.log('block the view');
        let { uid: authPlayerUid } = authPlayer;
        let {uid: challengedPlayerUid } = challengedPlayer;

        // get both players
        const [player1, player2 ] = await Promise.all([findOnePlayer(authPlayerUid), findOnePlayer(challengedPlayerUid)]);
        if((isValidUser(player1)) && isValidUser(player2)){
            if(!isExistentChallenge(player1, player2)){
                let gameUid = gamesRef.push().key;
                let game = new CatGame(gameUid, authPlayerUid, challengedPlayerUid);
                let gameReference = gamesRef.child(gameUid);
                let gameSet = await gameReference.set(game);
                await Promise.all([toogleExistentChallenge(authPlayerUid, true), toogleExistentChallenge(challengedPlayerUid, true)]);
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

const handleAcceptChallenge = async () =>  {
    try {
        return Promise.resolve()
    } catch (error) {
        console.log(stringifyError(error));
    }
}

const handleDeclineChallenge = async () =>  {
    try {
        return Promise.resolve()
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
    handleCreateGame, subscribeForChallenges, unsubscribeForChallenges, handleAcceptChallenge, handleDeclineChallenge
}
