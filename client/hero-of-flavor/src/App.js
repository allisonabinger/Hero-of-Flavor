import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Search from './pages/Search'; // Assuming your Search component is in the same directory as App.js
import Recipes from './pages/Recipes'; // Assuming your Recipes component is in the same directory as App.js
import Navbar from './components/Navbar'; // Importing Navbar from the components folder

const App = () => {
  return (
    <Router>
      {/* Include Navbar so it appears on every page */}
      <Navbar />
      <Routes>
        {/* Set Search as the new Home */}
        <Route path="/" element={<Search />} />
        {/* Other routes */}
        <Route path="/recipes" element={<Recipes />} />
        {/* Redirect any unknown paths to Search */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;