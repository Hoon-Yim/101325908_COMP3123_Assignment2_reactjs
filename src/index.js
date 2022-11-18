// Modules
import React from 'react';
import ReactDOM from 'react-dom/client';

// css
import './index.css';

// Components
import Header from "./components/header";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <div>
            <Header />
        </div>
    </React.StrictMode>
);