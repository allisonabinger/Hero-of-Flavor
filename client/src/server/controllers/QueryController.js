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

    static async getIngredients(req, res) {
        try {
            // Fetch ingredients from the database
            const ingredients = await dbClient.findIngredients();
            
            // Define the base path for images
            const basePath = '../Hero_of_Flavor/client/src/images/ingredients/';
            
            // Map through the ingredients and modify the imagePath
            const modifiedIngredients = ingredients.map(ingredient => ({
                name: ingredient.name,
                imagePath: basePath + ingredient.imagePath,
                type: ingredient.Type
            }));
            
            // Send the modified ingredients in the response
            return res.status(200).json(modifiedIngredients);

        } catch (err) {
            console.error('Error fetching ingredients: ', err);
            return res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = QueryController;
