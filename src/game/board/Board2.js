import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../auth/authContext';
import { calculateWinner } from '../../common/functions';
import { subscribeChangedGames, unsubscribeFromGames } from '../../services/gameService';
import { Square } from './components/Square'
import './Board.css';




function handleClick(index) {
    let { isPlayingX, boardActualGame, historyGame } = this.state;
    if (!calculateWinner(boardActualGame)) {
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
    }
}

function renderSquare({ id, value }) {
    return (
        <Square
            key={id}
            value={value}
            winner={!!calculateWinner(this.state.boardActualGame)}
            onClickProp={() => handleClick(id)}
        />
    )
}


export const Board2 = ({ history }) => {

    const { currentUser } = useContext(AuthContext);
    console.log('Board2 is running ---');

    useEffect(() => {
        subscribeChangedGames(currentUser, history)
        return () => {
            unsubscribeFromGames()
        }
    }, [])

    return (

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
                   The next one is: Antonio
                </div>
                <div className="boardGrid">
                    <div>asd</div>
                    <div>asd</div>
                    <div>asd</div>
                    <div>asd</div>
                    <div>asd</div>
                    <div>asd</div>
                    <div>asd</div>
                    <div>asd</div>
                    <div>asd</div>
                    {
                        /*
                        {
                     boardActualGame.map(square => this.renderSquare(square))
                 }
                        */
                    }
                </div>
            </div>
        </div>
    )
}
