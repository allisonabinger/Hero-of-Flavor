const { dbClient } = require('../utils/db');

class AppController {
    // Gets the connection status to MongoDB
    static async getStatus(req, res) {
        try {
            const dbAlive = await dbClient.isAlive();
            res.status(200).json({ db: dbAlive });
        } catch (err) {
            console.error('Error checking DB status: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    // Gets the amount of paintings in the database
    static async getStats(req, res) {
        try {
            const ingCount = await dbClient.nbDocs('ingredients');
            const recCount = await dbClient.nbDocs('recipes')
            res.status(200).json({ ingredients: ingCount, recipes: recCount });
        } catch (err) {
            console.error('Error getting collection stats: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = AppController;
