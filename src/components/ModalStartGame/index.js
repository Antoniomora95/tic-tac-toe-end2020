import React from 'react';

export const ModalStartGame = ({modalOpen, nameAuthPlayer, challenge  }) => {
  console.log(challenge);
  // i could get more data about the game

  return (
    <div className={`modal ${setModalClasses(modalOpen)}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">New game challenge</p>
          <button className="delete" aria-label="close"></button>
        </header> 
        <section className="modal-card-body has-text-dark">
          {`Hey ${ nameAuthPlayer } would you like to accept the challenge from Jose luis ?`}
    </section> 
        <footer className="modal-card-foot is-flex is-justify-content-center">
          <button className="button is-primary">Yes of course</button>
          <button className="button is-danger">Nope</button>
        </footer>
      </div> 
    </div>
  )
}

function setModalClasses(modalOpen) {
  return modalOpen ? 'is-active' : ''
}
