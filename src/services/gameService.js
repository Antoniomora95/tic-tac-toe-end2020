import { stringifyError, isValidUser, isExistentChallenge, getGameInstance } from "../common/functions";
import {   gamesRef } from "../firebase/configuration";
import { toogleExistentGame } from "./playerService";
import  { DB_REF_GAME_KEYS, DB_REF_GAME_AVAILABLE_STATUSES } from '../common/constants.json';
import { findOnePlayer } from "./authService";
import { CatGame } from "../common/Classes";


const handleCreateGame = async (authPlayer, challengedPlayer, disableView) => {
    try {
        // create the game model and store it in DB
        disableView(true);
        let { uid: authPlayerUid } = authPlayer;
        let {uid: challengedPlayerUid } = challengedPlayer;

        // get both players
        const [player1, player2 ] = await Promise.all([findOnePlayer(authPlayerUid), findOnePlayer(challengedPlayerUid)]);
        if((isValidUser(player1)) && isValidUser(player2)){
            if(!isExistentChallenge(player1, player2)){
                disableView(false);
                let gameUid = gamesRef.push().key;
                let game = new CatGame(gameUid, authPlayerUid, challengedPlayerUid);
                let gameReference = gamesRef.child(gameUid);
                let gameSet = await gameReference.set(game);
                await Promise.all([toogleExistentGame(authPlayerUid, true), toogleExistentGame(challengedPlayerUid, true)]);
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
const handleModifyGame = async (gameUid, gameUpdated) =>  {
    try {
        let gameReference = gamesRef.child(gameUid);
        await gameReference.set(gameUpdated);
    } catch (error) {
        console.log(stringifyError(error));
    }
}

const handleAcceptStartGame = async (game, gameStatus) =>  {
    try {
        let { uid: gameUid } = game;
        let gameReference = gamesRef.child(gameUid);
        await gameReference.child(DB_REF_GAME_KEYS.STATUS).set(gameStatus);
    } catch (error) {
        console.log(stringifyError(error));
    }
}

const handleDeclineCancelGame = async (game, gameStatus) =>  {
        try {
            let { uid: gameUid, player1: player1Uid, player2: player2Uid } = game;
            let gameReference = gamesRef.child(gameUid);
            await gameReference.child(DB_REF_GAME_KEYS.STATUS).set(gameStatus);
            // release both players
            await Promise.all([toogleExistentGame(player1Uid, false), toogleExistentGame(player2Uid, false)]);
            return true;
        } catch (error) {
            console.log(stringifyError(error));
        }     
}


const subscribeAddedGames = ( authPlayer, setChallenge, setModalOpen ) => gamesRef.on('child_added', (childSnapshot, prevChildKey) => {
    let game = childSnapshot.val();
      // is_new status and auth player is challenged
    if(game && gameHasStatus(game, DB_REF_GAME_AVAILABLE_STATUSES.IS_NEW) && isValidUser(authPlayer) && isChallengeForAuthPlayer(game, authPlayer) && authPlayer.loggedAt <=  game.createdAt) {
        setChallenge(game);
        setModalOpen(true);
    }
    // I do not need to open the board page at first 
});

const subscribeChangedGames = ( authPlayer, history, updateAuthGame, setModalOpen, updateLoadingBackend ) => gamesRef.on('child_changed', (childSnapshot, prevChildKey) => {
    // accepted status, go to board both players
    let game = childSnapshot.val();
    if(game && gameHasStatus(game, DB_REF_GAME_AVAILABLE_STATUSES.ACCEPTED) && isValidUser(authPlayer) && (isChallengeFromAuthPlayer(game, authPlayer) || isChallengeForAuthPlayer(game, authPlayer))){
        // close the mod
        setModalOpen(false);
        if(updateLoadingBackend){
            updateLoadingBackend(false, `it is called in accepted ${new Date().getTime()}`)
        }
        updateAuthGame(getGameInstance(game));
        history.push("/board");
    }
    // declined status, auth is challenger
    else if(game && gameHasStatus(game, DB_REF_GAME_AVAILABLE_STATUSES.DECLINED) && isValidUser(authPlayer)){
        //history.push("/");
        if(isChallengeFromAuthPlayer(game, authPlayer)){
            console.log('your challenge was  declined');
        } else if(isChallengeForAuthPlayer(game, authPlayer)){
            // close the modal
            setModalOpen(false);
        }
    }
     // canceled status, auth is part of the game
     else if(game && gameHasStatus(game, DB_REF_GAME_AVAILABLE_STATUSES.CANCELED) && isValidUser(authPlayer) && (isChallengeFromAuthPlayer(game, authPlayer) || isChallengeForAuthPlayer(game, authPlayer))){
        // route the player to dashboard
        updateAuthGame();
        history.push("/")
    } else {
        if(updateLoadingBackend){
            updateLoadingBackend(false, 'after the service called');
        }
        updateAuthGame(getGameInstance(game));
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
    handleCreateGame,
    handleAcceptStartGame,
    handleDeclineCancelGame,
    subscribeAddedGames, 
    subscribeChangedGames,
    unsubscribeFromGames,
    handleModifyGame
}
