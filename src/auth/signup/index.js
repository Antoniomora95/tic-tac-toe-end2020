import React, { useContext } from 'react'
import { AuthContext } from '../authContext';
import {  loginWithPopup, signupPlayer, stringifyError } from '../../services/authService';
import { Player } from '../../common/Classes';

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
            <div className="container is-flex is-justify-content-center mt-5">
            <button className="button is-danger" onClick= {callback}>
                Signup with google
            </button>
        </div>
        </div>
    )
}
