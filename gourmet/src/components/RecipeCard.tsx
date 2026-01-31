import { Link } from 'react-router-dom';

import './RecipeCard.css';

interface RecipeCardProps {
  recipe: RecipeType;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="col d-flex">
      <div className="card  w-100">
        {/* Image */}
        <Link to={`/recettes/${recipe.id}`}>
          <img
            src={recipe.image_url}
            className="card-img-top"
            alt={recipe.name}
          />
        </Link>

        {/* Title and descrption */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{recipe.name}</h5>
          <p className="card-text">{recipe.description}</p>

          {/* Link to the recipe */}
          <Link
            to={`/recettes/${recipe.id}`}
            className="btn btn-primary mt-auto cuisiner-button"
          >
            Cuisiner !
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
