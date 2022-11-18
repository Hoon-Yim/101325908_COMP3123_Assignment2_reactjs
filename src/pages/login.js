// Modules
import React from "react";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import { Card, Form, Button, Stack, Row, Col } from "react-bootstrap";

export default function Login() {
    return (
        <Card style={{ width: "25rem", padding: "30px 20px" }}>
            <Stack gap={3}>
                <Card.Title style={{ "margin-bottom": "20px" }}>Log In</Card.Title>

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
                <Row className="mt-3">
                    <Col>
                        <Button href="signup" variant="secondary" style={{ width: "100%" }}>Sign Up</Button>
                    </Col>
                    <Col>
                        <Button variant="success" type="submit" style={{ width: "100%" }}>Log In</Button>
                    </Col>
                </Row>
            </Stack>
        </Card >
    );
}