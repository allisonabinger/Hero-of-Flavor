import React, { useState, useEffect } from 'react';
import './Search.css'; // Import the CSS file

const Search = () => {
  const [ingredients, setIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of items per page

  useEffect(() => {
    // Simulate fetching data
    const fetchIngredients = async () => {
      // Here you can fetch data from your backend API or MongoDB
      const fetchedIngredients = Array.from({ length: 215 }).map((_, idx) => ({
        id: idx,
        name: `Ingredient ${idx + 1}`
      }));
      setIngredients(fetchedIngredients);
    };

    fetchIngredients();
  }, []);

  // Calculate the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ingredients.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(ingredients.length / itemsPerPage);

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
        {currentItems.map((ingredient) => (
          <div key={ingredient.id} className="ingredientCard">
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