
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from './auth/login';
import { SignUp } from './auth/signup'
import { Board } from './board/Board';
import app from './firebase/configuration'

function App(props) {
  const { match, location, history } = props;
  console.log(match, location, history);
  return (
    <div className="App">
      <header className="App-header">
        Tic tac toe
        <button onClick={ ()=> app.auth().signOut()}>sign out button</button>
      </header>
      <Router>
        <Switch>
          <Route exact path="/login" component = {Login}/>
          <Route exact path="/signup" component= { SignUp }/>
          <Route exact path="/" component= { Board }/>
        </Switch>
      </Router>
    </div>
  );
}


export default App;

