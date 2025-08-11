import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import site from '../site.config'
import './Navbar.css'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="nav">
      <div className="brand">
        <Link to="/">{site.name}</Link>
      </div>
      
      {/* Hamburger button for mobile */}
      <button 
        className="hamburger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      {/* Navigation menu */}
      <nav className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
        <NavLink to="/" end onClick={() => setIsMenuOpen(false)}>Gallery</NavLink>
        <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
        <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
      </nav>
    </header>
  )
}
