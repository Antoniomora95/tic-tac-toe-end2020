import { useEffect, useState } from "react";

const Square = ({ value, onClickProp, winner }) => {
    const [disabled, setDisabled] = useState(false);
    useEffect(() => {
        if(!value && disabled){
            // if the square receive an empty value and it was previously disabled, then enable it again
            setDisabled(false);
        }
        return () => null
    }, [value])
    return (
        <button className="square" disabled={disabled} onClick={() => {
            if( !winner ){
                setDisabled(true)
                onClickProp();
            }
        }}> { value }</button>
    );
}

const NextMovement = ({ currentUser, otherPlayer,  currentGame }) => {
    let name = currentGame.nowPlaying === currentUser.uid ? currentUser.name : otherPlayer.name
    return(
        <h5>The next movement is for: {name}</h5>
    )
}

export { Square, NextMovement }