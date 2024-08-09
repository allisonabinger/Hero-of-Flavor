import React, { useState, useEffect } from 'react';
import './Recipes.css';
import { getRecipes } from '../db';

const Recipes = () => {
  const categories = ['Fruit', 'Veggie', 'Meat', 'Elixirs', 'Dessert', 'Poultry'];
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 20;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesData = await getRecipes();
        setRecipes(recipesData);
        } catch (error) {
          console.error('Failed to fetch recipes:', error)
        }
    };

    fetchRecipes();
  }, []);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="recipes-container">
      <h1>All Recipes</h1>

      <div className="categories">
        {categories.map((category) => (
          <span key={category} className="category-item">{category}</span>
        ))}
      </div>

      <div className="recipes-grid">
        {currentRecipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <div className="recipe-icon">{recipe.icon}</div>
            <p>{recipe.name}</p>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Recipes;