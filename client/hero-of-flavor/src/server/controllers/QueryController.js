const { dbClient } = require('../utils/db');

class QueryController {
    // Searches by Month
    static async getRecipes(req, res) {
        const { selectedIngredients } = req.body;
        try {
            
        } catch (err) {
            console.error('Error fetching recipes: ', err);
            res.status(500).send('Internal Server Error')
        }
    }
}

module.exports = QueryController;
