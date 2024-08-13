const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const { createTestScheduler } = require('jest');
const { options } = require('../routes');

dotenv.config();

const dbUser = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
const dbName = process.env.DB_DATABASE
const dbHost = process.env.DB_HOST;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.connection = this.client.connect().then(() => {
      console.log('Connected to MongoDB Atlas');
      return this.client.db(dbName);
    }).catch(err => {
      console.error('Error connecting to MongoDB Atlas:', err);
      process.exit(1); // Exit process on connection failure
    });
  }

  // connection status of MongoDB
  isAlive() {
    return this.client && this.client.isConnected();
  }


  // counts the number of files inside of the files collection 'files'
  async nbDocs(col) {
    try {
      const db = await this.connection;
      const collection = db.collection(col);
      const count = await collection.countDocuments({});
      return count;
    } catch (error) {
      console.error('Error counting paintings:', error);
      return 0;
    }
  }

// contains Query controller to handle responses and requests to the API
    async findRecipesByIngredients(userIngredients) {
        try {
            const db = await this.connection;
            const collection = db.collection('recipes');

            // Find recipes that match any of the user ingredients
            const recipes = await collection.find({
                ingredients: {
                    $elemMatch: {
                        options: { $in: userIngredients }
                    }
                }
            }).toArray();

            // Filter recipes to ensure all required ingredients are present
            const result = recipes.filter(recipe => {
                return recipe.ingredients.every(ingredientList => {
                    return ingredientList.options.some(option => userIngredients.includes(option));
                });
            });

            // Return the filtered recipes
            return result;

        } catch (error) {
            console.error('Error fetching recipes:', error);
            throw error;
        }
    }

    async findIngredients(sortBy) {
        try {
            const db = await this.connection;
            const collection = db.collection('ingredients');

            const sortOptions = { id: 1 }
            if (sortBy) {
                sortOptions.type = sortBy === 'asc' ? 1 : -1;
            }

            return collection.find({}).sort(sortOptions).toArray();
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            throw error;
        }
    }

    async getAllRecipes(sortBy) {
        try {
            const db = await this.connection;
            const collection = db.collection('recipes');
    
            // If a sortBy parameter is provided, filter by that category
            const query = sortBy ? { Category: sortBy } : {};
            
            const recipes = await collection.find(query).toArray();
            return recipes;
        } catch (error) {
            console.error('Error fetching all recipes:', error);
            throw error;
        }
    }
}

const dbClient = new DBClient();
module.exports = { dbClient };
