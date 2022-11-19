// Modules
import React from "react";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import { Navbar, Container } from "react-bootstrap";

export default function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">COMP3123 Assignment2</Navbar.Brand>
            </Container>
        </Navbar>
    );
}