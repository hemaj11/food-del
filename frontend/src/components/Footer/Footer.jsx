import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
          <div className="footer-content">
              
        <div className="footer-content-left">
          <span className="brand-title">
            Home<span className="highlight">Eats</span>
          </span>
          <p>
            Bringing mom’s kitchen to your doorstep. Real food, Real good!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
              
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-234-567-7890</li>
                    <li>contact@homeEats.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 20254@ homeEats.com - All rights reserved.
        </p>
    </div>
  )
}

export default Footer
