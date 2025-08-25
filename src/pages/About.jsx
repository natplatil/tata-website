import site from '../site.config'
import './About.css'

export default function About() {
  return (
    <section className="about">
      <div className="about-banner" style={{ backgroundImage: `url('${encodeURI(site.aboutHero)}')` }}>
        <div className="banner-inner container">
          {/* <h1>About {site.owner.firstName}</h1>
          <p className="banner-tag">{site.tagline}</p> */}
        </div>
      </div>

      <div className="container">
        <header className="about-hero" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* <img className="avatar" src="/profil.jpg" alt={`${site.owner.firstName} portrait`} loading="lazy" /> */}
         
          <div style={{ maxWidth: '1200px', marginTop: '2rem' }}>
            <h2>Art is Life, as much as Life is Art.</h2>
            <p className="intro">{site.about}</p>
          </div>

        </header>
        <h2>Areas of Expertise</h2>
        <div className="details">

          <div className="panel">

            <h4>Portrait & People</h4>
            <p>Fine Art Portraits</p>
            <p>Personal Branding Photography</p>
            <p>Family Portraits</p>
          </div>

          <div className="panel">
            <h4>Events & Lifestyle</h4>
            <p>Journal Documentary</p>
            <p>Lifestyle Photography (everyday, candid, documentary style)</p>
            <p>Corporate Events</p>
            <p>Performances & Cultural Events</p>
          </div>

          <div className="panel">

            <h4>Creative & Editorial</h4>
            <p>Fashion Photography</p>
            <p>Editorial Portraits (for magazines, blogs, features)</p>
            <p>Conceptual / Artistic Projects</p>
            <p>Black & White Portraiture</p>
          </div>
          <div className="panel">
            <h4>Commercial & Business</h4>
            <p>Product Photography</p>
            <p>Food Photography</p>
            <p>Corporate Branding / Team Photography</p>
          </div>
          <div className="panel">
            <h4>Travel & Nature</h4>
            <p>Travel Photography</p>
            <p>Street Photography</p>
            <p>Landscape Photography</p>


          </div>
          {/* <div className="panel">
            <h3>Location</h3>
            <p>{site.location}</p>
          </div> */}
        </div>

        <div className="process-section">
          <h2>My Process</h2>
          <div className="process-grid">
            <div className="process-step">
              <div className="process-number">1</div>
              <h4>Initial Consultation</h4>
              <p>We begin with a conversation about your vision and my creative ideas for bringing it to life.</p>
            </div>
            <div className="process-step">
              <div className="process-number">2</div>
              <h4>Session Planning</h4>
              <p>Depending on your needs, this may last from one hour to a full day, with styling and environment tailored to you.</p>
            </div>
            <div className="process-step">
              <div className="process-number">3</div>
              <h4>Selection & Editing</h4>
              <p>I carefully choose the best images, apply professional editing, and present you with portraits that reflect your true self.</p>
            </div>
          </div>
          <h3>If you have special requests, I am always happy to accommodate them. My goal is to deliver portraits you’ll not only love but feel proud of.</h3>
        </div>
      </div>
    </section>
  )
}
