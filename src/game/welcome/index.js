import React, { useContext, useEffect, useState } from 'react';
import { TitleH3 } from '../../components/TitleH3';
import { AuthContext } from '../../auth/authContext';
import { subscribeForChanges, unsubscribeForChanges, getPlayersOnline, handleStartGame } from '../../services/gameService';
import './Welcome.css';
import { userLoggedIn } from '../../common/functions';

const renderPlayerOnline = (player) => {
    return (
        <PlayerOnline
            key={player.uid}
            player={player}
        />
    )
}
const gameNotAllowed = (authPlayer, player) => userLoggedIn(authPlayer) && authPlayer.uid === player.uid
// is mobile in columns allow you to keep the columns in small sizes
const PlayerOnline = ({ player }) => {
    const { currentUser: authPlayer } = useContext(AuthContext);
    return <li> 
        <div className='columns is-mobile'>
            <div className='column  is-4-desktop is-7-mobile has-text-centered-mobile overflow-hidden'>
                {player.name} 
            </div>
            <div className='column is-6-desktop is-hidden-mobile  overflow-hidden'>
                {player.email}
            </div>
            <div className='column  is-2-desktop is-5-mobile is-flex is-justify-content-center is-align-items-center'>
                <button className='button is-info is-size-7' disabled={ gameNotAllowed(authPlayer, player) } onClick={ ()=> handleStartGame(player)}> Start game </button> 
            </div>
        </div>
    </li>
}
export const Welcome = () => {
    const [players, setPlayers] = useState([]);
    //const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                if (isMounted) {
                    getPlayersOnline(setPlayers);
                    subscribeForChanges(setPlayers);
                }
            } catch (error) {
                console.log(error);
            }
        })()
        return () => {
            console.log('unmounted');
            // when commented you will see how react tries to update the state, but that reference no longer exist since the component was unmounted
            unsubscribeForChanges();
            isMounted = false;
        }
    }, [])
    return (
        <div className='container'>
            <div className='content'>
                <TitleH3 style={{paddingTop: 15}}>Users online</TitleH3>
                <ol>
                    {
                        players && players.length && players.map((player) => renderPlayerOnline(player))
                    }
                </ol>
            </div>
        </div>
    )
}
