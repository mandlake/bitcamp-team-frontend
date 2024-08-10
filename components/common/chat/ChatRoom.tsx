"use client";

import { useEffect, useState, useRef } from "react";
import ChatMessage from "./ChatMessage";
import {
  getChatHistory,
  getMessages,
  sendMessage,
} from "@/components/_service/admin/admin.service";

interface ChatRoomProps {
  roomId: string;
  currentUser: string;
  receiver: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({
  roomId,
  currentUser,
  receiver,
}) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getChatHistory(roomId);
        setMessages(history);
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      }
    };

    fetchHistory();

    const eventSource = getMessages(roomId);
    eventSource.onopen = () => {
      console.log("EventSource connected");
    };
    eventSource.onmessage = (event: any) => {
      const newChatMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newChatMessage]);
    };
    eventSource.onerror = (error: any) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [roomId]);

  const handleSendMessage = async () => {
    try {
      await sendMessage({
        roomId,
        sender: currentUser,
        message: newMessage,
        receiver,
      });
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      <div style={{ height: "400px", overflowY: "scroll" }}>
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            currentUser={currentUser}
          />
        ))}
        <div ref={messageEndRef} />
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
