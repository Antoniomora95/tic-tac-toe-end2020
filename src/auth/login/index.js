import React, {useCallback, useContext} from 'react';
import { app, provider } from '../../firebase/configuration';
import { AuthContext } from '../authContext';
import { stringifyError, findOnePlayer } from '../authService';

export const Login = ( { history } ) => {
    const { updateAuthContext } = useContext(AuthContext);

    const callback = useCallback(async () => {
            try {
                let { user } = await app.auth().signInWithPopup(provider);
                let { uid } = user;
                let userDB = await findOnePlayer(uid);
                if(!userDB){
                    history.push("/signup");
                } else {
                    updateAuthContext(userDB);
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
                Login with google
            </button>
        </div>
    )
}
