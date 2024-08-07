import csv
import json

# IMPORTANT
# Current parser does not take into account recipes that have 'Any' within
# the OPTIONS of ingredients. JSON data was manually fixed.

def parser(csv_file, json_file):
    recipes = []

    with open(csv_file, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            recipe = {
                'id': int(row['ID']),
                'Name': row['Name'],
                'ingredients': []
            }

            for i in range(1, 6):
                ingredient_key = f'Ingredient {i}'
                if row[ingredient_key]:
                    ingredients = row[ingredient_key].split(';')
                    # add options if multiple ingredients can be used
                    if len(ingredients) > 1:
                        recipe['ingredients'].append({
                            'type': None,
                            'name': None,
                            'options': ingredients
                        })
                    else:
                        # adds a unique count for copious recipes
                        ingredient = ingredients[0]
                        if 'Any Four Unique' in ingredient:
                            recipe['ingredients'].append({
                                'type': ingredient.replace('Any Four Unique ', ''),
                                'name': None,
                                'unique_count': 4
                            })
                            # recipes that just need a certain type
                        elif 'Any' in ingredient:
                            recipe['ingredients'].append({
                                'type': ingredient.replace('Any ', ''),
                                'name': None
                            })
                        else:
                            # ingredients by name
                            recipe['ingredients'].append({
                                'type': None,
                                'name': ingredient
                            })

            recipes.append(recipe)

    with open(json_file, 'w') as jsonfile:
        json.dump(recipes, jsonfile, indent=4)


csv_file = 'recipes.csv'
json_file = 'recipes.json'

parser(csv_file, json_file)
