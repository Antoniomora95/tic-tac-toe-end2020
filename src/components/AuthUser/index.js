import React, { useContext } from 'react';
import  './index.css';
import { signOutPlayer } from '../../services/authService'
import { AuthContext } from '../../auth/authContext';


export const AuthUserCard = () => {
  const { currentUser, currentGame, updateAuthUser, updateAuthGame } = useContext(AuthContext);
    return (
        <div className='grid grid-auth-user-card'>
            <div className='is-flex is-justify-content-around is-align-items-center'>
                <img className='profile-pic is-size-7' src={currentUser.imageUrl} alt={'profile'}></img>
                <p className='pl-3 is-size-6'>{currentUser.name}</p>
            </div>
            <div className='is-flex is-justify-content-flex-end is-align-items-center'>
                <button className='button mr-1 is-link is-size-7' onClick={signOutPlayer(updateAuthUser, updateAuthGame, currentUser.uid, currentGame)}>Sign Out</button>
            </div>
        </div>
    )
}
