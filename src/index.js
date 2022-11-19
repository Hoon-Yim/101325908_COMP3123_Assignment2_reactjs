// Modules
import React from 'react';
import ReactDOM from 'react-dom/client';

// Pages
import Login from "./pages/login";
import EmployeeList from "./pages/employees";

// Components
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { CookiesProvider } from 'react-cookie';
import Header from "./components/header";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* <CookiesProvider> */}
        <Header />
        <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }} >
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<EmployeeList />} />
                    <Route path="login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
        {/* </CookiesProvider> */}
    </React.StrictMode >
);