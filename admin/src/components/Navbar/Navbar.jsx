import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
      <h1 className='brand-title'>Home<span className="highlight">Eats</span></h1>
      <img className='profile' src={assets.profile_image} alt="profile" />
    </div>
  )
}

export default Navbar
