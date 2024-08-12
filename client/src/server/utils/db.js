const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const { createTestScheduler } = require('jest');

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
    // async findRecipesByIngredients(selectedIngredients) {
    //     try {
    //         const db = await this.connection;
    //         const collection = db.collection('recipes');

    //         const ingredientNames = selectedIngredients.map(ing => ing.name);
    //         const ingredientTypes = selectedIngredients.map(ing => ing.type);

    //         console.log(ingredientNames);
    //         console.log(ingredientTypes);

    //         {
    //             "$and": [
    //               {
    //                 // Ensuring all name-based ingredients are covered
    //                 "ingredients": {
    //                   "$not": {
    //                     "$elemMatch": {
    //                       "name": { "$ne": null }, // Name-based ingredient
    //                       "name": { "$nin": ["Golden Apple", "Goat Butter", "Hylian Rice"] } // Not in user's ingredients
    //                     }
    //                   }
    //                 }
    //               },
    //               {
    //                 // Ensuring all type-based ingredients are covered
    //                 "ingredients": {
    //                   "$not": {
    //                     "$elemMatch": {
    //                       "type": { "$ne": null }, // Type-based ingredient
    //                       "type": { "$nin": ["Fruit", "Special"] } // Not in user's ingredients
    //                     }
    //                   }
    //                 }
    //               },
    //               {
    //                 // Ensuring all option-based ingredients are covered
    //                 "ingredients": {
    //                   "$not": {
    //                     "$elemMatch": {
    //                       "options": { "$exists": true }, // Options-based ingredient
    //                       "options": { "$nin": ["Golden Apple", "Goat Butter", "Hylian Rice"] } // Not in user's ingredients
    //                     }
    //                   }
    //                 }
    //               }
    //             ]
    //           }

    //         console.log(query)
    //         const recipes = await collection.find(query).toArray();
    //         return recipes;
    //         console.log(recipes);
    //         } catch (err) {
    //         console.error('Error fetching recipes: ', err);
    //         return [];
    //     }
    // }

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
}

const dbClient = new DBClient();
module.exports = { dbClient };
