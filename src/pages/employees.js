// Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import { Table, Container, Button, Stack } from "react-bootstrap";

export default function Employees(props) {
    const cookies = new Cookies();

    const [jwt, setJwt] = useState(cookies.get("jwt"));
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get("https://comp3123-backend.herokuapp.com/api/emp/employees", {
            headers: { "Authorization": `Bearer ${jwt}` }
        }).then(res => {
            console.log(res);
            setEmployees(res.data.employees);
        });
    }, [])

    function generateActionButtons() {
        return (
            <Stack direction="horizontal" gap={2}>
                <Button variant="success">Update</Button>
                <Button variant="danger">Delete</Button>
                <Button>View</Button>
            </Stack>
        )
    }

    function generateTableBody() {
        return (
            <tbody>
                {
                    employees.map((employee, i) => {
                        return (
                            <tr key={i}>
                                <td>{employee.first_name}</td>
                                <td>{employee.last_name}</td>
                                <td>{employee.email}</td>
                                <td>{generateActionButtons()}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        )
    }

    return (
        <Container>
            <Button className="mb-4" href="/add_employee">Add Employee</Button>
            <Table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {generateTableBody()}
            </Table>
        </Container>
    );
}