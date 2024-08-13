const { dbClient } = require('../utils/db.js');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.cli(),
    transports: [new winston.transports.Console()],
  });

class QueryController {
    // contains Query controller to handle responses and requests to the API
    static async getRecipes(req, res) {
        // POST request to gather recipes based off user ingredients passed in body
        // Accesses recipes collection
        logger.info('API Accessed: Attempting to find recipes with ingredients...');


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
            logger.error('Error fetching recipes: ', err);
            return res.status(500).send('Internal Server Error')
        }
    }

    static async getAllRecipes(req, res) {
        // gets all recipes in 'cookbook' collection

        logger.info('API Accessed: Gathering all recipes in our Hylian cookbook...');
        try {
            const filter = req.query.filter;
            const recipes = await dbClient.getAllRecipes(filter);

            const response = recipes.map(recipe => ({
                Name: recipe.Name,
                imagePath: recipe.imagePath,
                Category: recipe.Category,
                Ingredients: recipe.Ingredients
                }));
            return res.status(200).json(response);
        } catch (err) {
            logger.error('Error fetching all recipes: ', err);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async getIngredients(req, res) {
        // gets all ingredients for user to select
        logger.info('API Accessed: Gathering all Ingredients and Materials');

        const sortBy = req.query.sortBy;
        try {
            // Fetch ingredients from the database
            const ingredients = await dbClient.findIngredients(sortBy);

            // Define the base path for images
            // const basePath = '../Hero_of_Flavor/client/src/images/ingredients/';

            // Map through the ingredients and modify the imagePath
            const modifiedIngredients = ingredients.map(ingredient => ({
                Name: ingredient.Name,
                imagePath: ingredient.imagePath,
                Type: ingredient.Type
            }));

            // Send the modified ingredients in the response
            return res.status(200).json(modifiedIngredients);

        } catch (err) {
            logger.error('Error fetching ingredients: ', err);
            return res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = QueryController;
