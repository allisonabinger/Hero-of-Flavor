import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for API calls
import './Search.css'; // Import the CSS file

const Search = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const itemsPerPage = 32; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  const fetchIngredients = async (sortBy = null) => {
    try {
      const response = await axios.get('http://localhost:5000/api/ingredients', {
        params: { sortBy }
      });
      console.log('Fetched ingredients: ', response.data);
      setIngredients(response.data); // Store the fetched ingredients in state
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  useEffect(() => {
    fetchIngredients(); // Fetch ingredients without sorting initially
  }, []);

  // Handle sorting by type (assume 'type' is the field name in your DB)
  const sortByType = () => {
    fetchIngredients('type');
  };

  // Handle sorting alphabetically by name
  const sortAlphabetically = () => {
    fetchIngredients('Name');
  };

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
        <button className="optionButton" onClick={sortByType}>Sort By Type</button>
        <button className="optionButton" onClick={sortAlphabetically}>Sort Alphabetically</button>
      </div>

      <h2>How to Use</h2>

      <div className="selectedIngredients">
        <h3>Selected Ingredients:</h3>
        {selectedIngredients.length > 0 ? (
          <div className="ingredientsGrid">
            {selectedIngredients.map((ingredient, idx) => (
              <div
                key={idx} 
                onClick={() => handleIngredientClick(ingredient)}
                className="ingredientItem"
              >
                <img src={`/images/ingredients/${ingredient.imagePath}`} alt={ingredient.Name} />
                <p>{ingredient.Name}</p>
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
            onClick={() => handleIngredientClick(ingredient)}
            className="ingredientItem"
          >
            <img src={`/images/ingredients/${ingredient.imagePath}`} alt={ingredient.Name} />
            <p>{ingredient.Name}</p>
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