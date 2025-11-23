import React, { useEffect, useState } from "react";
import "../../styles/reels.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [likedIds, setLikedIds] = useState(new Set());
  const [savedIds, setSavedIds] = useState(new Set());
  const [reels, setReels] = useState([]);

  // Fetch reels from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((res) => setReels(res.data.foodItems))
      .catch((err) => console.error("Error fetching food items:", err));
  }, []);

  // Toggle Like locally (UI effect only)
  const toggleLikeLocal = (item) => {
    const id = item._id;
    const updated = new Set(likedIds);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setLikedIds(updated);
  };

  // LIKE API Request
  async function likeVideo(item) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId: item._id },
        { withCredentials: true }
      );

      setReels((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, likeCount: res.data.likeCount } : v
        )
      );
    } catch (err) {
      console.error("Error liking video:", err);
    }
  }

async function bookmarkVideo(item) {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/food/save",
      { foodId: item._id },
      { withCredentials: true }
    );

    setReels(prev =>
      prev.map(v =>
        v._id === item._id
          ? { ...v, saveCount: res.data.saveCount ?? 0 }
          : v
      )
    );

    const updated = new Set(savedIds);
    res.data.saved ? updated.add(item._id) : updated.delete(item._id);
    setSavedIds(updated);

  } catch (err) {
    console.error("Error bookmarking:", err);
  }
}


  // Auto play video when visible
  useEffect(() => {
    const videos = document.querySelectorAll(".video");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.isIntersecting ? entry.target.play() : entry.target.pause();
        });
      },
      { threshold: 0.75 }
    );

    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [reels]);

  return (
    <div className="reels-container">
      {reels.map((item) => (
        <section className="reel" key={item._id}>

          <video
            className="video"
            src={item.video}
            muted
            playsInline
            preload="metadata"
          />

          <div className="actions">

            {/* LIKE BUTTON */}
            <div
              className="action-btn"
              role="button"
              tabIndex={0}
              aria-pressed={likedIds.has(item._id)}
              onClick={() => {
                toggleLikeLocal(item);
                likeVideo(item);
              }}
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 21s-7-4.35-9.33-6.58C-0.28 11.85 2 7.5 6 7.5c2.48 0 3.78 1.59 6 4.2 2.22-2.61 3.52-4.2 6-4.2 4 0 6.28 4.35 3.33 6.92C19 16.65 12 21 12 21z" />
              </svg>
              <div className="action-count">{item.likeCount ?? 0}</div>
            </div>

            {/* SAVE BUTTON */}
            <button
              type="button"
              onClick={() => bookmarkVideo(item)}
              className="action-btn"
              aria-pressed={savedIds.has(item._id)}
            >
              <svg viewBox="0 0 24 24">
                <path d="M6 2h9l5 5v15l-7-4-7 4V2z" />
              </svg>
              <div className="action-count">{item.saveCount ?? 0}</div>
            </button>

          </div>

          <div className="overlay">
            <div className="description">{item.description}</div>
            <Link className="visit-btn" to={`/foodpartner/${item.foodPartner}`}>
              Visit store
            </Link>
          </div>
        </section>
      ))}

      <nav className="bottom-nav">
        <Link className="nav-item" to="/">Home</Link>
        <Link className="nav-item" to="/saved">Saved</Link>
      </nav>
    </div>
  );
};

export default Home;
