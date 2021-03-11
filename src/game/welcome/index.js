import React, { useContext, useEffect, useState } from 'react';
import { TitleH3 } from '../../components/TitleH3';
import { AuthContext } from '../../auth/authContext';
import {  handleCreateGame } from '../../services/gameService';
import './Welcome.css';
import { gameNotAllowed, isExistentChallenge, isPlaying, isValidUser, stringifyError } from '../../common/functions';
import { subscribeAddedPlayers, subscribeChangedPlayers, unsubscribeFromPlayers } from '../../services/playerService';
import { subscribeAddedGames, unsubscribeFromGames, subscribeChangedGames} from '../../services/gameService';
import { ModalStartGame } from '../../components/ModalStartGame';
import { useHistory } from 'react-router';

// is mobile in columns allow you to keep the columns in small sizes
const PlayerOnline = ({ player, authPlayer }) => {
    return <li>
        <div className='columns is-mobile'>
            <div className='column  is-4-desktop is-7-mobile has-text-centered-mobile overflow-hidden'>
                {player.name}
            </div>
            <div className='column is-6-desktop is-hidden-mobile  overflow-hidden'>
                {player.email}
            </div>
            <div className='column  is-2-desktop is-5-mobile is-flex is-justify-content-center is-align-items-center'>
                <button className='button is-info is-size-7' disabled={ gameNotAllowed(authPlayer, player) || isPlaying(player) || isExistentChallenge(authPlayer, player) } onClick={ () => handleCreateGame(authPlayer, player) }> { isPlaying(player) ? `Is playing`: isExistentChallenge(authPlayer, player) ? `Not available` : `Start game` } {authPlayer.existentChallenge ? 'true': 'false'}  </button>
            </div>
        </div>
    </li>
}
const renderPlayerOnline = (player, authPlayer) => {
    
    return (
        <PlayerOnline
            key={player.uid}
            player={player}
            authPlayer = {authPlayer}
        />
    )
}
export const Welcome = () => {
    let history = useHistory();
    // useReducer, not sure if it is better and block the view when click on players
    //const [state, dispatch] = useReducer(reducer, initialState, init);
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
                    subscribeChangedPlayers(setPlayers);
                    subscribeAddedPlayers(setPlayers);

                    subscribeAddedGames(authPlayer, setChallenge, setModalOpen);
                    subscribeChangedGames(authPlayer, setModalOpen, history);
                }
            } catch (error) {
                console.log(stringifyError(error));
            }
        })()
        return () => {
            // when commented you will see how react tries to update the state, but that reference no longer exist since the component was unmounted
            unsubscribeFromPlayers();
            unsubscribeFromGames();
            isMounted = false;
        }
    }, [])
    return (
        <div className='container'>
            {
                isValidUser(authPlayer) ? <>
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
