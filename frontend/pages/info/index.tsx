import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Recipe {
  idMeal?: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strCategory: string;
  strInstructions: string;
  [key: string]: string | undefined;
}

export default function Info() {
  const router = useRouter();
  const { idMeal } = router.query;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [categoryRecipes, setCategoryRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (idMeal) {
      fetchRecipe(idMeal as string);
    }
  }, [idMeal]);

  const fetchRecipe = async (idMeal: string) => {
    try {
      const url = `http://localhost:4000/recipe/info/${idMeal}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setRecipe(data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  const fetchCategoryRecipes = async (category: string) => {
    try {
      const queryParam = new URLSearchParams({ category });
      const url = `http://localhost:4000/recipe/list?${queryParam.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setCategoryRecipes(data);
    } catch (error) {
      console.error("Error fetching category recipes:", error);
      setCategoryRecipes([]);
    }
  };

  useEffect(() => {
    if (recipe?.strCategory) {
      fetchCategoryRecipes(recipe.strCategory);
    }
  }, [recipe?.strCategory]);

  const extractIngredients = (recipe: Recipe) => {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(ingredient);
      }
    }
    return ingredients;
  };

  if (!recipe) {
    return <div className="p-6 text-center text-lg">Loading recipe...</div>;
  }

  const ingredients = extractIngredients(recipe);

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
      <main className="flex-1 flex flex-col">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full max-w-sm rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex flex-col justify-center flex-grow text-left md:text-center">
            <h1 className="text-4xl font-extrabold mb-2">{recipe.strMeal}</h1>
            <Link
              href={{
                pathname: "/",
                query: { filter: "country", query: recipe.strArea },
              }}
              className="text-sky-500 hover:underline text-lg"
            >
              {recipe.strArea}
            </Link>
          </div>
        </div>

        <section className="mt-8 max-w-3xl text-left">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
            Instructions
          </h2>
          <p className="whitespace-pre-line leading-relaxed">{recipe.strInstructions}</p>
        </section>

        <section className="mt-10 max-w-3xl text-left justify-start">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
            Ingredients
          </h2>
          <ul className="flex flex-wrap gap-4">
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                <Link
                  href={{
                    pathname: "/",
                    query: { filter: "ingredient", query: ingredient },
                  }}
                  className="text-sky-500 hover:underline"
                >
                  {ingredient}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

    <aside className="md:w-80 border-l border-gray-300 pl-2">
      <h2 className="text-xl font-bold mb-4">
        <Link
          href={{
            pathname: "/",
            query: { filter: "category", query: recipe.strCategory },
          }}
          className="text-sky-500 hover:underline"
        >
          Recipes in category: {recipe.strCategory}
        </Link>
      </h2>

      {categoryRecipes.length === 0 ? (
        <p className="text-gray-200">No recipes found in this category.</p>
      ) : (
        <ul className="max-h-[80vh] overflow-y-auto space-y-2">
          {categoryRecipes.map((catRecipe) => (
            <li
              key={catRecipe.idMeal}
              className="block p-2 rounded cursor-default text-gray-200"
            >
              {catRecipe.strMeal}
            </li>
          ))}
        </ul>
      )}
    </aside>
    </div>
  );
}
