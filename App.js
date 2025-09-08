import React, { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes, useParams } from "react-router-dom";
import StatsPage from "./components/StatsPage";
import UrlList from "./components/UrlList";
import UrlShortenerForm from "./components/UrlShortenerForm";
function RedirectPage({ urls, onClick }) {
  const { code } = useParams();
  const url = urls.find((u) => u.short === code);

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!url) {
      setStatus("notfound");
      return;
    }

    const createdTime = new Date(url.created).getTime();
    const expiryTime = createdTime + url.validity * 60000;

    if (Date.now() > expiryTime) {
      setStatus("expired");
      return;
    }

    // Valid → track click + redirect
    onClick(url.short);
    window.location.href = url.original;
  }, [url, onClick]);

  if (status === "loading") return <h2>Redirecting...</h2>;
  if (status === "notfound") return <h2>404: Shortcode not found</h2>;
  if (status === "expired") return <h2>This link has expired</h2>;
  return null;
}
function App() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("urls")) || [];
      setUrls(saved);
    } catch (e) {
      console.error("Error loading urls from storage", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("urls", JSON.stringify(urls));
  }, [urls]);
  const handleShorten = (url) => {
    setUrls([
      ...urls,
      {
        ...url,
        created: new Date().toISOString(),
        clicks: 0
      }
    ]);
  };
  const handleClick = (shortcode) => {
    setUrls((prev) => {
      const updated = prev.map((u) =>
        u.short === shortcode ? { ...u, clicks: u.clicks + 1 } : u
      );
      localStorage.setItem("urls", JSON.stringify(updated)); 
      return updated;
    });
  };

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/stats">Statistics</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <UrlShortenerForm onShorten={handleShorten} />
              <UrlList urls={urls} />
            </>
          }
        />
        <Route path="/stats" element={<StatsPage urls={urls} />} />
        <Route path="/:code" element={<RedirectPage urls={urls} onClick={handleClick} />} />
      </Routes>
    </Router>
  );
}

export default App;