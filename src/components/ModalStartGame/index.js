import React, { useEffect, useState } from 'react';
import { stringifyError } from '../../common/functions';
import { findOnePlayer } from '../../services/authService';
import { handleAcceptStartGame, handleDeclineCancelGame } from '../../services/gameService';
import { DB_REF_GAME_AVAILABLE_STATUSES } from '../../common/constants.json'

export const ModalStartGame = ({ modalOpen, nameAuthPlayer, challenge }) => {
  const [creator, setCreator] = useState({})
  const [ countdown, setCountdown ] = useState(10);
 
  useEffect(() => {
    let isMounted = true;
    let interval = null;
    (async () => {
      try {
        if (challenge && challenge.uid && isMounted) {
          console.log('so, is this running every second again?? ');
          interval = setInterval(() => {
            // is not the same setCountdown(countdown => countdown - 1); than setCountdown(countdown - 1);
            setCountdown(countdown => countdown - 1);
          }, 1000);
          // who sent the challenge ?
          let { player1: uid } = challenge;
          let _creator = await findOnePlayer(uid);
          setCreator(_creator);
        }
      } catch (error) {
        console.log(stringifyError(error));
      }
    }
    )()
    return () => {
      isMounted = false;
      clearTimeout(interval)
    }
  }, [challenge]) 
  // check countdown and call handleDeclineGame
  useEffect(() => {
      ( async() => {
        try {
          if( countdown === 0 ){
            handleDeclineCancelGame(challenge, DB_REF_GAME_AVAILABLE_STATUSES.DECLINED)
          } 
        } catch (error) {
          console.log(stringifyError(error));
        }
      })()
      return () =>  null
      // challenge is not used here, but let's trhy
  }, [countdown, challenge])
  return (
    <div className={`modal ${setModalClasses(modalOpen)}`}>
      <div className="modal-background"></div>
      <div className="modal-card has-text-dark">
        <header className="modal-card-head">
          <p className="modal-card-title">New game challenge</p>
          <small className="pr-2">Sent on: {new Date(challenge.createdAt).toLocaleString()}</small>
          <button className="delete" aria-label="close" onClick={() => handleDeclineCancelGame(challenge, DB_REF_GAME_AVAILABLE_STATUSES.DECLINED)}></button>
        </header>
        <section className="modal-card-body has-text-dark">
          Hey <strong>{nameAuthPlayer}</strong> would you like to accept the challenge from: <strong> {creator.name} ? </strong>
        </section>
        <footer className="modal-card-foot is-justify-content-space-between">
          <div>
            <button className="button is-primary mr-6" onClick={() => handleAcceptStartGame( challenge, DB_REF_GAME_AVAILABLE_STATUSES.ACCEPTED )} >Yes of course</button>
            <button className="button is-danger" onClick={() => handleDeclineCancelGame(challenge, DB_REF_GAME_AVAILABLE_STATUSES.DECLINED)}>Nope</button>
          </div>
          <small className="pr-2 has-text-danger">You have { countdown } seconds </small>
        </footer>
      </div>
    </div>
  )
}

function setModalClasses(modalOpen) {
  return modalOpen ? 'is-active' : ''
}
