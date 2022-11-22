// Modules
import axios from "axios";
import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Components
import {
    Card,
    Col,
    Row,
    Stack,
} from "react-bootstrap";

export default function ViewEmployee() {
    const cookies = new Cookies();

    const jwt = cookies.get("jwt");
    const id = useParams().id;

    const [employee, setEmployee] = useState({});

    useEffect(() => {
        axios.get(`https://comp3123-backend.herokuapp.com/api/emp/employees/${id}`, {
            headers: { "Authorization": `Bearer ${jwt}` }
        }).then(res => {
            setEmployee(res.data.employee);
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card style={{ width: "25rem", padding: "30px 20px" }}>
            <Card.Title className="mb-3">Employee Info - {employee.first_name} {employee.last_name}</Card.Title>
            <Stack>
                <Card.Text>Full Name: {employee.first_name} {employee.last_name}</Card.Text>
                <Card.Text>Email: {employee.email}</Card.Text>
                <Row>
                    <Col>
                        <Card.Text>Gender: {employee.gender}</Card.Text>
                    </Col>
                    <Col>
                        <Card.Text>salary: ${employee.salary}</Card.Text>
                    </Col>
                </Row>
            </Stack>
        </Card>
    )
}