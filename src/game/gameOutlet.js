import React from 'react';
import { Switch, Route, Redirect, useRouteMatch, NavLink } from "react-router-dom";
import { GameGuardRoute } from '../auth/guard';
import { Board } from './board/Board';
import { Board2 } from './board/Board2';
import { Dashboard } from './dashboard/dashboard';


export const GameOutlet = () => {
    let { path, url } = useRouteMatch();
    let activeStyle={
        borderBottom: "1px solid #00d1b2"
      }
    

    return (
        <>
            <div className="navbar-menu is-flex is-justify-content-center mb-2">
                <ul className="is-flex">
                    <li><NavLink to={`${url}home`} className="is-flex p-3 has-text-white" activeClassName="has-text-primary"  activeStyle={activeStyle}>Home</NavLink></li>
                    <li><NavLink to={`${url}about`} className="is-flex p-3 has-text-white" activeClassName="has-text-primary" activeStyle={activeStyle} >About</NavLink> </li>
                    <li><NavLink to={`${url}board`} className="is-flex p-3 has-text-white" activeClassName="has-text-primary" activeStyle={activeStyle}>Board</NavLink></li>
                    <li><NavLink to={`${url}dashboard`} className="is-flex p-3 has-text-white" activeClassName="has-text-primary" activeStyle={activeStyle}>Dashboard</NavLink></li>
                    <li><NavLink to={`${url}not-found`} className="is-flex p-3 has-text-white" activeClassName="has-text-primary" activeStyle={activeStyle}>Not found</NavLink></li>
                </ul>

            </div>

            <Switch>
                <Route exact path={`${path}home`}><p>This is the home view, ignore it I was learning how to use React router...</p></Route>
                <Route exact path={`${path}about`}><p>This is the about view, ignore it I was learning how to use React router...</p></Route>
                <GameGuardRoute exact path={`${path}board`} component={Board2} />
                <Route exact path={`${path}dashboard`} component={Dashboard} />
                <Route exact path="/">
                    <Redirect to={"/dashboard"}></Redirect>
                </Route>

                <Route path="*" render={() => <p>Upsss, I could not find that route</p>} />
            </Switch>
        </>
    )
}
// <Route exact path="/*" component={SignUp} />