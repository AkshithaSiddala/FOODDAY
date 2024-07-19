import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { Storecontext } from '../../Context/Storecontext'


const Navbar = ({ setshowlogin }) => {
  const navigate=useNavigate()
  const [menu, setmenu] = useState("home")
  const { gettotalCartAmount, token, settoken } = useContext(Storecontext)

  const logout=()=>{
    localStorage.removeItem("token")
    settoken("")
    navigate("/")

  }

  return (
    <div className="navbar">
      {/* <img src={assets.logo} alt="" className='logo' /> */}
      <div className='logo' ><p>FOOD-DAY</p></div>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setmenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href="#app-download" onClick={() => setmenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href="#footer" onClick={() => setmenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact-us</a>
        <a href="#explore-menu" onClick={() => setmenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
          <div className={gettotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token? <button onClick={() => setshowlogin(true)}> sign in </button> :
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr/>
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>}


      </div>
    </div>


  )
}

export default Navbar
