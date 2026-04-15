import React from 'react'
import './Hero.css'
import profile_img from '../../assets/prop122.png'
import AnchorLink from 'react-anchor-link-smooth-scroll'
const Hero = () => {
  return (
    <div id="home" className='hero'>
        <img src={profile_img} alt="" />
        <h1><span>I'm Rohit Kumar,</span> Software Engineer based in India.</h1>
        <p>I am a Software Engineer from Bhopal, India with 10+ projects.</p>
        <div className="hero-action">
            <div className='hero-connect'>
  <a 
    className='anchor-link' 
    href="https://www.linkedin.com/in/rohitkumarsingh0111/" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    Connect With Me
  </a>
</div>

            <div className="hero-resume">
  <a 
    href="/Rohit_Kumar.pdf" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    My Resume
  </a>
</div>

        </div>
        </div>
  )
}

export default Hero
