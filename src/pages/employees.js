// Modules
import React from "react";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import { Table } from "react-bootstrap";

export default function Employees() {
    return (
        <Table>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </Table>
    );
}