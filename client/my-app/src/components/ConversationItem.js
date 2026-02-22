"use client";

import { formatDistanceToNow } from "date-fns";

// Component to display a single conversation in the message list
export default function ConversationItem({ conversation, isActive, onClick }) {
  // Extract conversation data
  const { userName, userAvatar, lastMessage, timestamp, status, unreadCount } =
    conversation;

  // Format timestamp to relative time (e.g., "5 mins ago")
  const formatTime = (date) => {
    if (!date) return "";
    const messageDate = new Date(date);
    const now = new Date();
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);

    // If less than 24 hours, show time
    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }
    // Otherwise show relative date
    return formatDistanceToNow(messageDate, { addSuffix: false });
  };

  // Truncate long messages
  const truncateMessage = (text, maxLength = 40) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${
        isActive
          ? "bg-sky-50 border border-sky-100"
          : "hover:bg-slate-50 border border-transparent"
      }`}
    >
      {/* User Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={userName}
              className="w-full h-full object-cover"
            />
          ) : (
            // Fallback: use first letter of name
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sky-400 to-blue-500 text-white font-black text-lg">
              {userName?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Online Status Indicator */}
        {status === "online" && (
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white"></div>
        )}
      </div>

      {/* Message Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h3 className="font-bold text-slate-900 text-sm truncate">
            {userName || "Unknown User"}
          </h3>
          <span className="text-[10px] text-slate-400 flex-shrink-0">
            {formatTime(timestamp)}
          </span>
        </div>

        <p className="text-xs text-slate-500 truncate">
          {truncateMessage(lastMessage)}
        </p>
      </div>

      {/* Unread Badge */}
      {unreadCount > 0 && (
        <div className="flex-shrink-0 w-5 h-5 bg-sky-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
          {unreadCount > 9 ? "9+" : unreadCount}
        </div>
      )}
    </div>
  );
}
