import React from 'react';
import  './index.css';
import { signOutPlayer } from '../../services/authService'


export const AuthUserCard = ({ currentUser, updateAuthContext }) => {
    return (
        <div className='grid grid-auth-user-card'>
            <div className='is-flex is-justify-content-around is-align-items-center'>
                <img className='profile-pic is-size-7' src={currentUser.imageUrl} alt={'profile'}></img>
                <p className='pl-3 is-size-6'>{currentUser.name}</p>
            </div>
            <div className='is-flex is-justify-content-flex-end is-align-items-center'>
                <button className='button mr-1 is-link is-size-7' onClick={signOutPlayer(updateAuthContext, currentUser.uid)}>Sign Out</button>
            </div>
        </div>
    )
}
