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

const getGameInstance = (game) => {
    let { uid, status, player1, player2, nowPlaying, createdAt, board, winner } = game;
    return new CatGame(uid, player1, player2, winner, status, createdAt, nowPlaying, board)
}

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    if (squares && squares.length) {
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value) {
                return squares[a].value;
            }
        }
    }
    return null;
}

export {
    isValidUser, gameNotAllowed, isPlaying, isExistentChallenge, stringifyError, getGameInstance, calculateWinner
}
