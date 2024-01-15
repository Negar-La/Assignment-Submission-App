import React, { useState } from "react";
import { useLocalStrorage } from "../util/useLocalStorage";

const Login = () => {
  const [setJwt] = useLocalStrorage("", "jwt");

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
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="email"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <button id="submit" type="button" onClick={() => sendLoginRequest()}>
          Login
          {/* onClick = {sendLoginRequest()}  will execute/invoke function immediately when the component is rendered */}
        </button>
      </div>
    </>
  );
};

export default Login;
