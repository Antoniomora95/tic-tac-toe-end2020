import React, {  useEffect, useState } from 'react';
//import { AuthContext } from '../../auth/authContext';
import { subscribeForChanges, unsubscribeForChanges, getPlayersOnline } from '../../services/gameService';
import './Welcome.css';

const PlayerOnline = ({player}) => {
    return <li>{player.name }  ----- {player.email}</li>
}
const renderPlayerOnline = (player) => {
    return(
        <PlayerOnline
        key={player.uid}
        player = {player}
        />
    )
}
export const Welcome = () => {
    //const { currentUser: authPlayer } = useContext(AuthContext);
    const [players, setPlayers] = useState([]);
    //const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                if(isMounted){
                    getPlayersOnline(setPlayers);
                    subscribeForChanges(setPlayers);  
                }
            } catch (error) {
                console.log(error);
            }
        })()
        return () => {
            unsubscribeForChanges();
            isMounted = false;
        }
    }, [])
    return (
        <div className='container'>
            <div className='content'>
                <h3 className='has-text-left pt-5'>Users online</h3>
                <ul>
                    {
                      players && players.length &&  players.map((player)=> renderPlayerOnline(player))
                    }
                </ul>
            </div>
        </div>
    )
}
 