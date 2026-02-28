export const Messages = ({ username, text, isOwnMessage }) => {
  return (
    <div className={`message-wrapper ${isOwnMessage ? "own" : "other"}`}>
      <div className="message-box">
        <span className="message-username">{isOwnMessage ? "You" : username}</span>
        <p className="message-text" style={{ margin: 0 }}>{text}</p>
      </div>
    </div>
  );
};