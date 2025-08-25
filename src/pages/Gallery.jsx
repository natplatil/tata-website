import { useMemo, useState } from 'react'
import site from '../site.config'
import './Gallery.css'

// Auto-import all images in src/assets/photos and subfolders
const modules = import.meta.glob('../assets/photos/**/*.{jpg,jpeg,png,webp,avif,gif}', { eager: true })
const allPhotos = Object.entries(modules).map(([path, mod]) => {
  const url = mod.default
  const parts = path.split('/')
  const idx = parts.indexOf('photos')
  const folder = parts[idx + 1] && parts[idx + 1].includes('.') ? 'Unsorted' : (parts[idx + 1] || 'Unsorted')
  return { url, folder }
}).sort((a, b) => a.url.localeCompare(b.url))

export default function Gallery() {
  const [active, setActive] = useState('All')
  const folders = useMemo(() => {
    const set = new Set(allPhotos.map(p => p.folder))
    return ['All', ...Array.from(set).sort()]
  }, [])

  const visible = active === 'All' ? allPhotos : allPhotos.filter(p => p.folder === active)

  // Lightbox
  const [lightbox, setLightbox] = useState(null)

  return (
    <section className="gallery">
      <div className="main-banner" style={{ backgroundImage: `url('${encodeURI(site.mainHero)}')` }}>

      </div>
      <div className="hero">
        <div className="container">
          <h1 className="title">{site.name}</h1>
          <p className="tag">{site.tagline}</p>
          <div className="tabs" role="tablist">
            {folders.map(f => (
              <button key={f} className={`tab ${active === f ? 'active' : ''}`} onClick={() => setActive(f)} role="tab" aria-selected={active === f}>{f}</button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="intro-section">
        <div className="container">
          {/* <h2 className="intro-title">Art is Freedom</h2> */}
          <p className="intro-text">
            I believe portrait photography is more than capturing appearances — it's about revealing who you truly are.
            <br /><br />
            When we work together, I take the time to connect with you, to understand your personality, your style, and the environments where you feel most alive. Together, we'll create the right atmosphere so your portraits express both your essence and your individuality.
          </p>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="empty container">Add photos to src/assets/photos. Optional: create subfolders like portraits, events, travel to enable filters.</p>
      ) : (
        <div className="grid container">
          {visible.map((p, i) => (
            <figure key={i} className="card" onClick={() => setLightbox(p.url)}>
              <img loading="lazy" src={p.url} alt="" />
            </figure>
          ))}
        </div>
      )}

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="" loading="lazy" />
        </div>
      )}
    </section>
  )
}
