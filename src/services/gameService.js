import { stringifyError, isValidUser, isExistentChallenge } from "../common/functions";
import {   gamesRef } from "../firebase/configuration";
import { toogleExistentGame } from "./playerService";
import  { DB_REF_GAME_KEYS, DB_REF_GAME_AVAILABLE_STATUSES } from '../common/constants.json';
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
                console.log('does not exist challenge');
                let gameUid = gamesRef.push().key;
                let game = new CatGame(gameUid, authPlayerUid, challengedPlayerUid);
                let gameReference = gamesRef.child(gameUid);
                let gameSet = await gameReference.set(game);
                await Promise.all([toogleExistentGame(authPlayerUid, true), toogleExistentGame(challengedPlayerUid, true)]);
                let playera =   await findOnePlayer(authPlayerUid);
                let playerb =   await findOnePlayer(challengedPlayerUid);
                console.log(playera, playerb, 'was updated game ser');
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

const handleAcceptGame = async () =>  {
    try {
        return Promise.resolve()
    } catch (error) {
        console.log(stringifyError(error));
    }
}

const handleDeclineGame = async (game) =>  {
        try {
            let { uid: gameUid, player1: player1Uid, player2: player2Uid } = game;
            let gameReference = gamesRef.child(gameUid);
            await gameReference.child(DB_REF_GAME_KEYS.STATUS).set(DB_REF_GAME_AVAILABLE_STATUSES.DECLINED);
            // release both players
            await Promise.all([toogleExistentGame(player1Uid, false), toogleExistentGame(player2Uid, false)]);
            return true;
        } catch (error) {
            console.log(stringifyError(error));
        }     
}
// game and challenge is the same
const subscribeAddedGames = ( authPlayer, setChallenge, setModalOpen ) => gamesRef.on('child_added', (childSnapshot, prevChildKey) => {
    console.log(childSnapshot, 'auth player now');
    let game = childSnapshot.val();
      // is_new status and auth player is challenged
    if(game && gameHasStatus(game, DB_REF_GAME_AVAILABLE_STATUSES.IS_NEW) && isValidUser(authPlayer) && isChallengeForAuthPlayer(game, authPlayer)) {
        setChallenge(game);
        setModalOpen(true);
    }
});

const subscribeChangedGames = ( authPlayer, setModalOpen, history ) => gamesRef.on('child_changed', (childSnapshot, prevChildKey) => {
    // accepted status, auth is challenger
    let game = childSnapshot.val();
    if(game && gameHasStatus(game, DB_REF_GAME_AVAILABLE_STATUSES.ACCEPTED) && isValidUser(authPlayer) && isChallengeFromAuthPlayer()){}
    // declined status, auth is challenger
    else if(game && gameHasStatus(game, DB_REF_GAME_AVAILABLE_STATUSES.DECLINED) && isValidUser(authPlayer) && isChallengeFromAuthPlayer()){
        debugger
        //  ok, i could have a notification service and execute here ('your challenge was ddclined')
        setModalOpen(false);
    }
});


const unsubscribeFromGames = () => {
    gamesRef.off();
}
function gameHasStatus(game, status) {
    return game.status && game.status === status;
}
function isChallengeForAuthPlayer(game, authPlayer) {
    return game && game.player2 && game.player2 === authPlayer.uid;
}
function isChallengeFromAuthPlayer(game, authPlayer) {
    return game && game.player1 && game.player1 === authPlayer.uid;
}

export {
    handleCreateGame, handleAcceptGame, handleDeclineGame, subscribeAddedGames, subscribeChangedGames, unsubscribeFromGames
}
