import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignupForm = ({ toggleForm }) => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSignUp() {
    if(username === '' || password === '' || confirmPassword === ''|| email === ''){
      
      setMessage("All fields are required!");  
      return
    }

    else if(password !== confirmPassword){
      setMessage("Passwords do not match!");  
      return
    }
    
    fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password, email: email }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.signedUp) {
          setMessage("User signed up successfully!");
          var inputs = document.querySelectorAll('input');
          inputs.forEach(input => input.value = '');
        } else {
    
          setMessage("Username is already taken!");
        }
      })
      .catch((error) =>
        setMessage("An error occurred.")
      );
  }


  return (
    <div>
      <p style={{color: "red"}}>{message}</p>
      <label>
        Username:
        <input placeholder="Enter your username" type="text" onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input placeholder="Enter your password" type="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <label>
        Confirm Password:
        <input placeholder="Confirm your password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input placeholder="Enter your email" type="email" onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <button type="submit" class="signup-btn" onClick={handleSignUp}>Signup</button>
      <br/>
      <button type="button" onClick={toggleForm}>
        Switch to Login
      </button>

    </div>
  );
};

export default SignupForm;
