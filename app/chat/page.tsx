"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ChatRoom from "@/components/common/chat/ChatRoom";

import { useSearchParams } from 'next/navigation';

const ChatPage: React.FC = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');
  const currentUser = searchParams.get('currentUser');
  const receiver = searchParams.get('receiver');

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
