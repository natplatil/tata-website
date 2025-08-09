import { Link, NavLink } from 'react-router-dom'
import site from '../site.config'
import './Navbar.css'

export default function Navbar() {
  return (
    <header className="nav">
      <div className="brand">
        <Link to="/">{site.name}</Link>
      </div>
      <nav>
        <NavLink to="/" end>Gallery</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  )
}
