// Modules
import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import { Card, Form, Button, Stack, Row, Col, Alert } from "react-bootstrap";

export default function Login(props) {
    const [isValid, setIsValid] = useState(true);
    const [message, setMessage] = useState("");

    const cookies = new Cookies();
    const navigate = useNavigate();

    function handleLogin(event) {
        event.preventDefault();

        axios.post("https://comp3123-backend.herokuapp.com/api/user/login", {
            email: event.target.email_input.value,
            password: event.target.password_input.value,
        }).then(res => {
            setIsValid(true);
            cookies.set("jwt", res.data.token, { path: '/' });
            navigate('/', { isAuthenticated: isValid });
            props.sendAuthenticationState();
        }).catch(error => {
            setIsValid(false);
            setMessage(error.response.data.message);
        });
    }

    return (
        <Card style={{ width: "25rem", padding: "30px 20px" }}>
            <Card.Title className="mb-3">Log In</Card.Title>
            <form onSubmit={handleLogin}>
                <Stack gap={3}>
                    <Form.Group>
                        <Form.Label htmlFor="email_input">Email</Form.Label>
                        <Form.Control
                            id="email_input"
                            type="email"
                            placeholder="abc123@gmail.com" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="password_input">Password</Form.Label>
                        <Form.Control
                            id="password_input"
                            type="password" />
                    </Form.Group>

                    {isValid || <Alert variant="danger">{message}</Alert>}

                    <Form.Group>
                        <Row>
                            <Col>
                                <Button href="signup" variant="secondary" style={{ width: "100%" }}>Sign Up</Button>
                            </Col>
                            <Col>
                                <Button variant="success" type="submit" style={{ width: "100%" }}>Log In</Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Stack>
            </form>
        </Card >
    );
}