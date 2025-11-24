import React, { useEffect, useState } from "react";
import "../../styles/reels.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [likedIds, setLikedIds] = useState(new Set());
  const [savedIds, setSavedIds] = useState(new Set());
  const [reels, setReels] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);

  const loadComments = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/food/comment/${id}`,
        { withCredentials: true }
      );
      setComments(res.data.comments);
    } catch (err) {
      console.error("Load comments error:", err);
    }
  };

  const openCommentModal = (item) => {
    setCurrentVideo(item);
    loadComments(item._id);
    setShowCommentModal(true);
  };

  const submitComment = async () => {
    if (!commentInput.trim()) return alert("Please enter something");

    try {
      await axios.post(
        "http://localhost:3000/api/food/comment",
        { foodId: currentVideo._id, text: commentInput },
        { withCredentials: true }
      );

      setCommentInput("");
      loadComments(currentVideo._id);
    } catch (e) {
      console.error("Comment error", e);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((res) => {
        setReels(res.data.foodItems);
        if (res.data.foodItems.length > 0) {
          setCurrentVideo(res.data.foodItems[0]);
        }
      })
      .catch((err) => console.error("Error fetching food items:", err));
  }, []);
  useEffect(() => {
  const videos = document.querySelectorAll(".video");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.play();
        } else {
          entry.target.pause();
        }
      });
    },
    { threshold: 0.75 }
  );

  videos.forEach((video) => observer.observe(video));
  return () => observer.disconnect();
}, [reels]);   // <--- important dependency


  const toggleLikeLocal = (item) => {
    const id = item._id;
    const updated = new Set(likedIds);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setLikedIds(updated);
  };

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

      setReels((prev) =>
        prev.map((v) =>
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

  // Track scroll & update visit store button
  useEffect(() => {
    const reelsSection = document.querySelectorAll(".reel");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentVideo(
              reels.find((r) => r._id === entry.target.getAttribute("data-id"))
            );
          }
        });
      },
      { threshold: 0.7 }
    );

    reelsSection.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [reels]);

  return (
    <>
      <div className="reels-container">
        {reels.map((item) => (
          <section className="reel" key={item._id} data-id={item._id}>
           <video
  className="video"
  src={item.video}
  muted
  playsInline
  autoPlay
  loop
/>


            <div className="actions">
              <div
                className="action-btn"
                onClick={() => {
                  toggleLikeLocal(item);
                  likeVideo(item);
                }}
                aria-pressed={likedIds.has(item._id)}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 21s-7-4.35-9.33-6.58C-0.28 11.85 2 7.5 6 7.5c2.48 0 3.78 1.59 6 4.2 2.22-2.61 3.52-4.2 6-4.2 4 0 6.28 4.35 3.33 6.92C19 16.65 12 21 12 21z" />
                </svg>
                <div className="action-count">{item.likeCount ?? 0}</div>
              </div>

              <button
                className="action-btn"
                onClick={() => bookmarkVideo(item)}
                aria-pressed={savedIds.has(item._id)}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M6 2h9l5 5v15l-7-4-7 4V2z" />
                </svg>
                <div className="action-count">{item.saveCount ?? 0}</div>
              </button>

              <div className="action-btn" onClick={() => openCommentModal(item)}>
                <svg viewBox="0 0 24 24">
                  <path d="M21 6H3C1.9 6 1 6.9 1 8V18C1 19.1 1.9 20 3 20H6V23L11 20H21C22.1 20 23 19.1 23 18V8C23 6.9 22.1 6 21 6Z"/>
                </svg>
                <div className="action-count">{item.commentCount ?? 0}</div>
              </div>
            </div>

            <div className="overlay">
              <div className="description">{item.description}</div>
            </div>
          </section>
        ))}
      </div>

      {/* MODAL OUTSIDE SCROLL AREA */}
      {showCommentModal && (
        <div className="comment-modal">
          <div className="modal-content">
            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Write a comment..."
            />

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={submitComment}>Post</button>
              <button onClick={() => setShowCommentModal(false)}>Close</button>
            </div>

            <div className="comment-list">
              {comments.length === 0 ? (
                <p>No comments yet</p>
              ) : (
                comments.map((c) => (
                  <div key={c._id} style={{ padding: "6px 0", borderBottom: "1px solid #444" }}>
                    <b>{c.user?.name || "User"}:</b> {c.text}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <nav className="bottom-nav">
        <Link className="nav-item" to="/">Home</Link>
        {currentVideo && (
          <Link
            className="nav-item visit-nav-btn"
            to={`/foodpartner/${currentVideo.foodPartner._id}`}
          >
            Visit Store
          </Link>
        )}
        <Link className="nav-item" to="/saved">Saved</Link>
      </nav>
      <Link className="nav-item" to="/meals">Meals</Link>

    </>
  );
};

export default Home;
