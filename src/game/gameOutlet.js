import React from 'react';
import { Switch, Route, Redirect, useRouteMatch, Link } from "react-router-dom";
import { GameGuardRoute } from '../auth/guard';
import { Board } from './board/Board';
import { Dashboard } from './dashboard/dashboard';


export const GameOutlet = () => {
    let { path, url } = useRouteMatch();
    return (
        <>
            <h1>This is the title of route task</h1>
            <Link to={`${url}on`}> One link </Link>
            <Link to={`${url}two`}> Two link </Link>
            <Link to={`${url}board`}> Board link </Link>
            <Switch>
                <Route exact path={`${path}one`}><p>this is route one...</p></Route>
                <Route exact path={`${path}two`}><p>this is route two...</p></Route>

                <GameGuardRoute exact path={`${path}board`} component= { Board }/>
                <Route exact path={`${path}dashboard`} component= { Dashboard }/>

                <Route exact path="/">
                    <Redirect to={"/dashboard"}></Redirect>
                </Route>
                
                <Route path="*" render={() => <p>this is route not found...</p>} />
            </Switch>
        </>
    )
}
// <Route exact path="/*" component={SignUp} />