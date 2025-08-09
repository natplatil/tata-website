import site from '../site.config'
import './Footer.css'

export default function Footer(){
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      <div className="socials">
        {site.socials.instagram && <a href={site.socials.instagram} target="_blank" rel="noreferrer">Instagram</a>}
        {site.socials.facebook && <a href={site.socials.facebook} target="_blank" rel="noreferrer">Facebook</a>}
        {site.socials.twitter && <a href={site.socials.twitter} target="_blank" rel="noreferrer">X</a>}
        {site.socials.email && <a href={`mailto:${site.socials.email}`}>Email</a>}
      </div>
    </footer>
  )
}
