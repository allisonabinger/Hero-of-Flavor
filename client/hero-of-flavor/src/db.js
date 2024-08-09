// src/db.js

const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://cmbilbee:qLcUidzR6tg9L1Ro@cluster0.znbtgui.mongodb.net/';

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('your-database-name'); 
    return db;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

async function getIngredients() {
  const db = await connectToDatabase();
  const ingredients = await db.collection('ingredients').find({}).toArray();
  return ingredients;
}

async function getRecipes() {
  const db = await connectToDatabase();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
}

module.exports = { connectToDatabase, getIngredients, getRecipes };