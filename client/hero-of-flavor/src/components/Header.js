import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1>Hero of Flavor</h1>
      <div style={styles.searchContainer}>
        <input type="text" placeholder="Search Recipes" style={styles.searchInput} />
        <button style={styles.searchButton}>🔍</button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f0f0f0',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    padding: '5px',
    fontSize: '16px',
  },
  searchButton: {
    marginLeft: '10px',
    padding: '5px 10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Header;
