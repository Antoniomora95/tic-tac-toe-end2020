import React, {useCallback, useContext} from 'react';
import { app, provider } from '../../firebase/configuration';
import { AuthContext } from '../authContext';
import {findOnePlayer, stringifyError} from './signinService';

export const Login = ( { history } ) => {
    const { setCurrentUser } = useContext(AuthContext);

    const callback = useCallback(async () => {
            try {
                let result = await app.auth().signInWithPopup(provider)
                var {  user } = result;
                //var { idToken } = credential;
                //extract the info from user
                let { uid } = user;
                // check if the user is already in db
                let userDB = await findOnePlayer(uid);
                if(!userDB){
                    //redirect to register flow
                    history.push("/signup");
                } else {
                    // i should set the context here
                    setCurrentUser(userDB);
                    history.push("/")
                }
            } catch (error) {
                 console.log(stringifyError(error));
            }
        },
        []
      )

    return (
        <div>
            <button onClick= {callback}>
                Login
            </button>
        </div>
    )
}
