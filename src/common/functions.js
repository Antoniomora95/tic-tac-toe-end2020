import { CatGame } from "./Classes";

let isValidUser = (currentUser) => currentUser && currentUser.uid

const gameNotAllowed = (authPlayer, player) => authPlayer.uid === player.uid;

const isPlaying = (player) =>  {
    return player && player.isPlaying;
}
const isExistentChallenge = (authPlayer, player) => {
    return (authPlayer && authPlayer.existentChallenge) || (player && player.existentChallenge)
}

const stringifyError = error => {
    if(error instanceof Error) {
        return error.toString();
    } else {
        return JSON.stringify(error);
    }
}

const createGameInstance = (game) => {
    let { uid, status, player1, player2, nowPlaying, createdAt, board, winner } = game;
    return new CatGame(uid, player1, player2, winner, status, createdAt, nowPlaying, board)
}
export {
    isValidUser, gameNotAllowed, isPlaying, isExistentChallenge, stringifyError, createGameInstance
}
