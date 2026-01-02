import React, { useState } from "react";
import { searchYouTube } from "../api";

export default function YouTubeFinance() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setMessage("");
    try {
      const res = await searchYouTube({ query });

      if (res.data.videos && res.data.videos.length > 0) {
        setVideos(res.data.videos);
      } else {
        setVideos([]);
        setMessage(res.data.message || "No finance videos found.");
      }
    } catch (err) {
      console.error(err);
      setVideos([]);
      setMessage("Something went wrong while fetching videos.");
    }
    setLoading(false);
  };

  // Function to extract videoId from YouTube URL
  const getVideoId = (url) => {
    const match = url.match(/(?:v=|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center fw-bold text-primary">
        💰 Finance Video Search
      </h2>

      {/* Search Bar */}
      <div className="d-flex gap-2 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search finance videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="btn btn-primary px-4"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {loading && <p className="text-center text-muted">Loading...</p>}
      {message && <p className="text-center text-danger">{message}</p>}

      {/* Video Grid */}
      <div className="row">
        {videos.length > 0 &&
          videos.map((v, i) => {
            const videoId = getVideoId(v.url);
            return (
              <div className="col-md-6 col-lg-4 mb-4" key={i}>
                <div className="card shadow-sm border-0 h-100">
                  {videoId ? (
                    <iframe
                      width="100%"
                      height="200"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={v.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-top"
                    ></iframe>
                  ) : (
                    <img
                      src={v.thumbnail}
                      alt={v.title}
                      className="card-img-top rounded-top"
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-dark">
                      {v.title}
                    </h5>
                    <p className="card-text text-muted">{v.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
