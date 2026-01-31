import { useState, useEffect } from 'react';

import RecipesList from '../components/RecipesList';

import './HomePage.css';

function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipes, setRecipes] = useState<RecipeType[]>([] as RecipeType[]);

  // Load the recipes from the API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_ROUTE}/recipes`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        setIsLoaded(true);
      });
  }, []);

  return (
    <>
      {isLoaded ? (
        <div className="container pt-5">
          {/* Header with given image */}
          <div className="row mb-3 img-holder">
            <img
              className="gourmet-img"
              src="./src/assets/cuisine.jpeg"
              alt="Welcome to Tau Gourmet!"
            />
            <h1 className="welcome-title">Bienvenue sur Tau Gourmet !</h1>
          </div>

          {/* List of recipes */}
          <RecipesList recipes={recipes} />
        </div>
      ) : (
        // Else loading alert
        <div className="container pt-5">
          <div className="alert alert-primary">'Loading...'</div>
        </div>
      )}
    </>
  );
}

export default HomePage;
