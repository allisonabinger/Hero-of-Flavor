const { dbClient } = require('../utils/db.js');

class QueryController {
    // contains Query controller to handle responses and requests to the API
    static async getRecipes(req, res) {
        // sneds quests to DB to get recipes
        const { selectedIngredients } = req.body;
        if (!selectedIngredients) {
            return res.status(400).send('Invalid ingredients list');
        }
        try {
            const recipes = await dbClient.findRecipesByIngredients(selectedIngredients);
            return res.status(200).json(recipes);

        } catch (err) {
            console.error('Error fetching recipes: ', err);
            return res.status(500).send('Internal Server Error')
        }
    }
}

module.exports = QueryController;
