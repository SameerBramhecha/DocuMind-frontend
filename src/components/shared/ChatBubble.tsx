import React from "react";

type Props = {
    message: string;
    sender: "user" | "ai";
};

export default function ChatBubble({ message, sender }: Props) {
    return (
        <div
            className={`max-w-md p-3 my-2 rounded-xl text-sm ${sender === "user"
                    ? "bg-blue-600 text-white self-end ml-auto"
                    : "bg-gray-200 text-black self-start mr-auto"
                }`}
        >
            {message}
        </div>
    )
}