import { useMemo, useState, useEffect } from 'react'
import site from '../site.config'
import { googlePhotosConfig } from '../config/google-photos'
import './Gallery.css'

export default function Gallery(){
  const [allPhotos, setAllPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('All')

  // Load photos from Google Photos albums
  useEffect(() => {
    async function loadGooglePhotos() {
      if (!googlePhotosConfig.enabled) {
        // Fallback to local photos if Google Photos is disabled
        const modules = import.meta.glob('../assets/photos/**/*.{jpg,jpeg,png,webp,avif,gif}', { eager: true })
        const localPhotos = Object.entries(modules).map(([path, mod]) => {
          const url = mod.default
          const parts = path.split('/')
          const idx = parts.indexOf('photos')
          const folder = parts[idx+1] && parts[idx+1].includes('.') ? 'Unsorted' : (parts[idx+1] || 'Unsorted')
          return { url, folder }
        }).sort((a,b)=> a.url.localeCompare(b.url))
        
        setAllPhotos(localPhotos)
        setLoading(false)
        return
      }

      try {
        const photoPromises = googlePhotosConfig.albums.map(async (album) => {
          try {
            const response = await fetch(`/api/google-photos?albumUrl=${encodeURIComponent(album.url)}`)
            const data = await response.json()
            
            if (data.success && data.photos) {
              return data.photos.map(photoUrl => ({
                url: photoUrl,
                folder: album.name,
                albumUrl: album.url
              }))
            }
            return []
          } catch (error) {
            console.error(`Error loading album ${album.name}:`, error)
            return []
          }
        })

        const photoArrays = await Promise.all(photoPromises)
        const googlePhotos = photoArrays.flat()
        
        setAllPhotos(googlePhotos)
      } catch (error) {
        console.error('Error loading Google Photos:', error)
        // Fallback to empty array
        setAllPhotos([])
      } finally {
        setLoading(false)
      }
    }

    loadGooglePhotos()
  }, [])

  const folders = useMemo(()=> {
    const set = new Set(allPhotos.map(p=>p.folder))
    return ['All', ...Array.from(set).sort()]
  },[allPhotos])

  const visible = active === 'All' ? allPhotos : allPhotos.filter(p=>p.folder === active)

  // Lightbox
  const [lightbox, setLightbox] = useState(null)

  return (
    <section className="gallery">
      <div className="hero">
        <div className="container">
          <h1 className="title">{site.name}</h1>
          <p className="tag">{site.tagline}</p>
          <div className="tabs" role="tablist">
            {folders.map(f => (
              <button key={f} className={`tab ${active===f?'active':''}`} onClick={()=>setActive(f)} role="tab" aria-selected={active===f}>{f}</button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading container">
          <p>Loading photos from Google Photos albums...</p>
        </div>
      ) : visible.length === 0 ? (
        <p className="empty container">
          {googlePhotosConfig.enabled 
            ? "No photos found in Google Photos albums. Check your album URLs in src/config/google-photos.js"
            : "Add photos to src/assets/photos. Optional: create subfolders like portraits, events, travel to enable filters."
          }
        </p>
      ) : (
        <div className="grid container">
          {visible.map((p, i) => (
            <figure key={i} className="card" onClick={()=>setLightbox(p.url)}>
              <img loading="lazy" src={p.url} alt="" />
            </figure>
          ))}
        </div>
      )}

      {lightbox && (
        <div className="lightbox" onClick={()=>setLightbox(null)}>
          <img src={lightbox} alt="" />
        </div>
      )}
    </section>
  )
}
