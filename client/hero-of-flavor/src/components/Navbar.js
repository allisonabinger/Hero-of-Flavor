import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <img src='/images/CustomLogo.png' width={100} alt='Hero of Flavor Logo'></img>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Recipe Tool</Link>
        <Link to="/recipes" style={styles.link}>View All Recipes</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#005033',
    padding: '10px 20px',
    borderBottom: '1px solid #ccc',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#eac03d',
    fontFamily: 'HyliaSerifBeta, serif',
    letterSpacing: '1px',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#eac03d',
    fontSize: '16px',
    fontFamily: 'HyliaSerifBeta, serif',
    letterSpacing: '1px',
  },
};

export default Navbar;
