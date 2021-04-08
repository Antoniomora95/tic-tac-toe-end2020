import { stringifyError } from "../../../common/functions";
import { handleModifyGame } from "../../../services/gameService";

let handleClick = async (boardIndex, currentGame) => {
    try {
        let { nowPlaying: nowPlayingUid, player1: player1Uid, player2: player2Uid, uid: gameUid } = currentGame;
        let value = nowPlayingUid === player1Uid ? 'X' : 'O';
        let newPlayerPlaying = nowPlayingUid === player1Uid ? player2Uid : player1Uid;
        // avoid messing up state rules
        let currentGameCopy = JSON.parse(JSON.stringify(currentGame));
        let { board } = currentGameCopy;
        board[boardIndex].value = value;
        currentGameCopy = {
            ...currentGameCopy,
            nowPlaying: newPlayerPlaying,
            board
        }
        await handleModifyGame(gameUid, currentGameCopy)
        console.log(currentGameCopy, 'copy');
    } catch (error) {
        console.log(stringifyError(error));
    }

}

const Square = ({ currentGame, square }) => {
    let { winner } = currentGame;
    let { id: boardIndex, value } = square;
    return (
        <button className="square" disabled={(winner && winner.length) || (value && value.length) } onClick={() => { handleClick(boardIndex, currentGame) }}
        > { value}</button>
    );
}

const MovementAndWinner = ({ currentUser, otherPlayer, currentGame }) => {
    let { nowPlaying: nowPlayingUid, winner: winnerUid } = currentGame;
    let description = '';
    if (winnerUid && winnerUid.length) {
        let name = winnerUid === currentUser.uid ? currentUser.name : otherPlayer.name;
        description = `The winner is: ${name}`
    } else {
        let name = nowPlayingUid === currentUser.uid ? currentUser.name : otherPlayer.name;
        description = `The next movement is for ${name}`
    }
    return (
        <h5>{description}</h5>
    )
}

export { Square, MovementAndWinner }