import React from "react";
import { useRouter } from "next/navigation";
import { createChatRoom } from "@/components/_service/admin/admin.service";

interface ChatListProps {
  lawyers: Array<{ id: string; name: string }>;
  currentUser: string;
}

const ChatList: React.FC<ChatListProps> = ({ lawyers, currentUser }) => {
  const router = useRouter();

  const handleChatStart = async (receiver: string) => {
    const { roomId } = await createChatRoom(currentUser, receiver);
    router.push(
      `../chat?roomId=${roomId}&currentUser=${currentUser}&receiver=${receiver}`
    );
  };

  return (
    <div>
      <ul>
        {lawyers.map((lawyer) => (
          <li key={lawyer.id}>
            {lawyer.name}{" "}
            <button
              className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              onClick={() => handleChatStart(lawyer.id)}
            >
              Chat
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
