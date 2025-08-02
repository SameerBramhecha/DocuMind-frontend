import React from "react";

type Props = {
    message: string;
    sender: "user" | "ai";
    sources?: Array<{
        filename: string;
        chunk_index: number;
        score: number;
        text_preview: string;
    }>;
};

export default function ChatBubble({ message, sender, sources }: Props) {
    return (
        <div className={`max-w-md p-3 my-2 rounded-xl text-sm ${sender === "user"
                ? "bg-blue-600 text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start mr-auto"
            }`}
        >
            <div>{message}</div>
            
            {sources && sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-300">
                    <div className="text-xs font-semibold mb-2">Sources:</div>
                    {sources.map((source, index) => (
                        <div key={index} className="text-xs mb-1">
                            <div className="font-medium">{source.filename} (chunk {source.chunk_index})</div>
                            <div className="text-gray-600">{source.text_preview}</div>
                            <div className="text-gray-500">Score: {source.score.toFixed(3)}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}