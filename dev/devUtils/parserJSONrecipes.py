import json

def transform_recipe(recipe):
    # Remove _id field if it exists
    if "_id" in recipe:
        del recipe["_id"]
    
    # Transform ingredients
    for ingredient in recipe["ingredients"]:
        if "options" not in ingredient:
            # Create an options field based on type and name if options don't exist
            if ingredient["type"]:
                ingredient["options"] = [ingredient["type"]]
            if ingredient["name"]:
                ingredient["options"] = [ingredient["name"]]
        
        # Remove type and name fields
        ingredient.pop("type", None)
        ingredient.pop("name", None)
    
    return recipe

def transform_json_file(input_file, output_file):
    with open(input_file, 'r') as file:
        data = json.load(file)
    
    transformed_data = [transform_recipe(recipe) for recipe in data]
    
    with open(output_file, 'w') as file:
        json.dump(transformed_data, file, indent=4)

# Example usage
input_file = 'recipes.json'
output_file = 'output_recipes.json'
transform_json_file(input_file, output_file)
