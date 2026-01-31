import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipePage from '../components/RecipePage';

function Recette() {
  const params = useParams();

  const [isLoaded, setIsLoaded] = useState(false);
  const [recipe, setRecipe] = useState<RecipeType>({} as RecipeType);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_ROUTE}/recipes/${params.recetteId}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
        setIsLoaded(true);
      });
  }, []);

  return (
    <>
      {isLoaded ? (
        <div className="container-fluid pt-5">
          <RecipePage recipe={recipe} />
        </div>
      ) : (
        <div className="container pt-5">
          <div className="alert alert-primary">'Loading...'</div>
        </div>
      )}
    </>
  );
}

export default Recette;
