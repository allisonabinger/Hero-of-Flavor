import React from 'react';
import Header from './components/Header';
import IngredientInput from './components/IngredientInput';
import RecipeGrid from './components/RecipeGrid';

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <IngredientInput />
        <RecipeGrid />
      </main>
    </div>
  );
};

export default App;
