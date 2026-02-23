"use client";

import { useState } from "react";
import ConversationItem from "./ConversationItem";

// Component for the middle section showing conversation list with search and filters
export default function MessageList({
  conversations,
  groupMembers = [],
  activeConversationId,
  onSelectConversation,
  onStartConversation,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("ALL"); // ALL, PEOPLE, GROUPS

  // Filter conversations based on search query and active tab
  const filteredConversations = conversations.filter((conv) => {
    // Search filter - cari di nama atau last message
    const matchesSearch =
      conv.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage?.content
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    // Tab filter - filter berdasarkan conversation type
    let matchesTab = true;
    if (activeTab === "PEOPLE") {
      // Show direct/1-on-1 conversations
      matchesTab = conv.type === "direct" || !conv.type;
    } else if (activeTab === "GROUPS") {
      // Show group conversations
      matchesTab = conv.type === "group";
    }
    // ALL tab shows semua conversations

    return matchesSearch && matchesTab;
  });

  // Filter group members based on search query
  const filteredGroupMembers = groupMembers.filter((member) => {
    const matchesSearch =
      member.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const tabs = ["ALL", "PEOPLE", "GROUPS"];

  return (
    <div className="w-[380px] bg-white border-r border-slate-100 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-2xl font-black text-slate-900 mb-1">Messages</h2>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          {filteredConversations.length} Conversations
        </p>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
          />
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Tabs: ALL / PEOPLE / GROUPS */}
      <div className="px-6 py-2 flex gap-6 border-b border-slate-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[11px] font-black uppercase tracking-wider pb-3 transition-all relative ${
              activeTab === tab
                ? "text-slate-900"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab}
            {/* Active Tab Indicator */}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {activeTab === "PEOPLE" && groupMembers.length > 0 ? (
          // Show group members list in PEOPLE tab
          <div className="space-y-1">
            {/* Group Members Section */}
            <div className="px-3 py-2">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                Group Members ({filteredGroupMembers.length})
              </p>
            </div>
            {filteredGroupMembers.length > 0 ? (
              filteredGroupMembers.map((member) => (
                <button
                  key={member._id}
                  onClick={() => onStartConversation(member._id)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all group text-left"
                >
                  {/* Member Avatar */}
                  <div className="w-11 h-11 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-white font-bold text-sm">
                      {member.fullname?.charAt(0).toUpperCase() || "?"}
                    </span>
                  </div>

                  {/* Member Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 text-sm truncate group-hover:text-sky-600 transition-colors">
                      {member.fullname}
                    </h4>
                    <p className="text-xs text-slate-500 truncate">
                      @{member.username}
                    </p>
                  </div>

                  {/* Message Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-slate-300 group-hover:text-sky-500 transition-colors"
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
                </button>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center px-8">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-slate-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <p className="text-xs font-bold text-slate-400">
                  {searchQuery ? "No members found" : "No group members yet"}
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  {searchQuery
                    ? "Try a different search"
                    : "Join a group to see members"}
                </p>
              </div>
            )}

            {/* Existing Conversations Section - show below group members in PEOPLE tab */}
            {filteredConversations.length > 0 && (
              <>
                <div className="px-3 py-2 mt-4">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                    Recent Conversations ({filteredConversations.length})
                  </p>
                </div>
                {filteredConversations.map((conversation) => (
                  <ConversationItem
                    key={conversation._id}
                    conversation={conversation}
                    isActive={conversation._id === activeConversationId}
                    onClick={() => onSelectConversation(conversation._id)}
                  />
                ))}
              </>
            )}
          </div>
        ) : filteredConversations.length > 0 ? (
          <div className="space-y-1">
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation._id}
                conversation={conversation}
                isActive={conversation._id === activeConversationId}
                onClick={() => onSelectConversation(conversation._id)}
              />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-slate-300"
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
            <p className="text-sm font-bold text-slate-400">
              No conversations found
            </p>
            <p className="text-xs text-slate-300 mt-2">
              {searchQuery
                ? "Try a different search"
                : "Start a new conversation"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
