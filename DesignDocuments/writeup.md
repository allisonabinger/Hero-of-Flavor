# Hero of Flavor Planning Document

## Intro
The following document contains our write ups, plans, and strategies we plan on using in our project. This information was orginally housed in a GoogleDoc that we both contributed to. 

## Current Implementation
For our current implementation and documentation, please view the README.md at the root of our directory. API documentation was build with Swagger.js and can be viewed at the `/api-docs` endpoint

## Program Planning

### MVP (Minimum Viable Product)
A Web Application that allows users to find recipes based on the ingredients they have in their inventory. A recipe will only populate if the user all of the ingredients required to make it.

### Thought Process and our 'Why'

Based on The Legend of Zelda: Tears of the Kingdom’s  in-game cooking feature, which features over 200 recipes and even more ingredients and materials to cook with.

The game allows you to save and view the recipes you have already made, but does not provide instructions on meals and elixirs you haven’t made before.

While there are resources available online in the community for how to make these recipes, sometimes you want to utilize what you have in your inventory or quickly see what you’re missing.

Hero of Flavor allows you to efficiently prepare your meals based on the special effects/buffs you’re after and still utilize the ingredients in your inventory. 


### Features
Users will be able to upload their ingredients in their inventory to the site and view the recipes that they have all the materials for, and even view recipes that need just a couple of ingredients. They can sort the recipes by hearts recovered or effects given.

Users can also view all recipes and see the ingredients needed for the recipe. They can sort the recipes by hearts recovered or effects given. 

*Proposed Features*
Players can build a custom ‘Shopping List’ for nearby villages and stables to gather ingredients in a more efficient manner.


Players can reference a Monster Part guide that will show them the monster parts dropped by specific monsters and where to find them.


## Back-End Planning

The data will be stored in a MongoDB database for easy querying and custom data structure.
The data will be used to build a custom API that our front-end will access
The database will hold the following collections of data

## Tools and Frameworks

The API will be built using express.js as our server, and we will use JS to build our endpoints
Our data will be stored in MongoDB and be accessed by our API

### Version 0 (Unused, Initial Ideas)

The database will hold the following collections of data

**Ingredients**
Collection of ingredients and materials
```
    Unique ID:  A number, assigned by DB or developers
    Name: The name of the ingredient
    Type: The type of ingredient, e.g. Fruit, Mushroom
    Effect: Buff given to the recipe if ingredient used
    Sell Price: Sell price of ingredient in Rupees
    Buy Price: Buy price of ingredient in Rupees
    Location: Where to find the ingredient
```

**Recipes**
Collection of recipes
```
    Unique ID:  A number, assigned by DB or developers
    Name: The name of the recipe
    BaseHearts: The minimum number of hearts recovered by the recipe
    Effect: Buff given by the recipe to the player
    Ingredients: Ingredients necessary for the recipe. 
```

**Shopping**
(Proposed feature, build a shopping list based on ingredients needed)
Collection of ingredients available for purchase at shops and stables
```
    Name: The name of the ingredient
    Location: Stable, Shop, or Vendor
    Unit Price: Sell price of unit sold in Rupees
    Max Quantity: The maximum amonut of the ingredient you can purchase
```

**Monster Parts**
Collection of monsters and their location for monster hunting
```
    Name: Name of the monster
    Parts: The possible drops of the monster
    Location: Common or known locations of the monster
```
