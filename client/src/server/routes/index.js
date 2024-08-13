// Router: Routes the endpoints to use the appropriate Controller method

const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');
const QueryController = require('../controllers/QueryController')

// DB 
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

router.post('/api/recipes', QueryController.getRecipes);

router.get('/api/ingredients', QueryController.getIngredients);

module.exports = router;
