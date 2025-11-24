import React, { useEffect, useState } from "react";
import "../../styles/reels.css";
import { Link } from "react-router-dom";
import axios from "axios";



const Saved = () => {
  const [showCommentModal, setShowCommentModal] = useState(false);
const [currentVideo, setCurrentVideo] = useState(null);
const [commentInput, setCommentInput] = useState("");
const [comments, setComments] = useState([]);



  const [savedVideos, setSavedVideos] = useState([]);

  // Fetch saved items from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/save", { withCredentials: true })
      .then((response) => {
        setSavedVideos(response.data.savedFood);
      })
      .catch((err) => console.error("Error loading saved videos:", err));
  }, []);

  const removeSaved = async (id) => {
    try {
      await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId: id },
        { withCredentials: true }
      );

      setSavedVideos((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error("Failed to unsave:", err);
    }
  };
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

const openCommentModal = (v) => {
  setCurrentVideo(v);
  loadComments(v._id);
  setShowCommentModal(true);
};


  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", padding: 16 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ color: "var(--text)" }}>Saved</h2>

        {savedVideos.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>No saved items yet.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
            {savedVideos.map((s) => (
              <div
                key={s._id}
                className="video-tile"
                style={{ aspectRatio: "1/1", position: "relative" }}
              >
                <video
                  src={s.video}
                  muted
                  playsInline
                  loop
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 8,
                    bottom: 8,
                    right: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 8,

                    
                  }}
                  
                >
                  <button
  onClick={() => openCommentModal(s)}
  style={{
    padding: "6px 8px",
    borderRadius: 8,
    border: "none",
    background: "rgba(0,0,0,0.45)",
    color: "#fff",
    fontSize: 12
  }}
>
  💬 Comment
</button>

                  <Link
                    to={`/foodpartner/${s.foodPartner}`}
                    style={{
                      color: "var(--primary)",
                      background: "rgba(255,255,255,0.06)",
                      padding: "6px 8px",
                      borderRadius: 8,
                      textDecoration: "none",
                      fontSize: 12,
                    }}
                  >
                    Visit
                  </Link>

                  <button
                    onClick={() => removeSaved(s._id)}
                    style={{
                      padding: "6px 8px",
                      borderRadius: 8,
                      border: "none",
                      background: "rgba(0,0,0,0.45)",
                      color: "#fff",
                      fontSize: 12,
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <nav className="bottom-nav">
        <Link className="nav-item" to="/">
          <svg viewBox="0 0 24 24">
            <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z" />
          </svg>
          <span>home</span>
        </Link>

        <Link className="nav-item" to="/saved">
          <svg viewBox="0 0 24 24">
            <path d="M6 2h9l5 5v15l-7-4-7 4V2z" />
          </svg>
          <span>saved</span>
        </Link>
      </nav>
      {showCommentModal && (
  <div className="comment-modal">
    <div className="modal-content">

      <textarea
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        placeholder="Write a comment..."
      />

      <div style={{ display: "flex", gap: "10px", marginTop: 10 }}>
        <button onClick={submitComment}>Post</button>
        <button onClick={() => setShowCommentModal(false)}>Close</button>
      </div>

      <div style={{ marginTop: 12, maxHeight: 200, overflowY: "scroll" }}>
        {comments.length === 0 ? (
          <p style={{ opacity: 0.6 }}>No comments yet</p>
        ) : (
          comments.map((c, index) => (
            <div key={index} style={{ padding: "6px 0", borderBottom: "1px solid #333" }}>
              <b>{c.user?.name || "User"}:</b> {c.text}
            </div>
          ))
        )}
      </div>

    </div>
  </div>
)}

    </div>
  );
};

export default Saved;
