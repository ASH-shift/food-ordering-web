import React from 'react'
import '../../styles/reels.css'

const reels = [
  {
    id: 1,
    src: 'https://ik.imagekit.io/qiyrzuwx6/2f18c816-1445-49c1-a04c-7e6ddd9a7d04_wqMVUlq5s',
    description: 'Freshly made meals from local vendors. Fast delivery and daily offers available in your area.',
    store: '#'
  },
  {
    id: 2,
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    description: 'Homestyle recipes prepared with love — try our chef specials today.',
    store: '#'
  },
  {
    id: 3,
    src: 'https://www.w3schools.com/html/movie.mp4',
    description: 'Seasonal treats and exclusive discounts when you order from this partner.',
    store: '#'
  }
]

const Home = () => {
  return (
    <div className="reels-container" aria-label="Video reels">
      {reels.map(item => (
        <section className="reel" key={item.id}>
          <video
            src={item.src}
            muted
            playsInline
            loop
            autoPlay
            preload="metadata"
            aria-hidden="true"
          />

          <div className="overlay">
            <div className="description" title={item.description}>{item.description}</div>
            <a className="visit-btn" href={item.store}>Visit store</a>
          </div>
        </section>
      ))}
    </div>
  )
}

export default Home