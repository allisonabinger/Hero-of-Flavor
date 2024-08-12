import React, { useState, useEffect } from 'react';
import './Search.css'; // Import the CSS file

const Search = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const itemsPerPage = 12; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Simulate fetching data
    const fetchIngredients = async () => {
      const fetchedIngredients = Array.from({ length: 215 }).map((_, idx) => ({
        id: idx,
        name: `Ingredient ${idx + 1}`
      }));
      setIngredients(fetchedIngredients);
    };

    fetchIngredients();
  }, []);

  // Handle ingredient click
  const handleIngredientClick = (ingredient) => {
    setSelectedIngredients((prev) => {
      // Add the ingredient to the selected list if it's not already selected
      if (!prev.includes(ingredient)) {
        return [...prev, ingredient];
      }
      return prev;
    });
  };

  // Handle page navigation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ingredients.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  const totalPages = Math.ceil(ingredients.length / itemsPerPage);

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container">
      <h1>Recipe by Ingredient Tool</h1>
      <button className="button">Find Recipes With My Ingredients!</button>

      <div className="options">
        <button className="optionButton">Sort By Type</button>
        <button className="optionButton">Sort Alphabetically</button>
      </div>

      <h2>How to Use</h2>

      <div className="selectedIngredients">
        <h3>Selected Ingredients:</h3>
        {selectedIngredients.length > 0 ? (
          <div className="selectedIngredientsGrid">
            {selectedIngredients.map((ingredient, idx) => (
              <div key={idx} className="selectedIngredient">
                {ingredient.name}
              </div>
            ))}
          </div>
        ) : (
          <p>No ingredients selected yet.</p>
        )}
      </div>

      <div className="ingredientsGrid">
        {currentItems.map((ingredient) => (
          <div
            key={ingredient.id}
            className="ingredientCard"
            onClick={() => handleIngredientClick(ingredient)}
          >
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