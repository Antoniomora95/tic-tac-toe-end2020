import React, { useState } from "react";

export const AuthContext = React.createContext({
    currentUser: {},
    updateAuthUser: () => { },
    currentGame: {},
    updateCurrentGame: ()=> { }
});

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState();
    const [currentGame, setCurrentGame] = useState();

    const updateAuthUser = (user) => setCurrentUser(user);
    const updateAuthGame = (game) => setCurrentGame(game);

    // i send the current value ++ the function to update the value (example once the user logged in or signup)
    return (
        <AuthContext.Provider value={{currentUser, updateAuthUser, currentGame, updateAuthGame}}>
            {children}
        </AuthContext.Provider>
    );
};