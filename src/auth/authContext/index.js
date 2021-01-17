import React, { useState} from "react";

export const AuthContext = React.createContext({
    currentUser: false,
    setCurrentUser: () => {}
  });

export const AuthProvider = ({children}) => {

const [currentUser, setCurrentUser] = useState();

const initState = {
    currentUser,
    setCurrentUser
  } 
// i send the current value ++ the function to update the value (example once the user logged in or signup)
    return(
        <AuthContext.Provider value = { initState }>
                {children}
        </AuthContext.Provider>
    );
};