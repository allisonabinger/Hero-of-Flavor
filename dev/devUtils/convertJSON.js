const fs = require('fs');

const categories = {
    "Fish": [
        "Hearty Salmon",
        "Hearty Bass",
        "Hyrule Bass",
        "Staminoka Bass",
        "Chillfin Trout",
        "Sizzlefin Trout",
        "Voltfin Trout",
        "Stealthfin Trout",
        "Mighty Carp",
        "Armored Carp",
        "Sanke Carp",
        "Ancient Arowana",
        "Glowing Cave Fish",
        "Mighty Porgy",
        "Armored Porgy",
    ],
    "Fruit": [
        "Golden Apple",
        "Palm Fruit",
        "Apple",
        "Wildberry",
        "Voltfruit",
        "Fleet-Lotus Seeds",
        "Hydromelon",
        "Mighty Bananas",
        "Spicy Pepper",
        "Fire Fruit",
        "Ice Fruit",
        "Shock Fruit",
        "Splash Fruit",
        "Dazzlefruit",
    ],
    "Herb": [
        "Hyrule Herb",
        "Silent Princess",
        "Stambulb",
        "Korok Frond",
        "Cool Safflina",
        "Warm Safflina",
        "Mighty Thistle",
        "Armoranth",
        "Blue Nightshade",
        "Electric Safflina",
        "Swift Violet",
        "Sundelion",
    ],
    "Meat": [
        "Raw Gourmet Meat",
        "Raw Whole Bird",
        "Raw Prime Meat",
        "Raw Bird Thigh",
        "Raw Meat",
        "Raw Bird Drumstick",
    ],
    "Mushroom": [
        "Big Hearty Truffle",
        "Hearty Truffle",
        "Endura Shroom",
        "Rushroom",
        "Brightcap",
        "Stamella Shroom",
        "Chillshroom",
        "Sunshroom",
        "Hylian Shroom",
        "Zapshroom",
        "Silent Shroom",
        "Razorshroom",
        "Ironshroom",
        "Skyshroom",
    ],
    "Nut": [
        "Acorn",
        "Chickaloo Tree Nut",
    ],
    "Shelled": [
        "Sneaky River Snail",
        "Razorclaw Crab",
        "Ironshell Crab",
        "Bright-Eyed Crab",
    ],
    "Special": [
        "Hylian Rice",
        "Bird Egg",
        "Tabantha Wheat",
        "Hateno Cheese",
        "Fresh Milk",
        "Cane Sugar",
        "Goron Spice",
        "Goat Butter",
        "Monster Extract",
        "Oil Jar",
        "Dark Clump",
        "Rock Salt",
        "Star Fragment",
        "Fairy",
        "Courser Bee Honey",
    ],
    "Vegetable": [
        "Big Hearty Radish",
        "Hearty Radish",
        "Endura Carrot",
        "Hylian Tomato",
        "Fortified Pumpkin",
        "Sun Pumpkin",
        "Swift Carrot",
    ],
    "Monster Part": [
        "Aerocuda Eyeball",
        "Aerocuda Wing",
        "Black Bokoblin Horn",
        "Black Boss Bokoblin Horn",
        "Black Hinox Horn",
        "Black Horriblin Horn",
        "Black Lizalfos Horn",
        "Black Lizalfos Tail",
        "Black Moblin Horn",
        "Blue Bokoblin Horn",
        "Blue Boss Bokoblin Horn",
        "Blue Hinox Horn",
        "Blue Horriblin Horn",
        "Blue Lizalfos Horn",
        "Blue Lizalfos Tail",
        "Blue Moblin Horn",
        "Blue-Maned Lynel Mace Horn",
        "Blue-Maned Lynel Saber Horn",
        "Blue-White Frox Fang",
        "Bokoblin Fang",
        "Bokoblin Guts",
        "Bokoblin Horn",
        "Boss Bokoblin Fang",
        "Boss Bokoblin Guts",
        "Chuchu Jelly",
        "Dinraal's Claw",
        "Dinraal's Horn",
        "Dinraal's Scale",
        "Shard of Dinraal's Fang",
        "Electric Keese Eyeball",
        "Electric Keese Wing",
        "Electric Lizalfos Horn",
        "Electric Lizalfos Tail",
        "Farosh's Claw",
        "Farosh's Scale",
        "Farosh's Horn",
        "Shard of Farosh's Fang",
        "Fire Keese Eyeball",
        "Fire Keese Wing",
        "Fire Like Stone",
        "Fire-Breath Lizalfos Horn",
        "Fire-Breath Lizalfos Tail",
        "Frox Fang",
        "Frox Fingernail",
        "Frox Guts",
        "Gibdo Bone",
        "Gibdo Guts",
        "Gibdo Wing",
        "Gleeok Flame Horn",
        "Gleeok Frost Horn",
        "Gleeok Thunder Horn",
        "Gleeok Guts",
        "Hinox Guts",
        "Hinox Horn",
        "Hinox Toenail",
        "Hinox Tooth",
        "Horriblin Claw",
        "Horriblin Guts",
        "Horriblin Horn",
        "Ice Keese Eyeball",
        "Ice Keese Wing",
        "Ice Like Stone",
        "Ice-Breath Lizalfos Horn",
        "Ice-Breath Lizalfos Tail",
        "Keese Eyeball",
        "Keese Wing",
        "Light Dragon's Horn",
        "Light Dragon's Scale",
        "Light Dragon's Talon",
        "Like Like Stone",
        "Lizalfos Horn",
        "Lizalfos Tail",
        "Lizalfos Talon",
        "Lynel Guts",
        "Lynel Hoof",
        "Lynel Mace Horn",
        "Lynel Saber Horn",
        "Moblin Fang",
        "Moblin Guts",
        "Moblin Horn",
        "Molduga Fin",
        "Molduga Claw",
        "Molduga Guts",
        "Molduga Jaw",
        "Naydra's Claw",
        "Naydra's Scale",
        "Naydra's Horn",
        "Shard of Dinraal's Fang",
        "Obsidian Frox Fang",
        "Octo Balloon",
        "Octorok Eyeball",
        "Octorok Tentacle",
        "Red Chuchu Jelly",
        "Shard of Light Dragon's Fang",
        "Shock Like Stone",
        "Silver Bokoblin Horn",
        "Silver Horriblin Horn",
        "Silver Lizalfos Horn",
        "Silver Lizalfos Tail",
        "Silver Lynel Mace Horn",
        "Silver Lynel Saber Horn",
        "Stalnox Horn",
        "White Chuchu Jelly",
        "White-Maned Lynel Mace Horn",
        "White-Maned Lynel Saber Horn",
        "Yellow Chuchu Jelly",
    ],
};

// function replaceGenericOptions(recipes, categories) {
//     return recipes.map(recipe => {
//         recipe.ingredients = recipe.ingredients.map(ingredient => {
//             // Check if `options` is defined and is an array
//             if (Array.isArray(ingredient.options)) {
//                 console.log(`Processing ingredient options: ${ingredient.options}`); // Debugging line
//                 ingredient.options = ingredient.options.flatMap(option => {
//                     // Check if the option is a category and replace with the list of ingredients
//                     if (categories[option]) {
//                         console.log(`Replacing category '${option}' with ingredients: ${categories[option]}`); // Debugging line
//                         return categories[option];
//                     }
//                     // Return the option as is if it's not a category
//                     return [option];
//                 });
//                 console.log(`Updated ingredient options: ${ingredient.options}`); // Debugging line
//             } else {
//                 console.warn(`Undefined or non-array options for ingredient: ${ingredient}`); // Debugging line
//             }
//             return ingredient;
//         });
//         return recipe;
//     });
// }

// // Read the JSON file
// fs.readFile('recipes.json', 'utf8', (err, data) => {
//     if (err) {
//         console.error("Error reading file:", err);
//         return;
//     }

//     let recipes;

//     try {
//         recipes = JSON.parse(data);
//     } catch (parseErr) {
//         console.error("Error parsing JSON:", parseErr);
//         return;
//     }

//     const newRecipes = replaceGenericOptions(recipes, categories);

//     fs.writeFile('updatedrecipes.json', JSON.stringify(newRecipes, null, 2), 'utf8', (writeErr) => {
//         if (writeErr) {
//             console.error("Error writing file:", writeErr);
//             return;
//         }
//         console.log("File updated successfully!");
//     });
// });
