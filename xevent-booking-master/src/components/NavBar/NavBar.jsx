import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import eventLogo from "../../assets/eventlogo.png"

const NavBar = () => (
  <>
    {/* Top info bar */}
    <div className={styles.topBar}>
      Stay updated with the latest events and maximize your experience with our platform.
    </div>

    {/* Main nav */}
    <nav className={styles.navbar}>
      {/* Logo on the left */}
      <Link to="/" className={styles.logo}>
  
+       <img src={eventLogo}  alt="ELogo" className={styles.logoImg} />
    
      </Link>

      {/* Centered links */}
      <ul className={styles.navLinks}>
        <li><Link to="/find-events">Find Events</Link></li>
        <li><Link to="/venues">Venues</Link></li>
        <li><Link to="/tickets">Tickets</Link></li>
        <li><Link to="/workshops">Workshops</Link></li>
        <li><Link to="/software">Event Management Software</Link></li>
        <li><Link to="/services">Services</Link></li>
      </ul>

      {/* Button on the right */}
      <Link to="/my-bookings" className={styles.bookButton}>
        My Bookings
      </Link>
    </nav>
  </>
);

export default NavBar;