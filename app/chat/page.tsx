"use client";

import React from "react";
import { useRouter } from "next/router";
import ChatRoom from "@/components/common/chat/ChatRoom";

const ChatPage: React.FC = () => {
  const router = useRouter();
  const { roomId, currentUser, receiver } = router.query;

  if (!roomId || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <ChatRoom
      roomId={roomId as string}
      currentUser={currentUser as string}
      receiver={receiver as string}
    />
  );
};

export default ChatPage;
