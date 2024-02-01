import React, { useState } from "react";
import { useLocalStrorage } from "../util/useLocalStorage";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Login = () => {
  const [jwt, setJwt] = useLocalStrorage("", "jwt");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // console.log(username);

  const sendLoginRequest = () => {
    // console.log("hello");

    const reqbody = {
      username: username,
      password: password,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqbody),
    };

    fetch("api/auth/login", requestOptions)
      .then((responce) => {
        if (responce.status === 200)
          return Promise.all([responce.json(), responce.headers]);
        else return Promise.reject("Invalid login attempt");
      })
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
        window.location.href = "dashboard";
      })
      .catch((msg) => {
        alert(msg);
      });
  };

  return (
    <>
      <Container className="mt-4">
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username" className="fs-4">
            Username
          </Form.Label>
          <Form.Control
            type="email"
            id="username"
            size="lg"
            placeholder="john.doe@gmail.com"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password" className="fs-4">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            id="password"
            size="lg"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Row className="mt-4">
          <Col>
            <Button
              id="submit"
              type="button"
              size="lg"
              onClick={() => sendLoginRequest()}
              variant="primary"
            >
              Login
              {/* onClick = {sendLoginRequest()}  will execute/invoke function immediately when the component is rendered */}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
