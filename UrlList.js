import React from "react";
import { Link } from "react-router-dom";

function UrlList({ urls }) {
  const handleCopy = (short) => {
    const fullUrl = `${window.location.origin}/${short}`;
    navigator.clipboard.writeText(fullUrl);
    alert("✅ Short link copied: " + fullUrl);
  };

  return (
    <div className="url-list">
      <h2>🔗 Shortened URLs</h2>
      <ul>
        {urls.map((u, i) => (
          <li key={i}>
            <span>
              {/* clickable short link */}
              <Link to={`/${u.short}`} style={{ color: "#2563eb", fontWeight: "bold" }}>
                {window.location.origin}/{u.short}
              </Link>
              {" "}→ {u.original}
            </span>
            <button
              className="copy-btn"
              onClick={() => handleCopy(u.short)}
            >
              📋 Copy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UrlList;