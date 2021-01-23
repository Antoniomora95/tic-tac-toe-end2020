import React, { useContext } from 'react';
import { AuthContext } from '../auth/authContext';
import { signOutPlayer } from '../services/authService';
export const Header = ({ history }) => {
    console.log('Header is running ---');
    const { currentUser, updateAuthContext } = useContext(AuthContext);
    return (
        <header className='App-header has-background-primary has-text-white'>
        Tic tac toe
        { currentUser && currentUser.uid &&  <> <button onClick = { signOutPlayer(updateAuthContext) }>Sign Out</button>
        <img className='profile-pic' src={currentUser.imageUrl} alt={'d'}></img>
        <p style={{fontSize:'14px', paddingLeft:'10px'}}>{currentUser.name}</p>
        </> 
        }
      </header>
    )
}
