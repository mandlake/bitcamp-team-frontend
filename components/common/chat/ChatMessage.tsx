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
    <div className={`${isSender ? "text-right" : "text-left"}`}>
      <div
        className={`inline-block p-1.5 ${
          isSender
            ? "bg-white border border-[var(--color-Harbor-firth)]"
            : "bg-[var(--color-Harbor-firth)]"
        }`}
      >
        <p>{message.message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
