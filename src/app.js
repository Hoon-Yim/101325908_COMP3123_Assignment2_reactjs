// Modules
import axios from "axios";
import Cookies from "universal-cookie";
import React, { useState, useEffect } from "react";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import AddEmployee from "./pages/add_employee";
import EmployeeList from "./pages/employees";
import ErrorPage from "./pages/error";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ViewEmployee from "./pages/view_employee";

// Components
import Header from "./components/header";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

export default function App() {
    const cookies = new Cookies();

    const jwt = cookies.get("jwt");
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getAuthenticationState(user) {
        setUser(user);
        setIsAuthenticated(!isAuthenticated);
    }

    function returnPageOrError(jsx) {
        if (isAuthenticated) return jsx
        else return <ErrorPage />
    }

    return (
        <div>
            <BrowserRouter>
                <Header user={user} isAuthenticated={isAuthenticated} sendAuthenticationState={getAuthenticationState} />
                <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }} >
                    <Routes>
                        <Route path="/" element={returnPageOrError(<EmployeeList />)} />
                        <Route path="/login" element={<Login sendAuthenticationState={getAuthenticationState} />} />
                        <Route path="/signup" element={<Signup sendAuthenticationState={getAuthenticationState} />} />
                        <Route path="/add_employee" element={returnPageOrError(<AddEmployee />)} />
                        <Route path="/update_employee/:id" element={returnPageOrError(<AddEmployee />)} />
                        <Route path="/employee/:id" element={returnPageOrError(<ViewEmployee />)} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}