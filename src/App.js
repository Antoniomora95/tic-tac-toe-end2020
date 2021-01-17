
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from './auth/login';
import { SignUp } from './auth/signup'
import { Board } from './board/Board';
import { AuthProvider } from './auth/authContext';
import { AuthGuardRoute } from './auth/guard/index';
import { Header } from './Header';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header/>
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

