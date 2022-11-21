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

export default function AddEmployee(props) {
    const cookies = new Cookies();
    const navigate = useNavigate();

    const [jwt, setJwt] = useState(cookies.get("jwt"));

    const [isValid, setIsValid] = useState(true);
    const [message, setMessage] = useState("");

    const [isValidEmail, setIsValidEmail] = useState(true);

    function handleSubmit(event) {
        event.preventDefault();
        
        axios.post("https://comp3123-backend.herokuapp.com/api/emp/employees", {
            first_name: event.target.firstname_input.value,
            last_name: event.target.lastname_input.value,
            email: event.target.email_input.value,
            salary: parseFloat(event.target.salary_input.value),
            gender: event.target.gender_select.value,
        }, {
            headers: { "Authorization": `Bearer ${jwt}` },
        }).then(res => {
            navigate('/');
        }).catch(error => {
            setIsValid(false);
            setMessage(error.response.data.message);
        });
    }

    return(
        <Card style={{ width: "25rem", padding: "30px 20px" }}>
            <Card.Title className="mb-3">Add Employee</Card.Title>
            <Form onSubmit={handleSubmit}>
                <Stack gap={3}>
                    <Form.Group>
                        <FloatingLabel
                            controlId="firstname_input"
                            label="First Name"
                        >
                            <Form.Control type="text" required />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group>
                        <FloatingLabel
                            controlId="lastname_input"
                            label="Last Name"
                        >
                            <Form.Control type="text" required />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group>
                        <InputGroup hasValidation>
                            <FloatingLabel
                                controlId="email_input"
                                label="Email"
                            >
                                <Form.Control 
                                    type="email" 
                                    onChange={event => setIsValidEmail(ValidateEmail(event.target.value)) }
                                    isInvalid={!isValidEmail} 
                                    required/>
                                <Form.Control.Feedback type="invalid">
                                    Invalid Email Format
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Row>
                            <Col>
                                <FloatingLabel
                                    controlId="salary_input"
                                    label="Salary"
                                >
                                    <Form.Control type="number" step="0.01" required />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlId="gender_select"
                                    label="Gender"
                                >
                                    <Form.Select aria-label="something">
                                        <option value="other">Other</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Form.Group>

                    {isValid || <Alert variant="danger">{message}</Alert>}

                    <Form.Group>
                        <Button variant="success" type="submit" style={{ width: "100%" }}>Add</Button>
                    </Form.Group>
                </Stack>
            </Form>
        </Card>
    )
}