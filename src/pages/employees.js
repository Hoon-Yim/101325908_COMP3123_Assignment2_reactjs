// Modules
import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import { Table, Container, Button, Stack } from "react-bootstrap";

export default class Employees extends React.Component {
    constructor(props) {
        super(props);

        const cookies = new Cookies();

        this.state = {
            jwt: cookies.get("jwt"),
            employees: []
        }
    }

    componentDidMount() {
        axios.get("https://comp3123-backend.herokuapp.com/api/emp/employees", {
            headers: { "Authorization": `Bearer ${this.state.jwt}` }
        }).then(res => {
            console.log(res);
            this.setState({ employees: res.data.employees });
        });
    }

    generateActionButtons() {
        return (
            <Stack direction="horizontal" gap={2}>
                <Button variant="success">Update</Button>
                <Button variant="danger">Delete</Button>
                <Button variant="light">View</Button>
            </Stack>
        )
    }

    generateTableBody() {
        return (
            <tbody>
                {
                    this.state.employees.map((employee, i) => {
                        return (
                            <tr key={i}>
                                <td>{employee.first_name}</td>
                                <td>{employee.last_name}</td>
                                <td>{employee.email}</td>
                                <td>{this.generateActionButtons()}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        )
    }

    render() {
        return (
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {this.generateTableBody()}
                </Table>
            </Container>
        );
    }
}