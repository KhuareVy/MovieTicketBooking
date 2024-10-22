import { createContext, useEffect, useState, useContext } from "react";

const AuthContext = createContext();

const USERNAME = "userName";
const IS_LOGGED_IN = "isLoggedIn";
const TOKEN = "token";

function useAuth() {
    const storedUserName = localStorage.getItem(USERNAME);
    const storedIsLoggedIn = localStorage.getItem(IS_LOGGED_IN);
    const storedToken = localStorage.getItem(TOKEN);

    const [userName, setUserName] = useState(storedUserName);
    const [isLoggedIn, setIsLoggedIn] = useState(storedIsLoggedIn);
    const [token, setToken] = useState(storedToken);

    return {
        userName,
        isLoggedIn,
        token,
        login(userName, token) {
            return new Promise((resolve) => {
                localStorage.setItem(USERNAME, userName);
                localStorage.setItem(IS_LOGGED_IN, "true");
                localStorage.setItem(TOKEN, token);
                setUserName(userName);
                setIsLoggedIn(true);
                setToken(token);
                resolve();
            });
        },
        logout() {
            return new Promise((resolve) => {
                localStorage.removeItem(USERNAME);
                localStorage.removeItem(IS_LOGGED_IN);
                localStorage.removeItem(TOKEN);
                setUserName("");
                setIsLoggedIn(false);
                setToken("");
                resolve();
            });
        },
    }
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    // const [userName, setUserName] = useState("");
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [token, setToken] = useState("");

    // useEffect(() => {
    //     const storedUserName = localStorage.getItem(USERNAME);
    //     const storedIsLoggedIn = localStorage.getItem(IS_LOGGED_IN);
    //     const storedToken = localStorage.getItem(TOKEN);

    //     // console.log("Stored values:", { storedUserName, storedIsLoggedIn, storedToken });

    //     if (storedUserName && storedIsLoggedIn === "true" && storedToken) {
    //         setUserName(storedUserName);
    //         setIsLoggedIn(true);
    //         setToken(storedToken);
    //     }
    // }, []);

    // const login = (userName, token) => {
    //     localStorage.setItem(USERNAME, userName);
    //     localStorage.setItem(IS_LOGGED_IN, "true");
    //     localStorage.setItem(TOKEN, token);
    //     setUserName(userName);
    //     setIsLoggedIn(true);
    //     setToken(token);
    // };

    // const logout = () => {
    //     localStorage.removeItem(USERNAME);
    //     localStorage.removeItem(IS_LOGGED_IN);
    //     localStorage.removeItem(TOKEN);
    //     setUserName("");
    //     setIsLoggedIn(false);
    //     setToken("");
    // };

    const auth = useAuth();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export const AuthConsumer = () => {
    return useContext(AuthContext);
}