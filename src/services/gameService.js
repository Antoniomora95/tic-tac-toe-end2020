import { stringifyError, isValidUser, isExistentChallenge } from "../common/functions";
import {   gamesRef } from "../firebase/configuration";
import { toogleExistentChallenge } from "./playerService";
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

const handleDeclineChallenge = (challenge) =>  {
    ( async() => {
        try {
            let { uid: challengeUid, player1: player1Uid, player2: player2Uid } = challenge;
            let gameReference = gamesRef.child(challengeUid);
            await gameReference.child(DB_REF_GAME_KEYS.STATUS).set(DB_REF_GAME_AVAILABLE_STATUSES.DECLINED);
            // release both players
            await Promise.all([toogleExistentChallenge(player1Uid, false), toogleExistentChallenge(player2Uid, false)]);
            return true;
        } catch (error) {
            console.log(stringifyError(error));
        } 
    })()
    
}

const subscribeForChallenges = ( authPlayer, setChallenge, setModalOpen, history ) => gamesRef.on('child_added', (childSnapshot, prevChildKey) => {
    console.log(childSnapshot, 'auth player now');
    let game = childSnapshot.val();
      // is_new status and auth player is challenged
    if(game && gameHasStatus(game, DB_REF_GAME_AVAILABLE_STATUSES.IS_NEW) && isValidUser(authPlayer) && isChallengeForAuthPlayer(game, authPlayer)) {
        debugger
        setChallenge(game);
        setModalOpen(true);
    }
    // accepted status, auth is challenger
    else if(game && gameHasStatus(game, DB_REF_GAME_AVAILABLE_STATUSES.ACCEPTED) && isValidUser(authPlayer) && isChallengeFromAuthPlayer()){

    }
    // declined status, auth is challenger
    else if(game && gameHasStatus(game, DB_REF_GAME_AVAILABLE_STATUSES.DECLINED) && isValidUser(authPlayer) && isChallengeFromAuthPlayer()){
        //  ok, i could have a notification service and execute here ('your challenge was ddclined')
        console.log('Your challenge was declined');
    }
});

const challengeTimeout = (challenge) => {
    return setTimeout()
}

const unsubscribeForChallenges = () => {
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
    handleCreateGame, subscribeForChallenges, unsubscribeForChallenges, handleAcceptChallenge, handleDeclineChallenge, challengeTimeout
}
