// Router: Routes the endpoints to use the appropriate Controller method

const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');
const QueryController = require('../controllers/QueryController');
const { Query } = require('mongodb/lib/core');

// swagger components

/**
 * @swagger
 * components:
 *   schemas:
 *     ingredients:
 *       type: object
 *       description: A singular material that can be used to make a meal or elixir.
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the ingredient assigned by MongoDB
 *         id:
 *           type: integer
 *           description: Unique identifier for the ingredient used by Devs
 *           example: 51
 *         Name:
 *           type: string
 *           description: Name of the ingredient
 *           example: "Raw Bird Thigh"
 *         Type:
 *           type: string
 *           description: Type of ingredient
 *           example: "Fruit"
 *         Effect:
 *           type: string
 *           description: Effect of the ingredient, if any
 *           example: "Cold Resistance"
 *         Prefix:
 *           type: string
 *           description: Prefix for the ingredient, if any, added to beginning of recipe name if effect exists
 *           example: "Chilly"
 *         sellPrice:
 *           type: integer
 *           description: Selling price of the ingredient in Rupees
 *           example: 15
 *         buyPrice:
 *           type: integer
 *           description: Buying price of the ingredient in Rupees
 *           example: 60
 *         locations:
 *           type: array
 *           description: Locations where the ingredient, critter, or monster can be found
 *           items:
 *             type: string
 *           example: ["North Hyrule", "Woodland Stable"]
 *         imagePath:
 *           type: string
 *           description: URL to the ingredient's image
 *           example: "Raw_Bird_Thigh.png"
 *     recipes:
 *       type: object
 *       description: A meal or elixir made with 1-5 ingredients.
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the recipe assigned by MongoDB
 *         id:
 *           type: integer
 *           description: Unique identifier for the recipe used by Devs
 *           example: 87
 *         Name:
 *           type: string
 *           description: Name of the recipe
 *           example: "Gourmet Poultry Pilaf"
 *         ingredients:
 *           type: array
 *           description: List of ingredients required for the recipe, maximum of 5 and minimum of 1
 *           items:
 *             type: object
 *             properties:
 *               options:
 *                 type: array
 *                 description: Options for each ingredient
 *                 items:
 *                   type: string
 *                   example: ["Raw Whole Bird", "Hylian Rice", "Bird Egg", "Goat Butter"]
 *         imagePath:
 *           type: string
 *           description: Path to the recipe's image
 *           example: "gourmet-poultry-pilaf.png"
 *     cookbook:
 *       type: object
 *       description: Simplified version of recipes with a more readable format.
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the cookbook entry assigned by MongoDB
 *         id:
 *           type: integer
 *           description: Unique identifier for the cookbook entry used by Devs
 *           example: 2
 *         Name:
 *           type: string
 *           description: Name of recipe
 *           example: "Meat and Mushroom Skewer"
 *         Category:
 *           type: array
 *           description: Categories that the recipe falls under
 *           items:
 *             type: string
 *           example: ["Veggie", "Meat"]
 *         Ingredients:
 *           type: array
 *           description: List of ingredient types required for the recipe
 *           items:
 *             type: array
 *             items:
 *               type: string
 *           example: [["Any Mushroom"], ["Any Meat"]]
 */

/**
 * @swagger
 * /status:
 *   get:
 *     summary: Get the status of the application
 *     operationId: getStatus
 *     tags:
 *     - Application Checks
 *     responses:
 *       '200':
 *         description: Application status complete
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: returns {"db":bool}
 *       '500':
 *         description: Error getting application status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Internal Server Error
 */




router.get('/status', AppController.getStatus);

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Get the number of ingredients and recipes in the database
 *     operationId: getStatus
 *     tags:
 *     - Application Checks
 *     responses:
 *       '200':
 *         description: Application status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: returns {"db":bool}
 */
router.get('/stats', AppController.getStats);


/**
 * @swagger
 * /api/recipes:
 *     post:
 *       summary: Get recipes based on the provided ingredients
 *       operationId: getRecipes
 *       tags:
 *       - Find Recipes Prepareable by Ingredients
 *       requestBody:
 *         description: List of ingredients to find recipes, stored in an array called 'ingredients'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Hylian Shroom", "Raw Meat", "Goat Butter"]
 *         required: true
 *       responses:
 *         '200':
 *           description: List of recipes that the user has enough ingredients to make
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/recipes'
 */
router.post('/api/recipes', QueryController.getRecipes);

/**
 * @swagger
 * /api/ingredients:
 *     get:
 *       summary: Gets all ingredients
 *       operationId: getIngredients
 *       tags:
 *       - View, Sort, and Filter
 *       parameters:
 *         - name: sortBy
 *           in: query
 *           description: Criteria to sort the ingredients by
 *           required: false
 *           schema:
 *             type: string
 *             example: "Name"
 *       responses:
 *         '200':
 *           description: List of all ingredients
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/ingredients'
 */
router.get('/api/ingredients', QueryController.getIngredients);

/**
 * @swagger
 * /api/recipes:
 *     get:
 *       summary: Get all recipes
 *       operationId: getAllRecipes
 *       tags:
 *       - View, Sort, and Filter
 *       parameters:
 *         - name: filter
 *           in: query
 *           description: Criteria to sort the ingredients by
 *           required: false
 *           schema:
 *             type: string
 *             example: "Dessert"
 *       responses:
 *         '200':
 *           description: List of all recipes, in simplified format
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/cookbook'
 */
router.get('/api/recipes', QueryController.getAllRecipes);

module.exports = router;
