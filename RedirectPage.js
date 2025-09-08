import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RedirectPage({ urls }) {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const found = urls.find((u) => u.short === shortcode);

    if (found) {
      // Check expiry
      const created = new Date(found.created);
      const expiresAt = created.getTime() + found.validity * 60000; // validity in ms
      if (Date.now() > expiresAt) {
        alert(" This link has expired.");
        navigate("/stats");
      } else {
        // Count click
        found.clicks = (found.clicks || 0) + 1;

        // Redirect
        window.location.href = found.original;
      }
    } else {
      alert("⚠️ Short link not found!");
      navigate("/");
    }
  }, [shortcode, urls, navigate]);

  return <p>Redirecting...</p>;
}

export default RedirectPage;