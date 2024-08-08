import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Recipes by Ingredient Tool</h1>
      <Link to="/recipes">
        <button style={styles.button}>View all Recipes Here</button>
      </Link>
      <h2>Featured Recipes</h2>
      <div style={styles.featuredRecipes}>
        <div style={styles.recipeCard}>Recipe</div>
        <div style={styles.recipeCard}>Recipe</div>
        <div style={styles.recipeCard}>Recipe</div>
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
    padding: '10px 20px',
    margin: '20px 0',
    fontSize: '16px',
    cursor: 'pointer',
  },
  featuredRecipes: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  recipeCard: {
    backgroundColor: '#fff',
    padding: '20px',
    width: '150px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #ccc',
  },
};

export default Home;