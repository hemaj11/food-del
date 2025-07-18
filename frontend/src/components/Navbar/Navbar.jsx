import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [search, setSearch] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search)}`);
      setSearch("");
      setShowMobileSearch(false);
    }
  };

  return (
    <div className='navbar'>
      {/* Brand Title */}
      <Link to='/' className="brand-title"><span>Home</span><span className='highlight'>Eats</span></Link>
      {/* <Link to='/' className="brand-title">Home<span className='highlight'>Eats</span></Link> */}

      <ul className="navbar-menu">
        <Link to='/' className={menu === "home" ? "active" : ""} onClick={() => setMenu("home")}>home</Link>
        <a href='#explore-menu' className={menu === "menu" ? "active" : ""} onClick={() => setMenu("menu")}>menu</a>
        <a href='#app-download' className={menu === "mobile-app" ? "active" : ""} onClick={() => setMenu("mobile-app")}>mobile-app</a>
        <a href='#footer' className={menu === "contact-us" ? "active" : ""} onClick={() => setMenu("contact-us")}>contact us</a>
      </ul>

      <div className="navbar-right">
        {/* Desktop Search Bar */}
        <form className="navbar-search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">
            <img src={assets.search_icon} alt="search" />
          </button>
        </form>

        {/* Mobile Search Icon */}
        <button className="navbar-search-mobile" onClick={() => setShowMobileSearch(true)}>
          <img src={assets.search_icon} alt="search" />
        </button>

        {/* Mobile Search Overlay */}
        {showMobileSearch && (
          <div className="navbar-mobile-search-overlay">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
              <button type="submit">
                <img src={assets.search_icon} alt="search" />
              </button>
              <button type="button" onClick={() => setShowMobileSearch(false)}>Close</button>
            </form>
          </div>
        )}

        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="cart" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="profile" />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;