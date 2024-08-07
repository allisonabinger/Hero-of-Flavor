import React from 'react';

const RecipeGrid = () => {
  return (
    <div style={styles.container}>
      <h2>Featured Recipes</h2>
      <div style={styles.grid}>
        <div style={styles.featuredGrid}>
          <div style={styles.smallRecipeCard}></div>
          <div style={styles.smallRecipeCard}></div>
          <div style={styles.smallRecipeCard}></div>
          <div style={styles.smallRecipeCard}></div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '0 20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  largeRecipeCard: {
    backgroundColor: '#e0e0e0',
    height: '200px',
  },
  featuredGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    gridColumn: 'span 2',
  },
  smallRecipeCard: {
    backgroundColor: '#e0e0e0',
    height: '100px',
  },
};

export default RecipeGrid;
