import React, { useEffect, useState } from 'react';
import './Search.css';
import { getIngredients } from '../db'; // Adjust the path as necessary

const Search = () => {
  const [ingredients, setIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ingredientsPerPage = 12;

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const ingredientsData = await getIngredients();
        setIngredients(ingredientsData);
      } catch (error) {
        console.error('Failed to fetch ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  const indexOfLastIngredient = currentPage * ingredientsPerPage;
  const indexOfFirstRecipe = indexOfLastIngredient - ingredientsPerPage;
  const currentIngredient = ingredients.slice(indexOfFirstRecipe, indexOfLastIngredient);

  const totalPages = Math.ceil(ingredients.length / ingredientsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };


  return (
    <div className="container">
      <h1>Recipe by Ingredient Tool</h1>
      <button className="button">Find Recipes With My Ingredients!</button>
      <div className="options">
        <button className="optionButton">Sort By Type</button>
        <button className="optionButton">Sort Alphabetically</button>
      </div>
      <h2>How to Use</h2>
      <div className="ingredientsGrid">
        {currentIngredient.map((ingredient) => (
          <div key={ingredient._id} className="ingredientCard">
            <div className="icon">icon</div>
            <p>{ingredient.name}</p>
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

export default Search;