// Modules
import React from "react";

// Components
import {
    Button,
    Card
} from "react-bootstrap";

export default function Error() {
    return (
        <Card className="text-center" style={{ width: "25rem" }}>
            <Card.Header>
                <Card.Title className="mt-2">You are not logged in!</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>To access this endpoint, please log in!</Card.Text>
                <Button href="/login" variant="success" style={{ width: "50%" }}>Log in</Button>
            </Card.Body>
        </Card>
    )
}