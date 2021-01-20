import React from 'react';
import { handleJoinGame, handleStartGame } from '../../services/gameService';
import './Welcome.css';
export const Welcome = () => {
    return (
        <div className='container'>
            <div className='grid-c'>
                <div className='d-flex join' onClick={ handleJoinGame }>
                    Join a game
            </div>
                <div className='d-flex start-new' onClick={ handleStartGame }>
                    Start a new game
            </div>
            </div>
        </div>
    )
}
