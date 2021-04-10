import React, { useContext } from 'react';
import { AuthContext } from '../authContext';
import { findOnePlayer, loginWithPopup, setPlayerOnline } from '../../services/authService';
import { stringifyError } from '../../common/functions';

export const Login = ({ history }) => {
    const { updateAuthUser } = useContext(AuthContext);

    const callback = async () => {
        try {
            let firebasePlayer = await loginWithPopup();
            let { uid: uidFirebase } = firebasePlayer;
            let userDB = await findOnePlayer(uidFirebase);
            if (!userDB) {
                history.push("/signup");
            } else {
                let { isOnline, uid } = userDB;
                if (!isOnline) {
                    // set online and set loggedAt
                    await setPlayerOnline(uid);
                    let loggedUser = await findOnePlayer(uid);
                    updateAuthUser(loggedUser);
                    history.push("/")
                } else {
                    console.log('user already logged in');
                }

            }
        } catch (error) {
            console.log(stringifyError(error));
        }
    }

    return (
        <div className="container is-flex is-justify-content-center mt-5">
            <button className="button is-info has-text-white" onClick={callback}>
                Login with google
            </button>
        </div>
    )
}
