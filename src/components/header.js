// Modules
import Cookies from "universal-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";

// Components
import {
    Button,
    Container,
    Navbar,
} from "react-bootstrap";

export default function Header(props) {
    const cookies = new Cookies();
    const navigate = useNavigate();

    function handleLogout(event) {
        event.preventDefault();

        cookies.set("jwt", "loggedout", { path: '/' });
        props.sendAuthenticationState();
        navigate('/login');
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">COMP3123 Assignment2</Navbar.Brand>
                {
                    props.isAuthenticated &&
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Brand style={{ "marginRight": "10px" }}>
                            {props.user.username}
                        </Navbar.Brand>
                        <Button id="userinfo" variant="outline-danger" onClick={handleLogout}>Log Out</Button>
                    </Navbar.Collapse>
                }
                {
                    props.isAuthenticated ||
                    <Navbar.Collapse className="justify-content-end">
                        <Button id="userinfo" variant="outline-success" href="/login">Log in</Button>
                    </Navbar.Collapse>
                }
            </Container>
        </Navbar>
    );
}