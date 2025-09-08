import React, { useState } from "react";
import log from "./Logger";

function UrlShortenerForm({ onShorten }) {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState(30);
  const [shortcode, setShortcode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!url.startsWith("http")) {
      alert("Invalid URL! Must start with http/https");
      return;
    }

    const short = shortcode || Math.random().toString(36).substring(2, 8);

    const newUrl = {
      original: url,
      short,
      validity,
      created: new Date().toISOString(),
      clickvalidity: validity,
      clicks: 0
    };

    log("Shortened URL created", newUrl);

    onShorten(newUrl);
    setUrl("");
    setShortcode("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Validity (minutes)"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Custom Shortcode (optional)"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
      />
      <button type="submit">Shorten</button>
    </form>
  );
}

export default UrlShortenerForm;