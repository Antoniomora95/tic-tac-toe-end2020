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

export { Square }