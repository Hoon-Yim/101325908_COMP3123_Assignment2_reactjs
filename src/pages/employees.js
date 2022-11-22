// Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import { Table, Container, Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Employees() {
    const cookies = new Cookies();
    const navigate = useNavigate();

    const jwt = cookies.get("jwt");
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get("https://comp3123-backend.herokuapp.com/api/emp/employees", {
            headers: { "Authorization": `Bearer ${jwt}` }
        }).then(res => {
            setEmployees(res.data.employees);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function deleteEmployee(employee) {
        axios.delete(`https://comp3123-backend.herokuapp.com/api/emp/employees?eid=${employee._id}`, {
            headers: { "Authorization": `Bearer ${jwt}` }
        }).then(() => {
            navigate(0);
        });
    }

    function generateActionButtons(employee) {
        return (
            <Stack direction="horizontal" gap={2}>
                <Button href={`/update_employee/${employee._id}`} variant="success">Update</Button>
                <Button onClick={() => deleteEmployee(employee)} variant="danger">Delete</Button>
                <Button href={`/employee/${employee._id}`}>View</Button>
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
                                <td>{generateActionButtons(employee)}</td>
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