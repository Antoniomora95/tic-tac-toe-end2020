import React, { useContext, useEffect, useState, useCallback } from 'react'
import { AuthContext } from '../../auth/authContext';
import { isValidGame, isValidUser, stringifyError } from '../../common/functions';
import { subscribeChangedGames, unsubscribeFromGames } from '../../services/gameService';
import { Square, MovementAndWinner } from './components/index';
import './Board.css';
import { findOnePlayer } from '../../services/authService';


export const Board2 = ({ history }) => {

    const { currentUser, currentGame, updateAuthGame } = useContext(AuthContext);
    const [otherPlayer, setOtherPlayer] = useState();
    const [disableBoard, setDisableBoard] = useState(false);
    const [loadingBackend, setLoadingBackend] = useState(false);
    let updateLoadingBackend = (loadingBackend, fromWhere) => {
        setLoadingBackend(loadingBackend);
    }
    let { board } = currentGame;
    let callbackFirstRender = useCallback(() => {
        (async () => {
            try {
                console.log('subscription board onceee....');
            // subscribe to changes, then update [subscrip will listen]
            subscribeChangedGames(currentUser, history, updateAuthGame, () => null, updateLoadingBackend);
            if (currentUser && currentGame && currentUser.uid === currentGame.player1) {
                let otherPlayer = await findOnePlayer(currentGame.player2);
                setOtherPlayer(otherPlayer);
            } else if (currentUser && currentGame && currentUser.uid === currentGame.player2) {
                let otherPlayer = await findOnePlayer(currentGame.player1);
                setOtherPlayer(otherPlayer);
            }
            } catch (error) {
                console.log(stringifyError(error));
            }
        })()
    },[currentUser, history, updateAuthGame, currentGame ]
    )
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            callbackFirstRender()
        }
        return () => {
            mounted = false;
            unsubscribeFromGames();
        }
    }, [callbackFirstRender]);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            let { nowPlaying } = currentGame;
            let { uid: uidAuthPlayer } = currentUser;
            let shouldBlockView = nowPlaying === uidAuthPlayer ? false : true;
            setDisableBoard(shouldBlockView)
        }
        return () => {
            mounted = false;
        }
    }, [currentGame, currentUser])


    return (
        isValidUser(currentUser) && isValidUser(otherPlayer) && isValidGame(currentGame) ? (
            <div className="containerTic">
                <div className="boardWrapper">
                    <div className="boardTitle">
                        <MovementAndWinner currentUser={currentUser} otherPlayer={otherPlayer} currentGame={currentGame} />
                    </div>
                    <div className="boardGrid">
                        {
                            board && board.length && board.map(square => <Square key={square.id} currentGame={currentGame} square={square} disableBoard={disableBoard} updateLoadingBackend={updateLoadingBackend} />)
                        }
                    </div>
                    {loadingBackend && <small className="pt-4"> Getting updates {loadingBackend}</small>}
                    <small> current loading {loadingBackend ? 'true' : 'false'}</small>
                </div>
            </div>
        ) : <p>Is loading</p>
    )
}
