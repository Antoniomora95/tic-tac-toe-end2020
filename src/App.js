
import './App.css';
import 'bulma/css/bulma.css';
import { BrowserRouter as Router, Route, Switch, useRouteMatch, Redirect, Link } from "react-router-dom";
import { Login } from './auth/login';
import { SignUp } from './auth/signup'
import { GameOutlet } from './game/gameOutlet';
import { AuthProvider } from './auth/authContext';
import { AuthGuardRoute } from './auth/guard/index';
import { Header } from './Header';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/" >
              <Redirect to={"/home"}></Redirect>
            </Route>
            <Route  path="/home" component={Task} />
            <Redirect path="*" to={"/login"}/>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}
//IT SEEMS EXACT IN AuthGuardRoute WAS MESSING UP THE REDIRECT WHEN NO SESSION

const Task = () => {
  let { path, url } = useRouteMatch();
  console.log(path, url, 'task...');
  return (<>
    <h1>This is the title of route task</h1>
    <Link to={`${url}/one`}> go to one </Link>
    <Link to={`${url}/two`}> go to two </Link>

    <Switch>
      <Route  path={`${path}/one`}><p>this is route one...</p></Route>
      <Route  path={`${path}/two`}><p>this is route two...</p></Route>
      <Redirect path="*" to={`${path}`}/>
    </Switch>
  </>

  )
}

export default App;

//<Route exact path="**" component={SignUp} />