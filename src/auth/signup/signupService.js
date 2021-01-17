import React, {useCallback, useContext} from 'react';
import { app, provider } from '../../firebase/configuration';
import { AuthContext } from '../authContext';
import {findOnePlayer, signupPlayer, stringifyError} from './signinService';

export const Login = ({ history }) => {
    const { setCurrentUser } = useContext(AuthContext);
    
    const callback = useCallback(async () => {
            try {
                let result = await app.auth().signInWithPopup(provider)
                var {  user } = result;
                //var { idToken } = credential;
                //extract the info from user
                let { displayName, email, photoURL, uid } = user;
                // check if the user is already in db
                let userDB = await findOnePlayer(uid);
                if(!userDB){
                    signupPlayer(uid, displayName, email, photoURL);
                    // i should set the context here
                } else {
                    // i should set the context here
                    //redirect there is an existent account
                    history.push("/")
                }
            } catch (error) {
                return stringifyError(error);
            }
        },
        [history]
      )

    return (
        <div>
            <button onClick= {callback}>
                Login
            </button>
        </div>
    )
}
