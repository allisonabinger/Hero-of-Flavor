const fs = require('fs');
const path = require('path');

// Path to your JSON file
const inputFilePath = path.join(__dirname, 'cookbook.json');
const outputFilePath = path.join(__dirname, 'updatedCookbook.json');

// Function to add imagePath attribute
function addImagePath(jsonArray) {
  return jsonArray.map(item => {
    // Generate imagePath by replacing spaces with dashes, converting to lowercase, and adding .png
    const imagePath = item.Name
      .toLowerCase()                    // Convert to lowercase
      .replace(/ /g, '-')               // Replace spaces with dashes
      + '.png';                         // Add .png extension
    // Add imagePath attribute to the object
    return { ...item, imagePath };
  });
}

// Read JSON data from file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    // Parse JSON data
    const jsonArray = JSON.parse(data);

    // Update JSON data with imagePath
    const updatedJsonArray = addImagePath(jsonArray);

    // Write updated JSON data to a new file
    fs.writeFile(outputFilePath, JSON.stringify(updatedJsonArray, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('Updated JSON data saved to', outputFilePath);
    });
  } catch (parseErr) {
    console.error('Error parsing JSON:', parseErr);
  }
});




// Ingredients:

// const fs = require('fs');
// const path = require('path');

// // Path to your JSON file
// const inputFilePath = path.join(__dirname, 'ingredients.json');
// const outputFilePath = path.join(__dirname, 'updatedIngredients.json');

// // Function to add imagePath attribute
// function addImagePath(jsonArray) {
//   return jsonArray.map(item => {
//     // Generate imagePath by replacing spaces with underscores
//     const imagePath = item.Name.replace(/ /g, '_') + '.png';
//     // Add imagePath attribute to the object
//     return { ...item, imagePath };
//   });
// }

// // Read JSON data from file
// fs.readFile(inputFilePath, 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading file:', err);
//     return;
//   }

//   try {
//     // Parse JSON data
//     const jsonArray = JSON.parse(data);

//     // Update JSON data with imagePath
//     const updatedJsonArray = addImagePath(jsonArray);

//     // Write updated JSON data to a new file
//     fs.writeFile(outputFilePath, JSON.stringify(updatedJsonArray, null, 2), 'utf8', (err) => {
//       if (err) {
//         console.error('Error writing file:', err);
//         return;
//       }
//       console.log('Updated JSON data saved to', outputFilePath);
//     });
//   } catch (parseErr) {
//     console.error('Error parsing JSON:', parseErr);
//   }
// });
