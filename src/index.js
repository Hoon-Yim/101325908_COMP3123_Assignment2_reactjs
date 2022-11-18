// Modules
import React from 'react';
import ReactDOM from 'react-dom/client';

// Pages
import Login from "./pages/login";

// CSS
import './index.css';

// Components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Header />
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);