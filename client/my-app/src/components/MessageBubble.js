"use client";

import { format } from "date-fns";
import FileAttachment from "./FileAttachment";

// Component to display a single message bubble
export default function MessageBubble({
  message,
  senderName,
  isOwnMessage,
  onReaction,
}) {
  // Extract message data dari backend Chat model
  const {
    content,
    type, // 'text', 'image', or 'file'
    fileUrl,
    fileName,
    reactions, // Array of {userId, emoji}
    timestamp,
    senderAvatar,
  } = message;

  // Format timestamp to time only
  const formatTime = (date) => {
    if (!date) return "";
    return format(new Date(date), "h:mm a");
  };

  // Count reactions by emoji type
  const reactionCounts = reactions?.reduce((acc, reaction) => {
    acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
    return acc;
  }, {});

  return (
    <div
      className={`flex gap-3 mb-4 ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Sender Avatar (only show for received messages) */}
      {!isOwnMessage && (
        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
          {senderAvatar ? (
            <img
              src={senderAvatar}
              alt="Sender"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-500 text-white font-black">
              J
            </div>
          )}
        </div>
      )}

      {/* Message Content */}
      <div
        className={`flex flex-col gap-1 max-w-[60%] ${isOwnMessage ? "items-end" : "items-start"}`}
      >
        {/* Sender Name (only show for received messages) */}
        {!isOwnMessage && senderName && (
          <span className="text-xs font-bold text-slate-600 px-2">
            {senderName}
          </span>
        )}

        {/* Message Bubble */}
        <div
          className={`relative group ${
            isOwnMessage
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-[1.25rem] rounded-tr-md shadow-md shadow-blue-200"
              : "bg-white text-slate-900 rounded-[1.25rem] rounded-tl-md border border-blue-100"
          } px-4 py-3 shadow-sm`}
        >
          {/* Text Message */}
          {type === "text" && (
            <p className="text-sm leading-relaxed break-words">{content}</p>
          )}

          {/* Image Message */}
          {type === "image" && fileUrl && (
            <div className="space-y-2">
              {content && <p className="text-sm">{content}</p>}
              <img
                src={fileUrl}
                alt="Shared image"
                className="rounded-xl max-w-full h-auto"
              />
            </div>
          )}

          {/* File Message */}
          {type === "file" && fileUrl && (
            <div className="space-y-2">
              {content && <p className="text-sm mb-2">{content}</p>}
              <FileAttachment fileName={fileName} fileUrl={fileUrl} />
            </div>
          )}

          {/* Reaction Quick Actions (show on hover) */}
          <div
            className={`absolute ${isOwnMessage ? "left-0" : "right-0"} top-0 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-white rounded-full shadow-lg p-1`}
          >
            <button
              onClick={() => onReaction(message._id, "❤️")}
              className="w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center transition-all text-sm"
              title="React with heart"
            >
              ❤️
            </button>
            <button
              onClick={() => onReaction(message._id, "👍")}
              className="w-7 h-7 rounded-full hover:bg-blue-50 flex items-center justify-center transition-all text-sm"
              title="React with thumbs up"
            >
              👍
            </button>
          </div>
        </div>

        {/* Reactions Display */}
        {reactions && reactions.length > 0 && (
          <div className="flex gap-1 px-2">
            {Object.entries(reactionCounts).map(([emoji, count]) => (
              <div
                key={emoji}
                className="bg-white border border-blue-200 rounded-full px-2 py-0.5 flex items-center gap-1 shadow-sm"
              >
                <span className="text-xs">{emoji}</span>
                <span className="text-[10px] font-bold text-slate-600">
                  {count}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-slate-400 px-2">
          {formatTime(timestamp)}
        </span>
      </div>
    </div>
  );
}
