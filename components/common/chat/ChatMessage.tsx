interface ChatMessageProps {
  message: {
    sender: string;
    receiver: string;
    message: string;
  };
  currentUser: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, currentUser }) => {
  const isSender = message.sender === currentUser;
  return (
    <div style={{ textAlign: isSender ? "left" : "right" }}>
      <div
        style={{
          display: "inline-block",
          padding: "10px",
          background: isSender ? "#dcf8c6" : "#fff",
        }}
      >
        <p>{message.message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
