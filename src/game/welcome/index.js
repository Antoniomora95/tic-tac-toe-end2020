import React, { useContext } from 'react';
import { AuthContext } from '../../auth/authContext';
import { handleJoinGame, handleStartGame } from '../../services/gameService';
import './Welcome.css';
export const Welcome = () => {
    const { currentUser: player } = useContext(AuthContext);
    return (
        <div className='container'>
            <div className='grid-c'>
                <div className='d-flex join' onClick={ handleJoinGame }>
                    Join a game
            </div>
                <div className='d-flex start-new' onClick={ () => handleStartGame( player ) }>
                    Start a new game
            </div>
            </div>
        </div>
    )
}
 