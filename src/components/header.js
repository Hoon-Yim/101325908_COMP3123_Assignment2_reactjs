import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function Header() {
    return (
        <Router>
            <Link to='/about'>About</Link>
        </Router>
    );
}