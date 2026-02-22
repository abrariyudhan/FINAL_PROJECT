"use client";

// Component to display file attachments (PDF, documents, etc.)
export default function FileAttachment({ fileName, fileUrl }) {
  // Extract file extension
  const getFileExtension = (name) => {
    if (!name) return "FILE";
    const parts = name.split(".");
    return parts.length > 1 ? parts.pop().toUpperCase() : "FILE";
  };

  // Get file size (if available - this would typically come from file metadata)
  const getFileSize = () => {
    // Placeholder - in real app, this would be passed as prop or fetched
    return "3.25 pm"; // Matches the image format
  };

  // Determine file icon color based on extension
  const getFileColor = (ext) => {
    const colors = {
      PDF: "bg-red-50 text-red-500 border-red-100",
      DOC: "bg-blue-50 text-blue-500 border-blue-100",
      DOCX: "bg-blue-50 text-blue-500 border-blue-100",
      TXT: "bg-slate-50 text-slate-500 border-slate-100",
      default: "bg-violet-50 text-violet-500 border-violet-100",
    };
    return colors[ext] || colors.default;
  };

  const extension = getFileExtension(fileName);
  const colorClass = getFileColor(extension);

  return (
    <a
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-3 hover:shadow-md transition-all group max-w-[280px]"
    >
      {/* File Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${colorClass} transition-all group-hover:scale-105`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* File Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-900 truncate group-hover:text-sky-500 transition-colors">
          {fileName || "Untitled Document"}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            {extension}
          </span>
          <span className="text-[10px] text-slate-300">•</span>
          <span className="text-[10px] text-slate-400">{getFileSize()}</span>
        </div>
      </div>

      {/* Download Icon */}
      <div className="flex-shrink-0 text-slate-400 group-hover:text-sky-500 transition-colors">
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
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </div>
    </a>
  );
}
