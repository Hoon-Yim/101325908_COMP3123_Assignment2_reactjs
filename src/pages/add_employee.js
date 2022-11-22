// Modules
import axios from "axios";
import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Components
import {
    Alert,
    Button,
    Card,
    Col,
    FloatingLabel,
    Form,
    InputGroup,
    Row,
    Stack
} from "react-bootstrap";

// Utils
import ValidateEmail from "../utils/validate_email";

export default function AddEmployee() {
    const cookies = new Cookies();
    const navigate = useNavigate();

    const [jwt] = useState(cookies.get("jwt"));

    const [isValid, setIsValid] = useState(true);
    const [message, setMessage] = useState("");

    // retrieve employee information if the use wants to update employee
    const id = useParams().id;

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("other");
    const [salary, setSalary] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);

    useEffect(() => {
        if (id) {
            axios.get(`https://comp3123-backend.herokuapp.com/api/emp/employees/${id}`, {
                headers: { "Authorization": `Bearer ${jwt}` },
            }).then(res => {
                const employee = { ...res.data.employee };
                setFirstName(employee.first_name);
                setLastName(employee.last_name);
                setEmail(employee.email);
                setGender(employee.gender);
                setSalary(employee.salary);
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        if (id === undefined) { // when creating new employee
            axios.post("https://comp3123-backend.herokuapp.com/api/emp/employees", {
                first_name: firstName,
                last_name: lastName,
                email: email,
                salary: parseFloat(salary),
                gender: gender
            }, {
                headers: { "Authorization": `Bearer ${jwt}` },
            }).then(() => {
                navigate('/');
            }).catch(error => {
                setIsValid(false);
                setMessage(error.response.data.message);
            });
        } else { // when updating existing employee
            axios.put(`https://comp3123-backend.herokuapp.com/api/emp/employees/${id}`, {
                first_name: firstName,
                last_name: lastName,
                email: email,
                salary: parseFloat(salary),
                gender: gender
            }, {
                headers: { "Authorization": `Bearer ${jwt}` },
            }).then(res => {
                navigate('/');
            }).catch(error => {
                setIsValid(false);
                setMessage(error.response.data.message);
            });
        }
    }

    return (
        <Card style={{ width: "25rem", padding: "30px 20px" }}>
            <Card.Title className="mb-3">Add Employee</Card.Title>
            <Form onSubmit={handleSubmit}>
                <Stack gap={3}>
                    <Form.Group>
                        <FloatingLabel
                            controlId="firstname_input"
                            label="First Name"
                        >
                            <Form.Control
                                type="text"
                                value={firstName}
                                onChange={event => {
                                    setFirstName(event.target.value);
                                }}
                                required />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group>
                        <FloatingLabel
                            controlId="lastname_input"
                            label="Last Name"
                        >
                            <Form.Control
                                type="text"
                                value={lastName}
                                onChange={event => {
                                    setLastName(event.target.value);
                                }}
                                required />
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
                                    value={email}
                                    onChange={event => {
                                        setEmail(event.target.value);
                                        setIsValidEmail(ValidateEmail(event.target.value));
                                    }}
                                    isInvalid={!isValidEmail}
                                    required />
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
                                    <Form.Control
                                        type="number"
                                        value={salary}
                                        onChange={event => setSalary(event.target.value)}
                                        step="0.01"
                                        required />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlId="gender_select"
                                    label="Gender"
                                >
                                    <Form.Control
                                        as="select"
                                        value={gender}
                                        onChange={event => setGender(event.target.value)}
                                    >
                                        <option value="other">Other</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </Form.Control>
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Form.Group>

                    {isValid || <Alert variant="danger">{message}</Alert>}

                    <Form.Group>
                        <Button variant="success" type="submit" style={{ width: "100%" }}>{(id && "Update") || ("Add")}</Button>
                        <Button href="/" variant="secondary" style={{ "margin-top": "10px", width: "100%" }}>Cancel</Button>
                    </Form.Group>
                </Stack>
            </Form>
        </Card>
    )
}