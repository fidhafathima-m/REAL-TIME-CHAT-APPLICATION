import React, { useState } from "react";
import Login from "./pages/Login";
import Chat from "./components/Chat";
import "./App.css"

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (name) => {
    if (name.trim()) {
      setUsername(name);
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return <Chat username={username} />;
}

export default App;