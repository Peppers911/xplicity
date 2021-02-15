import React from "react";
import { Card, Col, Container, Navbar, Row } from "react-bootstrap";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import Parser from "./pages/analysis/parser";
import Bitcoin from "./pages/currencies/bitcoin";

function App(): JSX.Element {
    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Xplicity</Navbar.Brand>
                </Container>
            </Navbar>
            <Container>
                <Switch>
                    <Route path="/currencies">
                        <Bitcoin />
                    </Route>
                    <Route path="/analysis">
                        <Parser />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </Container>
        </>
    );
}

function Home() {
    return (
        <Row>
            <Col>
                <Link to="/currencies">
                    <Card bg="light">
                        <Card.Body>
                            <Card.Title>Currencies</Card.Title>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
            <Col>
                <Link to="/analysis">
                    <Card bg="light">
                        <Card.Body>
                            <Card.Title>Analysis</Card.Title>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        </Row>
    );
}
export default App;