import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({setAuthenticated,toggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  setAuthenticated(false)
  function handleAuthentication() {
    if(username === '' || password === ''){
      setAuthenticated(false);
      setMessage("All fields are required!");  
      return
    }

    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.authenticated) {
          setAuthenticated(true);
          setMessage("Authentication successful");
          navigate("/products");

        } else {
          setAuthenticated(false);
          setMessage("Authentication failed. Incorrect username or password.");
        }
      })
      .catch((error) =>
        setMessage("An error occurred.")
      );
  }

  return (
    <div>
      <h1>Login</h1>
      <p style={{color: "red"}}>{message}</p>
      <label>
        Username:
        <input type="text" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit" class="login-btn" onClick={handleAuthentication}>Login</button>
      <br/>
      <button type="button" onClick={toggleForm}>
        Switch to Signup
      </button>
    </div>
  );
};

export default LoginForm;
