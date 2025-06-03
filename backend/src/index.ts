import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));


app.get('/', (req, res) => {
  res.send('Hello from Express + TypeScript!');
});

app.get('/recipe/list', async (req,res)=>{ //example: /available?ingredient=chicken_breast
  
  const {ingredient, country, category} = req.query;
  let mealUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  if(ingredient) {
    console.log(ingredient);
    mealUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  }
  else if(country) {
    console.log(country);
    mealUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`;
  }
  else if (category) {
    console.log(category);
    mealUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  }
  try {
  const response = await fetch(mealUrl);
  if(!response.ok) {res.status(response.status).json({error: "Failed to find specified recipe\n"}); return;}
    const data = await response.json();
    if (!data.meals || data.meals.length === 0) {
      res.status(404).json({ error: 'Recipe not found' }); return;
    }

    //data.meals.forEach((meal: any)=>console.log(meal));
    res.json(data.meals);
    return;
  }
  catch(error) {
    console.log(error);
    res.status(505).json({error: 'Internal server error when querying recipies\n'});
    return;
  }

});

app.get('/recipe/info/:id', async (req,res)=> { //example: /recipe/5432
  const id = req.params.id;
  console.log(id);
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if(!response.ok) {res.status(response.status).json({error: "Failed to find specified recipe\n"}); return;}
    const data = await response.json();
    if (!data.meals || data.meals.length === 0) {
      res.status(404).json({ error: 'Recipe not found' }); return;
    }
    res.json(data.meals[0]);
    return;

  } catch (error) {
    console.log("Error fetching specified recipe: ", error);
    res.status(500).json({ error: 'Internal Server Error when fetching recipe' });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});