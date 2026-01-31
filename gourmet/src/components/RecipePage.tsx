import './RecipePage.css';

interface RecipePageProps {
  recipe: RecipeType;
}

function RecipePage({ recipe }: RecipePageProps) {
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
        {/* Name, description and other data*/}
        <h1 className="mb-1 recipe-name">{recipe.name}</h1>
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
