import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for API calls
import './Search.css'; // Import the CSS file

const Search = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const itemsPerPage = 12; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch ingredients from the backend using Axios
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('0.0.0.0:5000/api/ingredients');
        setIngredients(response.data); // Store the fetched ingredients in state
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  // Handle ingredient click
  const handleIngredientClick = (ingredient) => {
    setSelectedIngredients((prev) => {
      if (!prev.includes(ingredient)) {
        return [...prev, ingredient];
      }
      return prev;
    });
  };

  // Handle page navigation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ingredients.slice(indexOfFirstItem, indexOfLastItem);

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
            key={ingredient._id} // Assuming MongoDB's ObjectId is used as the unique identifier
            className="ingredientCard"
            onClick={() => handleIngredientClick(ingredient)}
          >
            <div className="icon">
              <img src={ingredient.imageUrl} alt={ingredient.name} /> {/* Display ingredient image */}
            </div>
            <p>{ingredient.name}</p> {/* Display ingredient name */}
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