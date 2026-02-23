/**
 * Chat Utility Functions
 * Helper functions untuk format dan process chat data
 */

/**
 * Map conversation data dari backend untuk display di UI
 * Extracts participant info dan formats untuk ConversationItem
 */
export function mapConversationForDisplay(conversation, currentUserId) {
  // Untuk group chat, gunakan group name
  if (conversation.type === "group") {
    return {
      ...conversation,
      userName: conversation.groupName || "Group Chat",
      userAvatar: conversation.groupAvatar || null,
      status: null, // Groups don't have online status
    };
  }

  // Untuk direct chat, ambil info user lain (bukan current user)
  const otherParticipant = conversation.participants?.find(
    (p) => p !== currentUserId,
  );

  return {
    ...conversation,
    userName: conversation.participantName || "User",
    userAvatar: conversation.participantAvatar || null,
    status: conversation.participantStatus || "offline",
  };
}

/**
 * Format timestamp untuk display
 */
export function formatMessageTime(timestamp) {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  const now = new Date();
  const diffInMs = now - date;
  const diffInHours = diffInMs / (1000 * 60 * 60);

  // Less than 1 hour: "X mins ago"
  if (diffInHours < 1) {
    const mins = Math.floor(diffInMs / (1000 * 60));
    return mins <= 1 ? "Just now" : `${mins}m ago`;
  }

  // Less than 24 hours: "Xh ago"
  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`;
  }

  // Less than 7 days: "X days ago"
  if (diffInHours < 24 * 7) {
    return `${Math.floor(diffInHours / 24)}d ago`;
  }

  // Older: show date
  return date.toLocaleDateString();
}

/**
 * Get initials dari nama untuk avatar fallback
 */
export function getInitials(name) {
  if (!name) return "?";

  const words = name.trim().split(" ");
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.charAt(0).toUpperCase();
}

/**
 * Truncate text dengan ellipsis
 */
export function truncateText(text, maxLength = 50) {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}
