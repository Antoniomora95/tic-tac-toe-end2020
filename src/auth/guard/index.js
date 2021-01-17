import React , { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from '../authContext';

// every time a redirect will take place validate the current user, it should include token in the next commit (the token needs to be valid as well)

export const AuthGuardRoute = ({component: RouteComponent, ...rest}) => {
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser, 'I have the value');
    return(
        <Route
        {...rest}
        render = { routeProps => !!currentUser ?
            ( <RouteComponent { ...routeProps }/>) :
            (  <Redirect to={'/login'}/> )
        }
        />
    );
}
