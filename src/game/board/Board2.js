import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../auth/authContext';
import { calculateWinner, isValidGame, isValidUser } from '../../common/functions';
import { subscribeChangedGames, unsubscribeFromGames, handleAcceptStartGame } from '../../services/gameService';
import { Square, NextMovement } from './components/index';
import { DB_REF_GAME_AVAILABLE_STATUSES } from '../../common/constants.json';
import './Board.css';
import { findOnePlayer } from '../../services/authService';




function handleClick(index, currentGame) {
    let { isPlayingX, board } = currentGame;
    /*if (!calculateWinner(board)) {
        let cloneActualGame = JSON.parse(JSON.stringify(boardActualGame));
        historyGame = [...historyGame, cloneActualGame];
        cloneActualGame[index].value = isPlayingX ? 'X' : 'O';
        this.setState((state) => {
            return {
                boardActualGame: cloneActualGame,
                isPlayingX: !isPlayingX,
                historyGame: historyGame
            }
        });
    }*/
}

function renderSquare({ id, value}, currentGame) {
    console.log(id, value, currentGame, 'square')
    return (
        <Square
            key={ id }
            value={ value }
            currentGame = { currentGame }
            onClickProp={() => handleClick(id, currentGame)}
        />
    )
}
 
export const Board2 = ({ history }) => {

    const { currentUser, currentGame, updateAuthGame } = useContext(AuthContext);
    const [otherPlayer, setOtherPlayer] = useState()
    let { board } = currentGame;
    useEffect(() => {
        let mounted = true;
        (async()=>{       
            if( mounted ){
                // subscribe to changes, then update [subscrip will listen]
                subscribeChangedGames(currentUser, history, updateAuthGame, ()=> null, `board 2 compo ${currentUser.uid}`);
                if(currentUser && currentGame && currentUser.uid === currentGame.player1){
                    let otherPlayer = await findOnePlayer(currentGame.player2);
                    console.log('the other player is.', otherPlayer);
                    setOtherPlayer(otherPlayer);
                } else if(currentUser && currentGame && currentUser.uid === currentGame.player2) {
                    let otherPlayer = await findOnePlayer(currentGame.player1);
                    console.log('the other player is.', otherPlayer);
                    setOtherPlayer(otherPlayer);
                }
                
            }
        })()    
        return () => {
            mounted = false;
            unsubscribeFromGames();
        }
    }, [])

    useEffect(() => {
        console.log(currentGame, 'change sss');
        return () => null
    }, [currentGame])
    return (
        isValidUser(currentUser) && isValidUser(otherPlayer) && isValidGame(currentGame) ? (
            <div className="containerTic">
            <div className="boardWrapper">
                <div className="boardTitle">
                    {
                        /*
                         <MovementOrWinnerView
                         boardActualGame={boardActualGame}
                         isPlayingX={isPlayingX}
                     />
                        */
                    }
                    <NextMovement currentUser={ currentUser } otherPlayer= { otherPlayer }  currentGame = { currentGame }  />
                </div>
                <div className="boardGrid">
                    {
                        board && board.length && board.map(square => renderSquare(square, currentGame))
                    }
                </div>
            </div>
        </div>
        ) : <p>Is loading</p>
    )
}
