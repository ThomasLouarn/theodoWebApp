import React from 'react';

import RecipeCard from './RecipeCard';

interface RecipesListProps {
  recipes: RecipeType[];
}

function RecipesList({ recipes }: RecipesListProps) {
  return (
    <div className="container text-center">
      <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </div>
  );
}

export default RecipesList;
