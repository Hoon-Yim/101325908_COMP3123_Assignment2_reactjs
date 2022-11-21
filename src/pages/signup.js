// Modules
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import { Alert, Button, Card, Form, InputGroup, Stack, Row, Col, FloatingLabel } from "react-bootstrap";

// Utils
import ValidateEmail from "../utils/validate_email";

export default function Signup(props) {
    const cookies = new Cookies();
    const navigate = useNavigate();

    const [isValid, setIsValid] = useState(true);
    const [message, setMessage] = useState("");

    const [isValidEmail, setIsValidEmail] = useState(true);

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    useEffect(() => {
        checkPasswordIdentity();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, passwordConfirm])

    function checkPasswordIdentity() {
        if (password !== passwordConfirm) setIsPasswordMatch(false);
        else setIsPasswordMatch(true);
    }

    function handleSignup(event) {
        event.preventDefault();

        // check if confirm password is corresponds to the password
        if (isPasswordMatch) {
            axios.post("https://comp3123-backend.herokuapp.com/api/user/signup", {
                username: event.target.username_input.value,
                email: event.target.email_input.value,
                password: password,
                password_confirm: passwordConfirm,
            }).then(res => {
                setIsValid(true);
                cookies.set("jwt", res.data.token, { path: '/' });
                navigate('/');
                props.sendAuthenticationState(res.data.user);
            }).catch(error => {
                setIsValid(false);
                setMessage(error.response.data.message);
            });
        }
    }

    return(
        <Card style={{ width: "25rem", padding: "30px 20px" }}>
            <Card.Title className="mb-3">Sign Up</Card.Title>
            <Form validated={false} onSubmit={handleSignup}>
                <Stack gap={3}>
                    <Form.Group>
                        <InputGroup hasValidation>
                            <FloatingLabel 
                                controlId="username_input"
                                label="Username"
                            >
                                <Form.Control type="text" required/>
                                <Form.Control.Feedback type="invalid">
                                    Please enter a username.
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <InputGroup hasValidation>
                            <FloatingLabel
                                controlId="email_input"
                                label="Email"
                            >
                                <Form.Control 
                                    type="email" 
                                    onChange={event => { setIsValidEmail(ValidateEmail(event.target.value)); }}
                                    isInvalid={!isValidEmail} 
                                    required/>
                                <Form.Control.Feedback type="invalid">
                                    Invalid Email Format
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <InputGroup hasValidation>
                            <FloatingLabel
                                controlId="password_input"
                                label="Password"
                            >
                                <Form.Control 
                                    type="password" 
                                    onChange={event => setPassword(event.target.value)} 
                                    required/>
                                <Form.Control.Feedback type="invalid">
                                    Please enter a password
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <InputGroup hasValidation>
                            <FloatingLabel
                                controlId="password_confirm_input"
                                label="Password Confirm"
                            >
                                <Form.Control 
                                    type="password" 
                                    onChange={event => setPasswordConfirm(event.target.value)} 
                                    isInvalid={!isPasswordMatch} 
                                    required/>
                                <Form.Control.Feedback type="invalid">
                                    Password does not match
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </InputGroup>
                    </Form.Group>

                    {isValid || <Alert variant="danger">{message}</Alert>}

                    <Form.Group>
                        <Row>
                            <Col>
                                <Button href="/" variant="secondary" style={{ width: "100%" }}>Cancel</Button>
                            </Col>
                            <Col>
                                <Button variant="success" type="submit" style={{ width: "100%" }}>Sign Up</Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Stack>
            </Form>
        </Card>
    )
}