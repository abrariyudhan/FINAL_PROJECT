"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

// Component for the main chat area showing messages and input
export default function ChatArea({
  activeConversation,
  messages,
  currentUserId,
  groups, // All available groups
  onSendMessage,
  onUploadFile,
  onReaction,
  onCreateGroup, // Handler for creating new groups
  onAddGroupMember, // Handler for adding members to a group
  onRemoveGroupMember, // Handler for removing members from a group
  onDeleteGroup, // Handler for deleting a group
}) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // If no conversation is selected
  if (!activeConversation) {
    return (
      <div className="flex-1 bg-white flex items-center justify-center m-4 mr-4 rounded-3xl shadow-xl shadow-blue-100/30">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-black text-slate-900 mb-2">
            No Conversation Selected
          </h3>
          <p className="text-sm text-slate-400">
            Select a conversation from the list to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white flex flex-col m-4 mr-4 rounded-3xl shadow-xl shadow-blue-100/30 overflow-hidden">
      {/* Chat Header */}
      <div className="border-b border-blue-100 p-6 flex items-center justify-between bg-gradient-to-r from-blue-50/30 to-indigo-50/30">
        <div className="flex items-center gap-4">
          {/* User/Group Avatar */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
              {activeConversation.userAvatar ? (
                <img
                  src={activeConversation.userAvatar}
                  alt={activeConversation.userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sky-400 to-blue-500 text-white font-black text-lg">
                  {activeConversation.userName?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {/* Online Status (hide untuk group) */}
            {activeConversation.status === "online" &&
              activeConversation.type !== "group" && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white"></div>
              )}
          </div>

          {/* User/Group Info */}
          <div>
            <h2 className="text-lg font-black text-slate-900">
              {activeConversation.userName || "Unknown User"}
            </h2>
            {activeConversation.type === "group" ? (
              <p className="text-xs text-slate-500 font-bold">
                {activeConversation.participants?.length || 0} members
              </p>
            ) : (
              <p className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                {activeConversation.status === "online" ? "Online" : "Offline"}
              </p>
            )}
          </div>
        </div>

        {/* View Profile Link */}
        <button className="text-blue-600 text-sm font-bold hover:text-blue-700 transition-colors px-4 py-2 rounded-xl hover:bg-blue-50">
          View Profile
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-blue-50/20 via-indigo-50/20 to-purple-50/20">
        {messages && messages.length > 0 ? (
          <div className="max-w-3xl mx-auto">
            {messages.map((message) => {
              // Find sender details from participantDetails
              const sender = activeConversation.participantDetails?.find(
                (p) => p._id === message.senderId,
              );
              const senderName =
                sender?.fullname || sender?.username || "Unknown";

              return (
                <MessageBubble
                  key={message._id}
                  message={message}
                  senderName={senderName}
                  isOwnMessage={message.senderId === currentUserId}
                  onReaction={(messageId, emoji) =>
                    onReaction(activeConversation._id, messageId, {
                      userId: currentUserId,
                      emoji,
                    })
                  }
                />
              );
            })}
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          // Empty conversation state
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <p className="text-sm font-bold text-slate-400">
                No messages yet
              </p>
              <p className="text-xs text-slate-300 mt-2">
                Start the conversation by sending a message
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <MessageInput
        onSendMessage={
          (messageData) => onSendMessage(messageData) // sudah ada senderId dari parent
        }
        onUploadFile={onUploadFile}
      />
    </div>
  );
}
