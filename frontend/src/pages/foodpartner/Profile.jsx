import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/profile.css';
import axios from 'axios';


const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);   // ✅ FIXED — inside component
  const [videos, setVideos] = useState([])
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/foodpartner/${id}`, { withCredentials: true })
      .then(response => {
        // console.log(response.data.foodPartner);  
        setProfile(response.data.foodPartner);    
        setVideos(response.data.foodItems || []);
      })
      .catch(error => {
        console.error('Error fetching food partner profile:', error);
      });
  }, [id]);

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-top">
          <div className="avatar">

            <img src="https://images.unsplash.com/photo-1521714161819-15534968fc5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGFuaW1lfGVufDB8fDB8fHww"  />
          </div>
          <div className="profile-meta">
            <div className="name-pill">{profile?.name || "Loading..."}</div>

            <div className="stats">
              <div className="stat">
                <div className="label">Total Meals</div>
                <div className="value">{profile?.totalMeals || 43}</div>
              </div>
              <div className="stat">
                <div className="label">Customers Served</div>
                <div className="value">15K</div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider" />
<div className="media-grid">
  {videos.map(v => (
    <div className="media-tile" key={v._id}>
      {v.video.match(/\.(jpg|jpeg|png|webp)$/i) ? (
        <img src={v.video} alt={v.name} />
      ) : (
        <video src={v.video} muted />
      )}
    </div>
  ))}
</div>




      </div>
    </div>
  );
};

export default Profile;
