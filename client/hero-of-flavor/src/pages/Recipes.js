import React, { useState, useEffect } from 'react';
import './Recipes.css';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 20;
  
  useEffect(() => {
    const fetchIngredients = async () => {
      const fetchedIngredients = Array.from({ length: 215 }).map((_, idx) => ({
        id: idx,
        name: `Ingredient ${idx + 1}`
      }));
      setRecipes(fetchedIngredients);
    };

  fetchIngredients();
  }, [])
  

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
      
      <div className="recipes-grid">
        {currentRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
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