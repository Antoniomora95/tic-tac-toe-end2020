import { calculateWinner, stringifyError } from "../../../common/functions";
import { handleModifyGame } from "../../../services/gameService";
import { DB_REF_GAME_AVAILABLE_STATUSES } from "../../../common/constants.json";

let handleClick = async (boardIndex, currentGame, updateLoadingBackend) => {
    try {
        let { nowPlaying: nowPlayingUid, player1: player1Uid, player2: player2Uid, uid: gameUid, status } = currentGame;
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
        //if first move --> started game
        // if winner
        if(status === DB_REF_GAME_AVAILABLE_STATUSES.ACCEPTED) {
            currentGameCopy = {...currentGameCopy, status: DB_REF_GAME_AVAILABLE_STATUSES.STARTED}
        }
        let gameHasWinner = calculateWinner(board);
        if (!!gameHasWinner){
            currentGameCopy.hasWinner = true;
            currentGameCopy.winner = nowPlayingUid;
            currentGameCopy.status = DB_REF_GAME_AVAILABLE_STATUSES.FINISHED;
        }
        updateLoadingBackend(true, `before the service called ${new Date().getTime()}`);
        await handleModifyGame(gameUid, currentGameCopy)
    } catch (error) {
        console.log(stringifyError(error));
    }

}

const Square = ({ currentGame, square, disableBoard, updateLoadingBackend }) => {
    let { hasWinner } = currentGame;
    let { id: boardIndex, value } = square;
    return (
        <button className="square" disabled={ hasWinner || (value && value.length)  || disableBoard } onClick={() => { handleClick( boardIndex, currentGame, updateLoadingBackend ) }}
        > { value}</button>
    );
}

const MovementAndWinner = ({ currentUser, otherPlayer, currentGame }) => {
    let { nowPlaying: nowPlayingUid, winner: winnerUid, hasWinner } = currentGame;
    let description = '';
    if (hasWinner) {
        let name = winnerUid === currentUser.uid ? currentUser.name : otherPlayer.name;
        description = `The winner is: ${name}`
    } else {
        let name = nowPlayingUid === currentUser.uid ? currentUser.name : otherPlayer.name;
        description = `The next movement is for ${name}`
    }
    return (
        <h5 className={ hasWinner ? 'hasWinner' : '' }>{ description }</h5>
    )
}

export { Square, MovementAndWinner }