import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';

const Search = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [sortByType, setSortByType] = useState(false);
  const itemsPerPage = 32;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ingredients');
        setIngredients(response.data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  // Handle ingredient click: toggle selection
  const handleIngredientClick = (ingredient) => {
    setSelectedIngredients((prev) => {
      if (prev.includes(ingredient)) {
        // If ingredient is already selected, remove it
        return prev.filter(item => item !== ingredient);
      } else {
        // Otherwise, add it to the selection
        return [...prev, ingredient];
      }
    });
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle sorting by name
  const sortAlphabetically = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortByType(false);
  };

  // Handle sorting by type
  const sortIngredientsByType = () => {
    setSortByType(!sortByType);
    setSortOrder('');
  };

  // Filter, sort, and display ingredients
  const filteredIngredients = ingredients
    .filter(ingredient =>
      ingredient.Name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortByType) {
        return a.Type.localeCompare(b.Type);
      } else if (sortOrder === 'asc') {
        return a.Name.localeCompare(b.Name);
      } else if (sortOrder === 'desc') {
        return b.Name.localeCompare(a.Name);
      }
      return 0;
    });

  // Handle finding recipes
  const findRecipes = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/recipes', {
        ingredients: selectedIngredients.map(ingredient => ingredient.Name)
      });
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  // Handle page navigation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredIngredients.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredIngredients.length / itemsPerPage);

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container">
      <h1>Recipe by Ingredient Tool</h1>
      <button className="button" onClick={findRecipes}>
        Find Recipes With My Ingredients!
      </button>

      <div className="options">
        <button className="optionButton" onClick={sortIngredientsByType}>
          Sort By Type {sortByType ? '✔️' : ''}
        </button>
        <button className="optionButton" onClick={sortAlphabetically}>
          Sort Alphabetically {sortOrder === 'asc' ? '↑' : sortOrder === 'desc' ? '↓' : ''}
        </button>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search ingredients..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="searchBar"
      />

      <div className="selectedIngredients">
        <h3>Selected Ingredients:</h3>
        {selectedIngredients.length > 0 ? (
          <div className="ingredientsGrid">
            {selectedIngredients.map((ingredient, idx) => (
              <div
                key={idx} 
                onClick={() => handleIngredientClick(ingredient)} // Toggle selection on click
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

      {recipes.length > 0 && (
        <div className="recipesList">
          <h2>Possible Recipes</h2>
          <div className="recipesGrid">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="recipeItem">
                <img src={`/images/recipes/${recipe.imagePath}`} alt={recipe.Name} className="recipeImage" />
                <p>{recipe.Name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

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