import React, { useEffect, useState } from 'react'
import '../../styles/createFood.css'
import API from "../../utils/api";


import {useNavigate} from 'react-router-dom'

const CreateFood = () => {
  const [videoName, setVideoName] = useState('No video')
  const [previewUrl, setPreviewUrl] = useState(null)

  const navigate=useNavigate();

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleVideoChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      setVideoName(file.name)
      const url = URL.createObjectURL(file)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl(url)
    } else {
      setVideoName('No video')
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
    }
  }


  const onSubmit = async (e) => {
    e.preventDefault()
    const formData=new FormData();
    

    formData.append("name", e.target.name.value);
    formData.append("description", e.target.description.value);
    formData.append("price", e.target.price.value);
   formData.append("video", e.target.video.files[0]);

   const response=await API.post("/api/food", formData, {
    withCredentials: true,
   })
   console.log(response.data);
   navigate("/");
  }

  return (
    <div className="create-food-page">
      <div className="create-card">
        <h2>Create food item</h2>

<form className="create-form" aria-label="Create food form" onSubmit={onSubmit}>
  <label className="field-label" htmlFor="price">Price (₹)</label>
<input id="price" name="price" className="text-input" type="number" placeholder="Enter price" />

  <div>
    <label className="field-label" htmlFor="name">Name</label>
    <input id="name" name="name" className="text-input" type="text" placeholder="Dish name" />

    <label className="field-label" htmlFor="description">Description</label>
    <textarea id="description" name="description" className="text-area" placeholder="Short description of the dish"></textarea>

    <p className="note">Description will be shown to users; keep it concise.</p>
  </div>

  <div className="video-input-wrap">
    <div className="field-label">Video</div>
    <div className="video-picker">
      <label className="video-drop" htmlFor="video-input">
        <svg className="video-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M4 6h11v12H4z" />
          <path d="M17 8l5-3v14l-5-3v-8z" />
        </svg>
        <span className="video-text">Choose video or drop here</span>
      </label>

      <div className="video-preview" aria-hidden>
        {previewUrl ? (
          <video src={previewUrl} muted playsInline autoPlay loop />
        ) : (
          <span>{videoName}</span>
        )}
      </div>
    </div>

    <input
      id="video-input"
      name="video"
      type="file"
      accept="video/*"
      className="visually-hidden"
      onChange={handleVideoChange}
    />

    <button type="submit" className="btn-primary">Create</button>
  </div>
</form>

      </div>
    </div>
  )
}

export default CreateFood