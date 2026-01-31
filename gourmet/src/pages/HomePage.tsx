import { useState, useEffect } from 'react';

import RecipesList from '../components/RecipesList';

function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipes, setRecipes] = useState<RecipeType[]>([] as RecipeType[]);

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
    <div className="container pt-5">
      {isLoaded ? (
        <RecipesList recipes={recipes} />
      ) : (
        <div className="alert alert-primary">'Loading...'</div>
      )}
    </div>
  );
}

export default HomePage;
