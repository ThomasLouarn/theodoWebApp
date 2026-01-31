import { useEffect, useContext } from 'react';

import { AuthContext } from '../pages/Navbar';

import './RecipePage.css';

interface RecipePageProps {
  recipe: RecipeType;
  isFav: boolean;
  setIsFav: any;
}

function RecipePage({ recipe, isFav, setIsFav }: RecipePageProps) {
  let isAuth = useContext(AuthContext);

  // if logged in, check if the recipe is favorite
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
            // get favorites
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
                // check if recipe is in the array
                let isRecipeFav = false;
                for (const r of data2) {
                  if (r.recipe.id === recipe.id) {
                    isRecipeFav = true;
                  }
                  if (isRecipeFav) {
                    setIsFav(true);
                  }
                }
              });
          }
        });
    }
  }, [isAuth, isFav]);

  // add a recipe to favorites
  const handleAddFavorite = () => {
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
            `${import.meta.env.VITE_API_ROUTE}/users/${data.username}/favorites?recipeID=${recipe.id}`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
            .then((response2) => response2.json())
            .then((data2) => {
              if (data2.recipe_id) {
                setIsFav(true);
              }
            });
        }
      });
  };

  // delete a recipe from favorites
  const handleRemoveFavorite = () => {
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
            `${import.meta.env.VITE_API_ROUTE}/users/${data.username}/favorites?recipeID=${recipe.id}`,
            {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          ).then(setIsFav(false));
        }
      });
  };

  return (
    <div className="row">
      {/* Empty column for spacing */}
      <div className="col-md-1"></div>

      {/* Column for the image */}
      <div className="col-md-3">
        <div className="row mb-3">
          <img
            src={recipe.image_url}
            className="img-recipe"
            alt={recipe.name}
          />
        </div>
      </div>

      {/* Column with all the data */}
      <div className="col-md-7 right-col">
        {/* Name and fav button */}
        <div className="d-flex align-items-center gap-3">
          <h1 className="mb-1 recipe-name">{recipe.name}</h1>
          {isAuth && isFav && (
            <img
              className="fav-icon"
              src={'/assets/fav-icon-full.svg'}
              alt="fav-icon"
              onClick={isFav ? handleRemoveFavorite : handleAddFavorite}
            />
          )}
          {isAuth && !isFav && (
            <img
              className="fav-icon"
              src={'/assets/fav-icon-empty.svg'}
              alt="fav-icon"
              onClick={isFav ? handleRemoveFavorite : handleAddFavorite}
            />
          )}
        </div>

        {/* Description, creator and disclaimer */}
        <h3 className="mb-0">{recipe.description}</h3>
        <div className="mb-4 created-by">proposée par {recipe.created_by}</div>

        {recipe.disclaimer && <div>Attention : {recipe.disclaimer}</div>}

        <div className="row">
          {/* Numeric data */}
          <div className="col-md-3">
            <ul className="list-unstyled">
              <li>
                <strong>Quand manger :</strong> {recipe.when_to_eat}
              </li>
              <li>
                <strong>Coût :</strong> {recipe.cost} €
              </li>
              <li>
                <strong>Préparation :</strong> {recipe.prep_time} min
              </li>
              <li>
                <strong>Cuisson :</strong> {recipe.cook_time} min
              </li>
              <li>
                <strong>Calories :</strong> {recipe.calories} kcal
              </li>
              <li>
                <strong>Portions :</strong> {recipe.servings} personnes
              </li>
            </ul>
          </div>

          {/* Instructions */}
          <div className="col">
            <h4 className="instruction-title">Instructions</h4>
            <p style={{ whiteSpace: 'pre-line' }}>{recipe.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipePage;
