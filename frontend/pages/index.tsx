'use client';

import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
interface Recipe {
  idMeal: string;
  strMeal: string;
  strArea: string;
  strCategory: string;
  strMealThumb: string;
  strInstructions: string;
  strYoutube?: string;
}

export default function RecipeListPage() {
  const API_PORT = process.env.NEXT_PUBLIC_API_PORT || "4000";
  const API_BASE_URL = `http://localhost:${API_PORT}`;
  const [recipies, setRecipies] = useState<Recipe[]>([]);
  const [filter, setFilter] = useState('country');
  const [query, setQuery] = useState('');
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      const { filter, query } = router.query;
      if (filter && query && typeof filter === 'string' && typeof query === 'string') {
        setFilter(filter);
        setQuery(query);
        fetchRecipies(filter, query);
      } else {
        fetchRecipies();
      }
    }
  }, [router.isReady]);

  const fetchRecipies = async (filterKey?: string, queryValue?: string) => {
    let url = `${API_BASE_URL}/recipe/list`;

    if (filterKey && queryValue) {
      const queryParam = new URLSearchParams({ [filterKey]: queryValue });
      url += `?${queryParam.toString()}`;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      
      setRecipies(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchRecipies(filter, query);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
    <h1 className="text-3xl font-extrabol text-gray-400 mb-4">
      Find Recipes, by country, ingredients or categories
    </h1>
    <form onSubmit={handleSubmit} className="mb-6 flex space-x-4">
      <div className="w-1/3">
        <label className="block mb-1">Filter Type</label>
        <select
          id="filter"
          name="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-2 py-1 w-full"
        >
          <option value="country">country</option>
          <option value="ingredient">ingredient</option>
          <option value="category">category</option>
        </select>
      </div>
      <div className="w-1/3">
        <label className="block mb-1">Query</label>
        <input
          type="text"
          id="query"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-2 py-1 w-full"
        />
      </div>
      <div className="w-1/3 flex items-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Apply Filter
        </button>
      </div>
    </form>
    <h1 className="text-2xl font-semibold text-gray-400 mb-4">{query} Recipies</h1>
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recipies.map((recipe: Recipe) => (
        <li
          key={recipe.idMeal}
          className="p-4 border rounded cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => router.push(`/info?idMeal=${recipe.idMeal}`)}
        >
          <h2 className="text-xl font-bold">{recipe.strMeal}</h2>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-auto rounded mt-2 object-cover"
          />
        </li>
      ))}
    </ul>
    </div>
  );
}
