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

//   async findPaintings(filter ={}, projection={}, skip = 0, limit = 10, sort = {}) {
//     const db = await this.connection;
//     const collection = db.collection('paintings');
//     try {
//         const results = await collection.find(filter)
//             .project(projection)
//             .skip(skip)
//             .limit(limit)
//             .sort(sort)
//             .toArray();
//         return results;
//     } catch (err) {
//         console.error('Error in findPaintings: ', err);
//         throw err
//     }
//   }
}

const dbClient = new DBClient();
module.exports = { dbClient };
