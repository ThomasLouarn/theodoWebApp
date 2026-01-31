import { useState, useEffect, useContext } from 'react';

import RecipesList from '../components/RecipesList';

import { AuthContext } from './Navbar';

function Favorites() {
  let isAuth = useContext(AuthContext);

  const [isLoaded, setIsLoaded] = useState(false);
  const [recipes, setRecipes] = useState<RecipeType[]>([] as RecipeType[]);

  // Load the favorite recipes from the API
  useEffect(() => {
    if (isAuth) {
      const token = localStorage.getItem('authToken');
      fetch(`${import.meta.env.VITE_API_ROUTE}/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.username) {
            fetch(
              `${import.meta.env.VITE_API_ROUTE}/users/${data.username}/favorites`,
              {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            )
              .then((response2) => response2.json())
              .then((data2) => {
                const modifiedData = [];
                for (const r of data2) {
                  modifiedData.push(r.recipe);
                }
                setRecipes(modifiedData);
                setIsLoaded(true);
              });
          }
        });
    }
  }, [isAuth]);

  return (
    <>
      {isAuth ? (
        isLoaded ? (
          <div className="container pt-5">
            <h1 className="row">Mes recettes favorites</h1>
            {/* List of recipes */}
            <RecipesList recipes={recipes} />
          </div>
        ) : (
          // Else loading alert
          <div className="container pt-5">
            <div className="alert alert-primary">'Loading...'</div>
          </div>
        )
      ) : (
        <div className="container pt-5">
          <div className="alert alert-primary">
            Veuillez vous connecter pour accéder à vos favoris.
          </div>
        </div>
      )}
    </>
  );
}

export default Favorites;
