import { createContext, useState } from "react";

export const UserContext = createContext();
// eslint-disable-next-line react/prop-types
export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return <UserContext.Provider value={{
        user,
        setUser,
        token,
        setToken,
        isAuthenticated,
        setIsAuthenticated
    }}>{ children }</UserContext.Provider>
}