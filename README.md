# Hero_of_Flavor
Atlas Custom API project
# Introduction

The Hero of Flavor is a recipe generation tool based off of the cooking mechanic in [Nintendo's The Legend of Zelda: Tears of the Kingdom](https://www.nintendo.com/us/store/products/the-legend-of-zelda-tears-of-the-kingdom-switch/?srsltid=AfmBOookNg1sT42iaZFTPCUUOg-OykaRwJuAg09-jXBZnTWCgP2YFwPF). This tool is designed to allow users to select the ingredients they have in their in-game inventory, then populate recipes that they have enough ingredients to make. 

The program features a React UI front-end, as well as a RESTful API for the backend and data collection. 

# Usage
This web application is currently not hosted on any domain. Cloning the repo would require direct connection to our MongoDB cluster. This program can only run on our local machines at this time. One our server is hosted elsewhere, the web application will be usable from anywhere.


The following is an explanation of how to run this program on our local machines.

Navigate to the server/ directory and execute the following command:

```
$ npm run start-server
> hero-of-flavor@1.0.0 start-server
> NODE_NO_WARNINGS=1 nodemon --exec babel-node --presets @babel/preset-env ./server.js

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env ./server.js`
Server is running on port 5000
Connected to MongoDB Atlas

```

Next, open another terminal. Navigate to the client/hero-of-flavor directory and execute the following command:

```
$ npm start
```

The application will automatically open up your browser and start the React App.

# Functionality

The API runs with an express app that listens on port 5000. The controllers will complete functions with the request from the client and respond with the accurate information. 

The API will establish a connection to our MongoDB cluster upon initializion.

At this time, the Recipes by Ingredient Tool is fully functional. The 'All Recipes' Page is under construction.

# Data Structure

Each entry in the database was written by the developers based on community documents and game play. There are currently three collections in the database:


**Ingredients**
```

    _id: (String) Unique Object ID assigned by DB
    id: (number) Unique ID assigned by devs for local mangagement
    Name: (String) The name of the ingredient
    Type: (String) The type of ingredient, e.g. Fruit, Mushroom
    Effect: (String) Buff given to the recipe if ingredient used --UNUSED--
    sellPrice: (String) Sell price of ingredient in Rupees --UNUSED--
    buyPrice: (Number) Buy price of ingredient in Rupees --UNUSED--
    Location: (String)Where to find the ingredient --UNUSED--
    imagePath: (String) Path to the ingredient's image to be used in client
```

**Recipes**
Collection of recipes that will be queried with MongoDB logic
```
    _id: (String) Unique Object ID assigned by DB
    id: (number) Unique ID assigned by devs for local mangagement
    Name: (String) The name of the recipe
    imagePath: (String) Path to the recipes's image to be used in client
    Ingredients: (Array) Ingredients necessary for the recipe. 
        object
            options: (Array) List of ingredients that can be used for that ingredient slot.
```

**Cookbook**
Collection of recipes in readable format for display only
```
    _id: (String) Unique Object ID assigned by DB
    id: (number) Unique ID assigned by devs for local mangagement
    Name: (String) The name of the recipe
    imagePath: (String) Path to the recipes's image to be used in client
    Ingredients: (Array) Ingredients necessary for the recipe. 
        object
            options: (Array) List of ingredients that can be used for that ingredient slot.
```

# API Documentation

After the API server is running, navigate to the /api-docs endpoint for a Swagger UI API Documentation with examples and tests of each endpoint.

#### Please let me know of any additional features or bugs that should be brought to my attention!

---
This README was made with :heart: by Allison Binger, student at Atlas School Tulsa. Find me on [GitHub](https://github.com/allisonabinger) or [LinkedIn](https://linkedin.com/in/allisonbinger)! :smile_cat:
