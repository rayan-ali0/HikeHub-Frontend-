
import React, { useState, useEffect, useContext } from "react";
// import toast from "react-hot-toast"
import styles from "./Navbar.module.css";
import logo from '../../assets/images/cloud1.png';
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from 'react-icons/ai';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../../Context/UserContext";
import axiosInstance from "../../Utils/AxiosInstance";
// import Avatar from '@mui/material/Avatar';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.minimal.css';


const Navbar = () => {
  const { user, setUser } = useContext(UserContext)
  const [nav, setNav] = useState({
    isOpen: false,
    isCartOpen: false,
  });


  const location = useLocation();

  const navigate = useNavigate();

  const openProfile = () => {
    navigate('/profile')
  }
  const logout = async () => {
    try {
      const action = await axiosInstance.post(`logout`);
      if (action) {
        localStorage.removeItem('token')
        setUser(null);
        toast.success("Logout successful!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/')

      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleCartIconClick = () => {
    // Navigate to the cart page
    navigate('/cart');
  };
  useEffect(() => {
    // Close the mobile menu when a NavLink is clicked
    setNav(false);
  }, [location]);

  return (
    // Header Container
    // <header className={styles.headerContainer} >
    <header className={`${styles.headerContainer} ${location.pathname.startsWith('/productdetails') ? styles.headerBule : styles.headerTransparent}`} >
      <div className={styles.navbar} >
        {/* Logo */}
        <NavLink to="/">
          <div>
            <img className={styles.imagee} src={logo} alt="/" />
            {/* <p>AL Monla</p>       */}
          </div>
        </NavLink>
        {/* Navigation Links */}
        <div className={styles.whatever}>
          <nav style={{ display: "flex", gap: "2rem" }}>
            <ul className={nav ? [styles.menu, styles.active].join(' ') : [styles.menu]} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              {/* NavLink for Home */}
              {nav ? <span className={styles.closeMenu} onClick={() => setNav(!nav)}><AiOutlineClose size={25} /></span> : ""}
              <li>
                <NavLink to='/' activeclassname={styles.activeLink} className={`${styles.menuItem} ${styles.white} ${location.pathname === '/' ? styles.activeNavItem : ''} `} >
                  Home
                </NavLink>
              </li>

              {/* NavLink for Services */}
              <li >
                <NavLink to='/events' activeclassname={styles.activeLink} className={`${styles.menuItem} ${styles.white} ${location.pathname === '/events' ? styles.activeNavItem : ''} `}>
                  Events
                </NavLink>
              </li>

              {/* NavLink for Product page */}
              <li >

                <NavLink to='/stories' activeclassname={styles.activeLink} className={`${styles.menuItem} ${styles.white} ${location.pathname === '/stories' ? styles.activeNavItem : ''} `}>
                  Stories
                </NavLink>
              </li>

              {/* NavLink for About Us */}
              <li >

                <NavLink to='/about' activeclassname={styles.activeLink} className={`${styles.menuItem} ${styles.white} ${location.pathname === '/about' ? styles.activeNavItem : ''} `}>
                  About
                </NavLink>
              </li>

              {/* NavLink for Contact Us */}
              <li >

                <NavLink to='/contact' activeclassname={styles.activeLink} className={`${styles.menuItem} ${styles.white} ${location.pathname === '/contact' ? styles.activeNavItem : ''}`}>
                  Contact
                </NavLink>
              </li>
              {user&&
                user.role === "organizer" && (
                  <li>
                    <NavLink
                      to="/dashboard"
                      activeclassname={styles.activeLink}
                      className={`${styles.menuItem} ${location.pathname === '/dashboard' ? styles.activeNavItem : ''} ${location.pathname === '/checkout' || location.pathname === '/confirmed' || location.pathname === '/developers' || location.pathname === '/profile' || location.pathname === '/cart' ? styles.blue : styles.white}`}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  )
                }


              {
                <li>
                  {user ?
                    (
                      <>
                        <button className={`${styles.menuItem} ${styles.logoutBtn}`} onClick={logout}>logout</button>
                        <button className={`${styles.menuItem} ${styles.profileBtn}`} onClick={openProfile}>P</button>

                      </>

                    )
                    : (
                      <NavLink
                        to="/signin"
                        activeclassname={styles.activeLink}
                        className={`${styles.menuItem} ${styles.white}`}
                      >

                        Sign In
                      </NavLink>
                    )}

                </li>
              }
            </ul>
            

           
          </nav>

          <div onClick={() => setNav(!nav)} className={styles.mobile_btn}>
            {nav ? <AiOutlineMenu size={25} style={{ visibility: "hidden" }} /> : <AiOutlineMenu size={25} />}
          </div>
        </div>




      </div>
    </header>


  );
};

export default Navbar;