import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import { GameGuardRoute } from '../auth/guard';
import { Board } from './board/Board';
import { Dashboard } from './dashboard/dashboard';


export const GameOutlet = () => {
    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let { path } = useRouteMatch();
    console.log(`${path}home`, 'pat outlet');
    return (
        <div> 
            <p>hi there this is antonio</p>
            <Switch>
                <Redirect from={`${path}`} to={`${path}home`}/>
                <Route    path={`${path}home`}><p>example</p></Route>
                <GameGuardRoute exact path={`${path}board`}  component={ Board }/>
          </Switch>
        </div>
        
    )
}
// <Route exact path="/*" component={SignUp} />