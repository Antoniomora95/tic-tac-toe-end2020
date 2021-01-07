
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {useCallback } from "react"
import { Login } from './auth/login';
import { SignUp } from './auth/signup'
import { Board } from './board/Board';
import app from './firebase/configuration';
import { AuthProvider } from './auth/authContext';

function App(props) {
  const { match, location, history } = props;
  const callback = useCallback(
    () => {
      app.auth()
        .signInWithPopup()
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log(credential, token, user);
          // ...
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },
    [],
  )
  return (
    <div className="App">
      <AuthProvider>
        <header className="App-header">
          Tic tac toe
        <button onClick={ callback }>click this</button>
        </header>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/" component={Board} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}


export default App;

