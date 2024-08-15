import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Recipes.css';

const Search = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [sortByType, setSortByType] = useState(false);
  const itemsPerPage = 30;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchRecipes();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle sorting by name
  const sortAlphabetically = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortByType(false);
  };

  const filteredRecipes = recipes
    .filter(recipe =>
      recipe.Name.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Handle page navigation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecipes.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container">
      <h1>All Recipes</h1>
      <div className="options">
        <button className="optionButton" onClick={sortAlphabetically}>
          Sort Alphabetically {sortOrder === 'asc' ? '↑' : sortOrder === 'desc' ? '↓' : ''}
        </button>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="searchBar"
      />

      <div className="recipesGrid">
        {currentItems.map((recipe) => (
          <div
            key={recipe._id} // Assuming MongoDB's ObjectId is used as the unique identifier
            className="ingredientItem"
          >
            <img src={`/images/recipes/${recipe.imagePath}`} alt={recipe.Name} />
            <p>{recipe.Name}</p>
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