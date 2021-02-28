import React, { useContext } from 'react';
import { TitleH3 } from '../components/TitleH3';
import { AuthContext } from '../auth/authContext';
import { AuthUserCard } from '../components/AuthUser/index';
import { isValidUser } from '../common/functions';

export const Header = () => {
  const { currentUser, updateAuthContext } = useContext(AuthContext);
  console.log('Header is running ---');
  return (
    <header className='App-header has-background-primary has-text-white'>
      <div className='columns m-0 height-100 is-mobile'>
        <div className='column p-0 is-flex is-justify-content-center is-align-items-center'>
          <TitleH3>Tic tac toe</TitleH3>
        </div>
        <div className='column p-0 is-flex is-justify-content-center is-align-items-center'>
          {
            isValidUser(currentUser) ? <AuthUserCard currentUser={currentUser} updateAuthContext={updateAuthContext} /> : <div className='is-size-6 has-text-white  has-text-weight-medium'>No logged user</div>
          }
        </div>
      </div>
    </header>
  )
}
