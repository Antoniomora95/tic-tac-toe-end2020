import React, { useContext} from 'react';
import { AuthContext } from '../authContext';
import { stringifyError, findOnePlayer, loginWithPopup, setPlayerOnline } from '../../services/authService';
import { Player } from '../../common/Classes';

export const Login = ( { history } ) => {
    const { updateAuthContext } = useContext(AuthContext);

    const callback = async () => {
            try {
                let firebasePlayer = await loginWithPopup();
                let { uid: uidFirebase } = firebasePlayer;
                let userDB = await findOnePlayer(uidFirebase);
                if(!userDB){
                    history.push("/signup");
                } else {
                    // the player exist therefore --> set player online
                    await setPlayerOnline(uidFirebase);
                    let { uid, name, email, imageUrl } = userDB;
                    let player = new Player(uid, name, email, imageUrl, true);
                    updateAuthContext(player);
                    history.push("/")
                }
            } catch (error) {
                 console.log(stringifyError(error));
            }
        }
    
    return (
        <div className="container is-flex is-justify-content-center mt-5">
            <button className="button is-info has-text-white" onClick= {callback}>
                Login with google
            </button>
        </div>
    )
}
