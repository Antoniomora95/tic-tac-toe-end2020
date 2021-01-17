
import './App.css';
import { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from './auth/login';
import { SignUp } from './auth/signup'
import { Board } from './board/Board';
import { AuthProvider, AuthContext } from './auth/authContext';
import { AuthGuardRoute } from './auth/guard/index';
import { app } from './firebase/configuration'
function App(props) {
  const context = useContext(AuthContext);
  console.log(context);
  const { currentUser } = !!context ? context : null;
  return (
    <div className="App">
      <AuthProvider>
        <header className="App-header">
          Tic tac toe
          { currentUser && <button onClick = { () => app.auth().signOut() }>Sign Out</button> }
        </header>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <AuthGuardRoute exact path="/" component={Board}/>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}


export default App;

