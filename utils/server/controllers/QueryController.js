const { dbClient } = require('../utils/db');

class QueryController {
    // contains Query controller to handle responses and requests to the API
    static async getRecipes(req, res) {
        // sneds quests to DB to get recipes
        const { selectedIngredients } = req.body;
        if (!selectedIngredients || !Array.isArray(selectedIngredients)) {
            res.status(400).send('Invalid ingredients list');
            throw new err;
        }
        try {
            const recipes = await dbClient.findRecipesByIngredients(selectedIngredients);
            res.status(200).send(JSON.stringify(recipes, null, 2) + '\n');
            // res.status(200).json(recipes);

        } catch (err) {
            console.error('Error fetching recipes: ', err);
            res.status(500).send('Internal Server Error')
        }
    }
}

module.exports = QueryController;
