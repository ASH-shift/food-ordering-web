import React, { useState, useEffect } from "react";
import API from "../utils/api";

import { useNavigate } from "react-router-dom";
import "../../styles/createFood.css";

const CreateFood = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", e.target.name.value);
    formData.append("description", e.target.description.value);
    formData.append("price", e.target.price.value);
    formData.append("video", e.target.video.files[0]);

    const response = await API.post("/api/food", formData, {
      withCredentials: true,
    });

    navigate(`/foodpartner/${response.data.foodItem.foodPartner}`);
  };

  return (
    <div className="create-food-page">
      <div className="create-card">
        <h2>Add New Meal</h2>

        <form className="create-form" onSubmit={onSubmit}>
          <label>Meal Name</label>
          <input name="name" type="text" placeholder="e.g. Chowmein" required />

          <label>Description</label>
          <textarea name="description" placeholder="Short description..." required />

          <label>Price (₹)</label>
          <input name="price" type="number" placeholder="250" required />

          <label>Upload Video / Image</label>
          <input name="video" type="file" accept="video/*, image/*" onChange={handleVideoChange} required />

          {previewUrl && (
            <video src={previewUrl} muted autoPlay loop style={{ width: "100%", marginTop: 10 }} />
          )}

          <button type="submit" className="btn-primary">Upload Meal</button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
