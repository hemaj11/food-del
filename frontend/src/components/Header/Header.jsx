import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className="header">
       <div className="header-contents">
         <h2>Order your favourite food here</h2>
        <p>Craving something tasty? Explore a variety of cuisines from your favorite local restaurants and get fresh, hot meals delivered fast. Order now and enjoy seamless food delivery with just a few clicks!</p>
        <button><a href='http://localhost:5173/#explore-menu'>View Menu</a></button>
       </div>
    </div>
  )
}

export default Header
