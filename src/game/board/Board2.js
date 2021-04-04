import React,{ useContext, useEffect } from 'react'
import { AuthContext } from '../../auth/authContext';
import { subscribeChangedGames, unsubscribeFromGames } from '../../services/gameService';

export const Board2 = ({history}) => {

    const { currentUser } = useContext(AuthContext);
    console.log('Board2 is running ---'); 
  
    useEffect(() => {
      subscribeChangedGames(currentUser, history)
      return () => {
        unsubscribeFromGames()
      }
    }, [])

    return (
        <div>
            <h1>This is a exmpla just to vgkrjv {JSON.stringify(currentUser)}</h1>
        </div>
    )
}
