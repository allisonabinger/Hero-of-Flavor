import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/search" style={styles.link}>Search</Link>
        <Link to="/recipes" style={styles.link}>Recipes</Link>
      </div>
      <div style={styles.searchBar}>
        <input type="text" placeholder="Search Bar" style={styles.input} />
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#DFF5E1',
    padding: '10px 20px',
    borderBottom: '1px solid #ccc',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '18px',
  },
  searchBar: {
    padding: '5px',
  },
  input: {
    padding: '5px',
    fontSize: '16px',
  },
};

export default Navbar;