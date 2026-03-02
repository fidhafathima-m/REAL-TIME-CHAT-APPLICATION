import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { Messages } from "../pages/Messages";

const socket = io("http://localhost:5000");

function Chat({ username }) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [typingStatus, setTypingStatus] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
      setTypingStatus("");
    });

    socket.on("displayTyping", (data) => {
      if (data.typing) {
        setTypingStatus(`${data.username} is typing...`);
      } else {
        setTypingStatus("");
      }
    });

    return () => {
      socket.off("message");
      socket.off("displayTyping");
    };
  }, []);

  const handleTyping = (e) => {
    setMessageText(e.target.value);
    socket.emit("typing", { username, typing: true });

    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      socket.emit("typing", { username, typing: false });
    }, 2000);
  };

  const sendMessage = () => {
    if (messageText.trim()) {
      socket.emit("sendMessage", {
        text: messageText,
        username: username,
      });
      setMessageText("");
      inputRef.current.focus();
    }
  };

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
            isOwnMessage={msg.username === username}
          />
        ))}
        {typingStatus && (
          <div className="typing-indicator">{typingStatus}</div>
        )}
      </div>

      <div className="input-area">
        <input
          value={messageText}
          onChange={handleTyping}
          placeholder="Write Something..."
          ref={inputRef}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;