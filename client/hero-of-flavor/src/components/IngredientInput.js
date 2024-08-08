import React from 'react';

const IngredientInput = () => {
  return (
    <div style={styles.container}>
      <label htmlFor="ingredients">Add your available Ingredients to see what you can cook!</label>
      <select id="ingredients" style={styles.select}>
        <option value="default">Ingredients</option>
        {/* Add more options here */}
      </select>
      <div style={styles.grid}>
        <div style={styles.featuredGrid}>
          <div style={styles.largeRecipeCard}></div>
          <div style={styles.largeRecipeCardRecipeCard}></div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px 0',
    padding: '0 20px',
  },
  select: {
    marginTop: '10px',
    padding: '10px',
    fontSize: '16px',
  },
};

export default IngredientInput;
