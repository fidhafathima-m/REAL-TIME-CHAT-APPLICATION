import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import {Messages} from "./pages/Messages";
import "./App.css";
import Login from "./pages/Login";

const socket = io("http://localhost:5000");

function App() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [username, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => socket.off("message");
  }, []);

  const handleLogin = (name) => {
    if (name.trim()) {
      setUserName(name);
      setIsLoggedIn(true);
    }
  };

  const sendMessage = () => {
    if (messageText.trim()) {
      socket.emit("sendMessage", { text: messageText, username: username });
      setMessageText("");
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="chat-container">
      <header>
        Logged in as: <strong>{username}</strong>
      </header>
      <div className="messages-window">
        {messages.map((msg, i) => (
          <Messages
            key={i}
            username={msg.username}
            text={msg.text}
            isOwnMessage={msg.username === username} // Check if I sent this
          />
        ))}
      </div>
      <div className="input-area">
        <input
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
