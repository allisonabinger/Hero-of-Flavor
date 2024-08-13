const { dbClient } = require('../utils/db.js');

class QueryController {
    // contains Query controller to handle responses and requests to the API
    static async getRecipes(req, res) {
        // sneds quests to DB to get recipes
        const userIngredients = req.body.ingredients;
        if (!userIngredients) {
            return res.status(400).send('Invalid ingredients list');
        }
        try {
            const result = await dbClient.findRecipesByIngredients(userIngredients);

            const response = result.map(recipe => ({
                Name: recipe.Name,
                imagePath: recipe.imagePath
                })); 

            return res.status(200).json(response);

        } catch (err) {
            console.error('Error fetching recipes: ', err);
            return res.status(500).send('Internal Server Error')
        }
    }

    static async getIngredients(req, res) {
        const { sortBy } = req.query;
        try {
            // Fetch ingredients from the database
            const ingredients = await dbClient.findIngredients(sortBy);
            
            // Define the base path for images
            const basePath = '../Hero_of_Flavor/client/src/images/ingredients/';
            
            // Map through the ingredients and modify the imagePath
            const modifiedIngredients = ingredients.map(ingredient => ({
                Name: ingredient.Name,
                imagePath: basePath + ingredient.imagePath,
                Type: ingredient.Type
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
