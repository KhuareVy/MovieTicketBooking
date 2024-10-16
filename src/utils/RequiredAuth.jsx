/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contextAPI/AuthContext";
import { useContext } from "react";

export const RequiredAuth = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);
    const location = useLocation();
    
    // console.log("RequiredAuth - isLoggedIn:", isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ path: location.pathname }} />;
    }

    return children;
};