import React, { useContext } from 'react'
import { Player } from '../../common/Player';
import { AuthContext } from '../authContext';
import { findOnePlayer, loginWithPopup, signupPlayer, stringifyError } from '../authService';

export const SignUp = ({history}) => {
    const { updateAuthContext } = useContext(AuthContext);
    const callback = async () => {
        try {
            let { displayName, email, photoURL, uid } = await loginWithPopup();
            let player = new Player(uid, displayName, email, photoURL)
            let registered = signupPlayer(player);
            if(registered){
                updateAuthContext(player);
                history.push('/');
            }
        } catch (error) {
            console.log(stringifyError(error));
        }
    }
    return (
        <div>
            <button onClick={callback}>
                Signup
            </button>
        </div>
    )
}
