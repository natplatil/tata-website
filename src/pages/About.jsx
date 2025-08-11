import site from '../site.config'
import './About.css'

export default function About(){
  return (
    <section className="about">
  <div className="about-banner" style={{ backgroundImage: `url('${encodeURI(site.aboutHero)}')` }}>
        <div className="banner-inner container">
          {/* <h1>About {site.owner.firstName}</h1>
          <p className="banner-tag">{site.tagline}</p> */}
        </div>
      </div>

      <div className="container">
        <header className="about-hero">
          <img className="avatar" src="/profil.jpg" alt={`${site.owner.firstName} portrait`} />
          <div>
            <h2>Artist Statement</h2>
            <p className="intro">{site.about}</p>
          </div>
        </header>

        <div className="details">
          <div className="panel">
            <h3>Specialties</h3>
            <ul className="chips">
              {site.specialties.map((s)=> <li className="chip" key={s}>{s}</li>)}
            </ul>
          </div>
          <div className="panel">
            <h3>Location</h3>
            <p>{site.location}</p>
            <h3>Availability</h3>
            <p>{site.availability}</p>
          </div>
        </div>

        <div className="callouts">
          <div className="callout">
            <h4>Approach</h4>
            <p>Real moments, natural light, and honest storytelling.</p>
          </div>
          <div className="callout">
            <h4>Deliverables</h4>
            <p>High-resolution galleries, easy sharing, and print-ready files.</p>
          </div>
          <div className="callout">
            <h4>[insert something else]</h4>
            <p>[insert  something]</p>
          </div>
        </div>
      </div>
    </section>
  )
}
