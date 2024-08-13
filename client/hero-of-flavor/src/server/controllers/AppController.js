const { dbClient } = require('../utils/db');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.cli(),
    transports: [new winston.transports.Console()],
  });

class AppController {
    // Gets the connection status to MongoDB
    
    static async getStatus(req, res) {
        logger.info('API Accessed: Checking Status of Application');

        try {
            const dbAlive = await dbClient.isAlive();
            res.status(200).json({ db: dbAlive });
        } catch (err) {
            logger.error('Error checking DB status: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    // Gets the amount of paintings in the database
    static async getStats(req, res) {
        logger.info('API Accessed: Counting number of ingredients and recipes.');

        try {
            const ingCount = await dbClient.nbDocs('ingredients');
            const recCount = await dbClient.nbDocs('recipes')
            res.status(200).json({ ingredients: ingCount, recipes: recCount });
        } catch (err) {
            logger.error('Error getting collection stats: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = AppController;
