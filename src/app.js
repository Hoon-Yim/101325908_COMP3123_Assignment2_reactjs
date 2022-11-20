import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

// Pages
import Login from "./pages/login";
import EmployeeList from "./pages/employees";

// Components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";

export default function App() {
    const cookies = new Cookies();

    const [jwt, setJwt] = useState(cookies.get("jwt"));
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        axios.get("https://comp3123-backend.herokuapp.com/api/user/get_logged_in_user", {
            headers: { "Authorization": `Bearer ${jwt}` }
        }).then(res => {
            setUser(res.data.user);
            setIsAuthenticated(true);
        }).catch(error => {
            setIsAuthenticated(false);
        });
    }, []);

    function getAuthenticationState() {
        setIsAuthenticated(!isAuthenticated);
    }

    return(
        <div>
            <BrowserRouter>
                <Header user={user} isAuthenticated={isAuthenticated} />
                <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }} >
                    <Routes>
                        <Route path="/" element={isAuthenticated && <EmployeeList />} />
                        <Route path="/login" element={<Login sendAuthenticationState={getAuthenticationState} />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}