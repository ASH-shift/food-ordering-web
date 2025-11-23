import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { saveFood } from '../../../../backend/src/controller/food.controller'
import { comment } from 'postcss'

const Saved = () => {
  const [savedVideos, setSavedVideos] = useState([])

  const loadSaved = () => {
    try {
      const raw = localStorage.getItem('savedVideos') || '[]'
      const parsed = JSON.parse(raw)
      setSavedVideos(parsed)
    } catch (e) {
      setSavedVideos([])
    }
  }
  useEffect(()=>{
    const response=axios.get('http://localhost:3000/api/food/save',{withCredentials:true})
    .then(response=>{
    const savedFood=response.data.savedFood.map((item)=>({
      _id:item._id,
      video:item.video,
      description:item.description,
      likeCount:item.likeCount,
      saveCount:item.saveCount,
      commentsCount:item.commentsCount,
  }))
  setSavedVideos(savedFood)
  })
  },[])


  useEffect(() => {
    loadSaved()
    const handler = () => loadSaved()
    window.addEventListener('savedUpdated', handler)
    return () => window.removeEventListener('savedUpdated', handler)
  }, [])

  const removeSaved = (id) => {
    try {
      const raw = localStorage.getItem('savedVideos') || '[]'
      const saved = JSON.parse(raw)
      const filtered = saved.filter(s => (s._id || s.id) !== id)
      localStorage.setItem('savedVideos', JSON.stringify(filtered))
      setSavedVideos(filtered)
      window.dispatchEvent(new CustomEvent('savedUpdated'))
    } catch (e) {
      console.error('Failed to remove saved', e)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: 16 }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ color: 'var(--text)' }}>Saved</h2>

        {savedVideos.length === 0 ? (
          <p style={{ color: 'var(--muted)' }}>No saved items yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {savedVideos.map(s => (
              <div key={s._id || s.id} className="video-tile" style={{ aspectRatio: '1/1', position: 'relative' }}>
                {s.video ? (
                  <video src={s.video} muted playsInline loop style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className="label">video</div>
                )}
                <div style={{ position: 'absolute', left: 8, bottom: 8, right: 8, display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <Link to={'/foodpartner/' + (s.foodPartner || '')} style={{ color: 'var(--primary)', background: 'rgba(255,255,255,0.06)', padding: '6px 8px', borderRadius: 8, textDecoration: 'none', fontSize: 12 }}>Visit</Link>
                  <button onClick={() => removeSaved(s._id || s.id)} style={{ padding: '6px 8px', borderRadius: 8, border: 'none', background: 'rgba(0,0,0,0.45)', color: '#fff', fontSize: 12 }}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Fixed bottom nav on Saved page so user can go back to Home easily */}
      <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
        <Link className="nav-item" to="/">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z" />
          </svg>
          <span>home</span>
        </Link>

        <Link className="nav-item" to="/saved">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M6 2h9l5 5v15l-7-4-7 4V2z" />
          </svg>
          <span>saved</span>
        </Link>
      </nav>
    </div>
  )
}

export default Saved
