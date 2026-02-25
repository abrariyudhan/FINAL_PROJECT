"use client";

import { formatDistanceToNow } from "date-fns";

// Component to display a single conversation in the message list
export default function ConversationItem({ conversation, isActive, onClick }) {
  // Extract conversation data dari backend
  const {
    userName,
    userAvatar,
    lastMessage, // Object dengan {content, timestamp} dari backend
    status,
    unreadCount,
    type, // 'direct' atau 'group'
  } = conversation;

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

  // Get message content dari lastMessage object
  const messageContent = lastMessage?.content || "";
  const messageTime = lastMessage?.timestamp;

  return (
    <div
      onClick={onClick}
      suppressHydrationWarning
      className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${
        isActive
          ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-sm"
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

        {/* Online Status Indicator (hide untuk group chats) */}
        {status === "online" && type !== "group" && (
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white"></div>
        )}

        {/* Group indicator badge */}
        {type === "group" && (
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
            <svg
              className="w-2 h-2 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </div>
        )}
      </div>

      {/* Message Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h3 className="font-bold text-slate-900 text-sm truncate">
            {userName || "Unknown User"}
          </h3>
          <span
            suppressHydrationWarning
            className="text-[10px] text-slate-400 flex-shrink-0"
          >
            {formatTime(messageTime)}
          </span>
        </div>

        <p className="text-xs text-slate-500 truncate">
          {truncateMessage(messageContent)}
        </p>
      </div>

      {/* Unread Badge */}
      {unreadCount > 0 && (
        <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
          {unreadCount > 9 ? "9+" : unreadCount}
        </div>
      )}
    </div>
  );
}
