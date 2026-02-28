import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [name, setName] = useState("");
  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome to chat</h2>
        <input
          type="text"
          placeholder="Enter your name.."
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button onClick={() => onLogin(name)}>Join Chat</button>
      </div>
    </div>
  );
};

export default Login;
