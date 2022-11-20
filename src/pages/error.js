import React from "react";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import { Button, Card } from "react-bootstrap";

export default function Error() {
    return(
        <Card className="text-center" style={{ width: "25rem" }}>
            <Card.Header>
                <Card.Title className="mt-2">You are not logged in!</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>To view employee list, please log in!</Card.Text>
                <Button href="/login" variant="success" style={{ width: "50%" }}>Log in</Button>
            </Card.Body>
        </Card>
    )
}