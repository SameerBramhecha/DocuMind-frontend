"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function MessageInput({ 
  onSend, 
  disabled = false 
}: { 
  onSend: (msg: string) => void;
  disabled?: boolean;
}) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2 p-4 border-t">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask your document..."
        disabled={disabled}
      />
      <Button onClick={handleSend} disabled={disabled || !message.trim()}>
        Send
      </Button>
    </div>
  );
}
