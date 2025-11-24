import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/profile.css';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [showMealModal, setShowMealModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/foodpartner/${id}`, { withCredentials: true })
      .then(response => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodItems || []);
      })
      .catch(error => {
        console.error('Error fetching food partner profile:', error);
      });
  }, [id]);

  return (
    <>
      <div className="profile-page">
        <div className="banner"></div>

        <div className="profile-header">
          <img className="avatar" src="https://images.unsplash.com/photo-1521714161819-15534968fc5f?w=600" />
          <h1 className="profile-name">{profile?.name}</h1>
          <p className="sub-text">⭐ 4.8 • Fast Food • Open</p>
        </div>

        <div className="stats-container">
          <div className="stat-box"><h2>{videos.length}</h2><p>Meals</p></div>
          <div className="stat-box"><h2>15K</h2><p>Customers</p></div>
          <div className="stat-box"><h2>4.9</h2><p>Rating</p></div>
        </div>

        <h2 className="section-title">Popular Meals</h2>
 <button
  className="add-meal-btn"
  onClick={async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/me", { withCredentials: true });

      if (res.data.role === "partner") {
        navigate("/create-food");   // food partner = upload page
      } else {
        navigate("/meals");         // user = meals page
      }
    } catch (err) {
      navigate("/user/login"); // not logged in
    }
  }}
>
  + Add Meal
</button>











        {/* --- GRID OF MEALS --- */}
        <div className="media-grid">
          {videos.map(v => (
            <div
              className="media-tile"
              key={v._id}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                console.log("Tile clicked", v);
                e.preventDefault();
                e.stopPropagation();
                setSelectedMeal(v);
                setShowMealModal(true);
              }}
            >
             <div
  className="media-tile"
  key={v._id}
  onClick={() => { setSelectedMeal(v); setShowMealModal(true); }}
  style={{ cursor: "pointer" }}
>
  {v.video.match(/\.(jpg|jpeg|png|webp)$/i) ? (
    <img
      src={v.video}
      alt={v.name}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  ) : (
    <video
      src={v.video}
      muted
      autoPlay
      loop
      playsInline
      disablePictureInPicture
      controlsList="nodownload nofullscreen"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  )}
</div>

            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL --- */}
      {showMealModal && selectedMeal && (
        <div className="meal-modal-overlay">
          <div className="meal-modal">
            <button className="close-btn" onClick={() => setShowMealModal(false)}>✕</button>

            <video
              src={selectedMeal.video}
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              className="modal-media"
            />

            <h2 className="meal-title">{selectedMeal.name}</h2>
            <p className="meal-description">{selectedMeal.description}</p>
            <p className="meal-price">₹{selectedMeal.price || 249}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
