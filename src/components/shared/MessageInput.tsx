"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function MessageInput({ onSend }: { onSend: (msg: string) => void }) {
  const [message, setMessage] = useState("");

  return (
    <div className="flex gap-2 p-4 border-t">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask your document..."
      />
      <Button onClick={() => {
        onSend(message);
        setMessage("");
      }}>
        Send
      </Button>
    </div>
  );
}
