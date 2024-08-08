import React from 'react';

const Search = () => {
  return (
    <div style={styles.container}>
      <h1>Recipe by Ingredient Tool</h1>
      <button style={styles.button}>Find Recipes With My Ingredients!</button>
      <div style={styles.options}>
        <button style={styles.optionButton}>Sort By Type</button>
        <button style={styles.optionButton}>Sort Alphabetically</button>
      </div>
      <h2>How to Use</h2>
      <div style={styles.ingredientsGrid}>
        {Array.from({ length: 9 }).map((_, idx) => (
          <div key={idx} style={styles.ingredientCard}>
            <div style={styles.icon}>icon</div>
            <p>Ingredient Name</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#DFF5E1',
  },
  button: {
    padding: '15px 30px',
    margin: '20px 0',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  options: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    margin: '20px 0',
  },
  optionButton: {
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  ingredientsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    justifyContent: 'center',
  },
  ingredientCard: {
    backgroundColor: '#fff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  icon: {
    backgroundColor: '#f8b9c9',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
  },
};

export default Search;