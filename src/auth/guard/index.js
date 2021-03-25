import React , { useContext } from "react";
import { Route, Redirect, useRouteMatch } from "react-router-dom";
import { AuthContext } from '../authContext';

// every time a redirect will take place validate the current user, it should include token in the next commit (the token needs to be valid as well)


export const AuthGuardRoute = ({component: RouteComponent, ...rest}) => {
    const { currentUser } = useContext(AuthContext);
    return(
        <Route
        {...rest}
        render = { routeProps => !!currentUser && currentUser.uid ? ( <RouteComponent { ...routeProps }/> ) : (  <Redirect to={'/login'}/> )
        }
        />
    );
}

export const GameGuardRoute = ( { component: RouteComponent, ...rest } ) => {
    const { currentGame } = useContext(AuthContext);
    let { path } = useRouteMatch();
    console.log(path, currentGame, 'GameGuardRoute...');
    return(
        <Route
        {...rest}
        render = { routeProps => !!currentGame && currentGame.uid ?
            ( <RouteComponent { ...routeProps }/>) :
            (  <Redirect to={`${path}`}/> )
        }
        />
    );
}


