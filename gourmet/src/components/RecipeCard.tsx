import { Link } from 'react-router-dom';

import './RecipeCard.css';

interface RecipeCardProps {
  recipe: RecipeType;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="col">
      <div className="card">
        {/* Image */}
        <img
          src={recipe.image_url}
          className="card-img-top"
          alt={recipe.name}
        />

        {/* Title, desc and link */}
        <div className="card-body">
          <h5 className="card-title">{recipe.name}</h5>
          <p className="card-text">{recipe.description}</p>
          <Link
            to={`/recettes/${recipe.id}`}
            className="btn btn-primary cuisiner-button"
          >
            Cuisiner !
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
