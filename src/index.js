// Modules
import React from 'react';
import ReactDOM from 'react-dom/client';

// Pages
import Login from "./pages/login";

// Components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Header />
        <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }} >
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    </React.StrictMode >
);