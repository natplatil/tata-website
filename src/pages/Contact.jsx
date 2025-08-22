import { useState } from 'react'
import site from '../site.config'
import './Contact.css'

export default function Contact(){
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e){
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const data = Object.fromEntries(form.entries())

    try {
      setStatus('sending')
      const subject = encodeURIComponent(`Inquiry via ${site.name}`)
      const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nType: ${data.type}\nMessage: ${data.message}`)
      window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`
      setStatus('sent')
      e.currentTarget.reset()
    } catch (err){
      setStatus('error')
    }
  }

  return (
    <section className="contact">
      <div className="about-banner" style={{ backgroundImage: `url('${encodeURI(site.contactHero)}')` }}></div>
      <div className="film-grain" aria-hidden />
      <div className="container">
        <header className="contact-hero">
          <div className="film-strip" aria-hidden>
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div>
            <h1>Get in touch</h1>
            <p className="lead">Bookings, collaborations, or prints—say hello. {site.owner.firstName} loves film and honest imagery.</p>
          </div>
        </header>

        <div className="contact-grid">
          <div className="card">
            <h3>Write a message</h3>
            <form className="form" onSubmit={handleSubmit}>
              <label>
                Name
                <input name="name" required placeholder="Your name" />
              </label>
              <label>
                Email
                <input type="email" name="email" required placeholder="you@example.com" />
              </label>
              <label>
                Inquiry Type
                <select name="type" defaultValue="Hiring">
                  <option>Hiring</option>
                  <option>Collaboration</option>
                  <option>Prints</option>
                  <option>General</option>
                </select>
              </label>
              <label>
                Message
                <textarea name="message" rows="6" required placeholder="Tell me about your project..." />
              </label>
              <button className="submit" disabled={status==='sending'}>{status==='sending' ? 'Sending...' : 'Send'}</button>
              {status==='sent' && <p className="ok">Opened your email app. If it didn’t, email {site.contactEmail}.</p>}
              {status==='error' && <p className="err">Something went wrong. Please try again.</p>}
            </form>
          </div>
          <aside className="card side">
            <h3>Direct contact</h3>
            <p>Email: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></p>
            <div className="divider" />
            <h3>Follow</h3>
            <ul className="links">
              {site.socials.instagram && <li><a href={site.socials.instagram} target="_blank" rel="noreferrer">Instagram</a></li>}
              {site.socials.facebook && <li><a href={site.socials.facebook} target="_blank" rel="noreferrer">Facebook</a></li>}
              {site.socials.twitter && <li><a href={site.socials.twitter} target="_blank" rel="noreferrer">X</a></li>}
            </ul>
            <div className="film-edge" aria-hidden />
          </aside>
        </div>

        <div className="process-section">
          <h2>My Process</h2>
          <div className="process-grid">
            <div className="process-step">
              <div className="process-number">1</div>
              <h4>Initial Consultation</h4>
              <p>We discuss your vision, goals, and preferred style. I'll answer any questions and help plan the perfect session for you.</p>
            </div>
            <div className="process-step">
              <div className="process-number">2</div>
              <h4>Session Planning</h4>
              <p>Together we'll choose the ideal location, timing, and mood. I handle all the technical details so you can focus on being yourself.</p>
            </div>
            <div className="process-step">
              <div className="process-number">3</div>
              <h4>The Photoshoot</h4>
              <p>Relaxed, natural photography sessions where I capture authentic moments. I guide you through poses while keeping the atmosphere comfortable.</p>
            </div>
            <div className="process-step">
              <div className="process-number">4</div>
              <h4>Post-Production</h4>
              <p>Careful editing and color grading to enhance the natural beauty of each image while maintaining an authentic, timeless feel.</p>
            </div>
            <div className="process-step">
              <div className="process-number">5</div>
              <h4>Delivery</h4>
              <p>High-resolution gallery with easy sharing options and print-ready files. Your images are delivered within 1-2 weeks.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
