import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
  const [reels, setReels] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/food', { withCredentials: true })
      .then(response => {
        setReels(response.data.foodItems)
      })
      .catch(error => {
        console.error('Error fetching food items:', error)
      })
  }, [])

  return (
    <div className="reels-container" aria-label="Video reels">
      {reels.map(item => (
        <section className="reel" key={item._id}>
          <video
            src={item.video}
            muted
            playsInline
            loop
            autoPlay
            preload="metadata"
            aria-hidden="true"
          />

          <div className="overlay">
            <div className="description" title={item.description}>
              {item.description}
            </div>
            <Link className="visit-btn" to={"/foodpartner/" + item.foodPartner}>
              Visit store
            </Link>
          </div>
        </section>
      ))}
    </div>
  )
}

export default Home
