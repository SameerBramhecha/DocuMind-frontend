"use client";
import { useState } from "react";
import ChatBubble from "@/components/shared/ChatBubble";
import MessageInput from "@/components/shared/MessageInput";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; message: string }[]>([]);

  const handleSend = async (msg: string) => {
    setMessages((prev) => [...prev, { sender: "user", message: msg }]);

    // Simulate API call to backend
    const response = await fetch("http://localhost:8004/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: msg }),
    });
    const data = await response.json();

    setMessages((prev) => [...prev, { sender: "ai", message: data.answer }]);
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-xl font-bold mb-4">AI Chat</h1>
      <div className="flex-1 overflow-y-auto flex flex-col">
        {messages.map((msg, i) => (
          <ChatBubble key={i} sender={msg.sender} message={msg.message} />
        ))}
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
}
