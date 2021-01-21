import React, { useContext} from 'react';
import { AuthContext } from '../authContext';
import { stringifyError, findOnePlayer, loginWithPopup } from '../../services/authService';
import { Player } from '../../common/Classes';

export const Login = ( { history } ) => {
    const { updateAuthContext } = useContext(AuthContext);

    const callback = async () => {
            try {
                let user = await loginWithPopup();
                let { uid } = user;
                let userDB = await findOnePlayer(uid);
                if(!userDB){
                    history.push("/signup");
                } else {
                    let {uid, name, email, imageUrl} = userDB;
                    let player = new Player(uid, name, email, imageUrl);
                    updateAuthContext(player);
                    history.push("/")
                }
            } catch (error) {
                 console.log(stringifyError(error));
            }
        }
    
    return (
        <div>
            <button onClick= {callback}>
                Login with google
            </button>
        </div>
    )
}
