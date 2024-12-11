import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import '../pages/home.css'
export function Home() {

  const [userData, setUserData] = useState(null);
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:7500/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: localStorage.getItem('token'), test: 'test',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setUserData(userData);
      console.log(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="logo">ModernUI</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <section id="home" className="hero">
        <h1>Elevate Your Web Experience</h1>
        <p>{userData && <div>

          <h3>Welcome {userData.name}</h3>
          <h4>{userData.email}</h4>
          <h5>{userData.password}</h5>
        </div>}</p>
        <a href="#services" className="btn" onClick={() => {

          localStorage.removeItem('token');
          window.location.href = '/login';
        }}>Log Out</a>
      </section>

      <section id="services" className="services">
        <h2>Our Services</h2>
        <div className="cards">
          <div className="card">
            <h3>Design</h3>
            <p>We create beautiful and user-friendly designs tailored to your brand identity.</p>
          </div>
          <div className="card">
            <h3>Development</h3>
            <p>Our code ensures fast, secure, and scalable websites across all platforms.</p>
          </div>
          <div className="card">
            <h3>SEO Optimization</h3>
            <p>We improve your site’s search engine visibility to increase traffic and leads.</p>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <h2>Who We Are</h2>
        <div className="about-container">
          <div className="about-image">
            <img src="https://via.placeholder.com/500x300" alt="About Us Image" />
          </div>
          <div className="about-content">
            <h3>Our Mission</h3>
            <p>At ModernUI, we aim to create impactful digital experiences through beautifully crafted websites. We blend design with technology to deliver high-performance solutions tailored to your business needs.</p>
            <h3>Why Choose Us?</h3>
            <ul>
              <li><FaCheckCircle /> Creative and Customized Solutions</li>
              <li><FaCheckCircle /> Experienced Team of Experts</li>
              <li><FaCheckCircle /> Dedicated Customer Support</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <h2 className="clr-g">Get In Touch</h2>
        <div className="contact-container">
          <div className="contact-form">
            <h3>Send Us a Message</h3>
            <form action="#" method="POST">
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <textarea name="message" rows="5" placeholder="Your Message" required ></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="contact-details">
            <h3 className="clr-g">Contact Information</h3>
            <p>
              <FaPhoneAlt />
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </p>
            <p>
              <FaEnvelope />
              <a href="mailto:info@modernui.com">info@modernui.com</a>
            </p>
            <p>
              <FaMapMarkerAlt /> 123 Web Street, Tech City, USA
            </p>
            <div className="social-links">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2024 ModernUI. All rights reserved.</p>
      </footer>
    </div>
  )
}






