import React, { useState } from 'react'
import '../../styles/createFood.css'

const CreateFood = () => {
  const [videoName, setVideoName] = useState('No video')

  return (
    <div className="create-food-page">
      <div className="create-card">
        <h2>Create food item</h2>

        <form className="create-form" aria-label="Create food form">
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
              <label className="video-drop" htmlFor="video-input">Choose video or drop here</label>
              <div className="video-preview" aria-hidden>
                {videoName}
              </div>
            </div>
            <input
              id="video-input"
              name="video"
              type="file"
              accept="video/*"
              style={{ display: 'block', marginTop: 6 }}
              onChange={(e) => {
                const file = e.target.files && e.target.files[0]
                setVideoName(file ? file.name : 'No video')
              }}
            />

            <button type="button" className="btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateFood