import React, { useContext } from "react";
import { AuthContext } from "../authContext";
import {
  loginWithPopup,
  signupPlayer
} from "../../services/authService";
import { Player } from "../../common/Classes";
import { stringifyError } from "../../common/functions";

export const SignUp = ({ history }) => {
  const { updateAuthUser } = useContext(AuthContext);
  const callback = async () => {
    try {
      let { displayName, email, photoURL, uid } = await loginWithPopup();
      let player = new Player(uid, displayName, email, photoURL, true, false, false);
      let registered = await signupPlayer(player);
      if (registered) {
        updateAuthUser(player);
        history.push("/");
      }
    } catch (error) {
      console.log(stringifyError(error));
    }
  };
  return (
    <div>
      <div className="is-flex is-justify-content-center mt-5">
        <button className="button is-danger" onClick={callback}>
          Signup with google
        </button>
      </div>
      <div className="column is-5 is-offset-one-quarter mt-5 notification is-info is-light has-text-centered">
        <button className="delete"></button>
        It looks like you do not have an account!
      </div>
    </div>
  );
};
