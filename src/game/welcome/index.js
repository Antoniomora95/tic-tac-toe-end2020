import React, { useContext, useEffect, useState, useReducer } from 'react';
import { TitleH3 } from '../../components/TitleH3';
import { AuthContext } from '../../auth/authContext';
import {  handleStartGame } from '../../services/gameService';
import './Welcome.css';
import { gameNotAllowed, isPlaying, userLoggedIn } from '../../common/functions';
import { subscribeForChanges, subscribeForChildAdded, unsubscribeForChanges } from '../../services/playerService';
import { subscribeForChallenges, unsubscribeForChallenges } from '../../services/gameService';
import { ModalStartGame } from '../../components/ModalStartGame';

// is mobile in columns allow you to keep the columns in small sizes
const PlayerOnline = ({ authPlayer, player }) => {
    return <li>
        <div className='columns is-mobile'>
            <div className='column  is-4-desktop is-7-mobile has-text-centered-mobile overflow-hidden'>
                {player.name}
            </div>
            <div className='column is-6-desktop is-hidden-mobile  overflow-hidden'>
                {player.email}
            </div>
            <div className='column  is-2-desktop is-5-mobile is-flex is-justify-content-center is-align-items-center'>
                <button className='button is-info is-size-7' disabled={ gameNotAllowed(authPlayer, player) || isPlaying(player) } onClick={ () => handleStartGame(authPlayer, player) }> { isPlaying(player) ? `Is playing`: `Start game` }  </button>
            </div>
        </div>
    </li>
}
const renderPlayerOnline = (player, authPlayer) => {
    return (
        <PlayerOnline
            key={player.uid}
            authPlayer = {authPlayer}
            player={player}
        />
    )
}
export const Welcome = () => {
    // useReducer, not sure if it is better and block the view when click on players
    //Çconst [state, dispatch] = useReducer(reducer, initialState, init);


    const { currentUser: authPlayer } = useContext(AuthContext);
    const [players, setPlayers] = useState([]);
    const [challenge, setChallenge] = useState({});
    const  [modalOpen, setModalOpen] = useState(false);




    const { name } = authPlayer;
    //const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                if (isMounted) {
                    // if a property changes
                    subscribeForChanges(setPlayers);
                    // it runs once for each element in the table/collection
                    subscribeForChildAdded(setPlayers);
                    // new game challenge for me
                    subscribeForChallenges(authPlayer, setChallenge, setModalOpen);
                }
            } catch (error) {
                console.log(error);
            }
        })()
        return () => {
            console.log('unmounted');
            // when commented you will see how react tries to update the state, but that reference no longer exist since the component was unmounted
            unsubscribeForChanges();
            unsubscribeForChallenges();
            isMounted = false;
        }
    }, [])
    console.log('welcome re rendered');
    return (
        <div className='container'>
            {
                userLoggedIn(authPlayer) ? <>
                    <div className='content'>
                        <TitleH3 style={{ paddingTop: 15 }}>Users online</TitleH3>
                        <ol>
                            {
                                players && players.length && players.map((player) => renderPlayerOnline(player, authPlayer))
                            }
                        </ol>
                    </div> </> : <>...</>
            }
           {modalOpen && <ModalStartGame modalOpen = { modalOpen } nameAuthPlayer={ name } challenge = { challenge }/> }
        </div>
    )
}
