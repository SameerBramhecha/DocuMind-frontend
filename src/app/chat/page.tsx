"use client";
import { useState } from "react";
import ChatBubble from "@/components/shared/ChatBubble";
import MessageInput from "@/components/shared/MessageInput";

interface Message {
  sender: "user" | "ai";
  message: string;
  sources?: Array<{
    filename: string;
    chunk_index: number;
    score: number;
    text_preview: string;
  }>;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (msg: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { sender: "user", message: msg }]);

    try {
      const response = await fetch("http://localhost:8004/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: msg, top_k: 5 }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev, 
        { 
          sender: "ai", 
          message: data.answer,
          sources: data.sources
        }
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev, 
        { 
          sender: "ai", 
          message: "Sorry, I encountered an error while processing your question. Please try again." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-xl font-bold mb-4">DocuMind AI Chat</h1>
      <div className="flex-1 overflow-y-auto flex flex-col space-y-4">
        {messages.map((msg, i) => (
          <ChatBubble 
            key={i} 
            sender={msg.sender} 
            message={msg.message}
            sources={msg.sources}
          />
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span>AI is thinking...</span>
          </div>
        )}
      </div>
      <MessageInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}
