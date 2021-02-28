import React, { useEffect, useState } from 'react';
import { findOnePlayer } from '../../services/authService';

export const ModalStartGame = ({modalOpen, nameAuthPlayer, challenge  }) => {
  const [creator, setCreator] = useState({})
  useEffect(() => {
    let isMounted = true;  
    (async() => {
      if(challenge && challenge.uid && isMounted) {
        // who sent the challenge ?
        let { player1: uid } = challenge;
        let _creator = await findOnePlayer(uid);
        setCreator(_creator);
      }
    }
    )()
    return () => {
      isMounted = false;
    }
  }, [challenge])

  return (
    <div className={`modal ${setModalClasses(modalOpen)}`}>
      <div className="modal-background"></div>
      <div className="modal-card has-text-dark">
        <header className="modal-card-head">
          <p className="modal-card-title">New game challenge</p>
          <small className="pr-2">Sent on: {challenge.createdAt}</small>
          <button className="delete" aria-label="close"></button>
        </header> 
        <section className="modal-card-body has-text-dark">
          Hey <strong>{ nameAuthPlayer }</strong> would you like to accept the challenge from: <strong>{creator.name}</strong>
    </section> 
        <footer className="modal-card-foot is-flex is-justify-content-center">
          <button className="button is-primary" onClick={}>Yes of course</button>
          <button className="button is-danger" onClick={}>Nope</button>
        </footer>
      </div> 
    </div>
  )
}

function setModalClasses(modalOpen) {
  return modalOpen ? 'is-active' : ''
}
