"use client";

import { useState, useRef } from "react";

// Component for message input area at the bottom of chat
export default function MessageInput({ onSendMessage, onUploadFile }) {
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Handle sending text message
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage({
        content: message,
        type: "text",
      });
      setMessage(""); // Clear input after sending
    }
  };

  // Handle Enter key press to send message
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle file upload
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("file", file);

      console.log("📤 Uploading file to Cloudinary...");

      // Call upload handler passed from parent (server action)
      const result = await onUploadFile(formData);

      if (result.success) {
        console.log("✅ File uploaded successfully:", result.fileUrl);

        // Determine file type
        const fileType = file.type.startsWith("image/") ? "image" : "file";

        // Send message with file attachment
        onSendMessage({
          content:
            message || `Shared ${fileType === "image" ? "an image" : "a file"}`,
          type: fileType,
          fileUrl: result.fileUrl,
          fileName: result.fileName,
        });
        setMessage("");
      } else {
        console.error("❌ Upload failed:", result.error);
        alert(`Failed to upload file: ${result.error}`);
      }
    } catch (error) {
      console.error("❌ File upload error:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="border-t border-blue-100 p-4 bg-white">
      <div className="flex items-end gap-3">
        {/* Upload File Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-600 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 border border-blue-100"
          title="Upload files"
        >
          {isUploading ? (
            // Loading spinner
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          )}
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt"
        />

        {/* Text Input */}
        <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Hope this works. Thanks :)"
            rows={1}
            className="w-full px-4 py-3 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 resize-none focus:outline-none"
            style={{ maxHeight: "120px" }}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!message.trim() || isUploading}
          className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200 active:scale-95 flex-shrink-0"
          title="Send message"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
