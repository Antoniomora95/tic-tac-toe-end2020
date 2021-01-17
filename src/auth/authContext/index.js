import React, { useState } from "react";

export const AuthContext = React.createContext({
    currentUser: {},
    updateAuthContext: () => { }
});

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState();

    const updateAuthContext = (user) => setCurrentUser(user);

    // i send the current value ++ the function to update the value (example once the user logged in or signup)
    return (
        <AuthContext.Provider value={{currentUser, updateAuthContext}}>
            {children}
        </AuthContext.Provider>
    );
};