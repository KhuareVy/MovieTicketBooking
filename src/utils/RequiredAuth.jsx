/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { AuthConsumer } from "../contextAPI/AuthContext";

export const RequiredAuth = ({ children }) => {
    const { isLoggedIn } = AuthConsumer();
    const location = useLocation();
    
    console.log("RequiredAuth - isLoggedIn:", isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ path: location.pathname }} />;
    }

    return children;
};