import React, { useState } from 'react';
import './Register.css';
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import close_icon from '../assets/close.png';

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const gohome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();

    let register_url = window.location.origin + "/djangoapp/register";

    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email
      }),
    });

    const json = await res.json();
    if (json.status === "Authenticated") {
      sessionStorage.setItem('username', json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("User already exists");
    }
  };

  return (
    <div className="register_container" style={{ width: "50%", margin: "auto", marginTop: "5%" }}>
      <div className="header" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <span className="text" style={{ fontSize: "36px", fontWeight: "bold" }}>Sign Up</span>
        <a href="/" onClick={() => gohome()} style={{ alignSelf: "flex-end" }}>
          <img style={{ width: "1cm" }} src={close_icon} alt="Close" />
        </a>
      </div>
      <hr />
      <form onSubmit={register}>
        <div className="inputs">
          {/* Username Input */}
          <div className="input">
            <img src={user_icon} className="img_icon" alt='Username' />
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              className="input_field" 
              onChange={(e) => setUserName(e.target.value)} 
              required 
            />
          </div>

          {/* First Name Input */}
          <div className="input">
            <img src={user_icon} className="img_icon" alt='First Name' />
            <input 
              type="text" 
              name="first_name" 
              placeholder="First Name" 
              className="input_field" 
              onChange={(e) => setFirstName(e.target.value)} 
              required 
            />
          </div>

          {/* Last Name Input */}
          <div className="input">
            <img src={user_icon} className="img_icon" alt='Last Name' />
            <input 
              type="text" 
              name="last_name" 
              placeholder="Last Name" 
              className="input_field" 
              onChange={(e) => setLastName(e.target.value)} 
              required 
            />
          </div>

          {/* Email Input */}
          <div className="input">
            <img src={email_icon} className="img_icon" alt='Email' />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              className="input_field" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          {/* Password Input */}
          <div className="input">
            <img src={password_icon} className="img_icon" alt='Password' />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              className="input_field" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
        </div>

        <div className="submit_container" style={{ marginTop: "20px" }}>
          <input className="submit" type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default Register;
