// utils/db.js

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

module.exports = connectToDatabase; 