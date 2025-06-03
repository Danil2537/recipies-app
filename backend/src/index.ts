import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello from Express + TypeScript!');
});

app.get('/abailable', (req,res)=>{

});

app.get('/info:recipe', (req,res)=> {

});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});