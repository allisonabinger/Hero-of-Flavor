import csv
import json


def parser(csv_file, json_file):
    recipes = []

    with open(csv_file, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            recipe = {
                'id': int(row['ID']),
                'Name': row['Name'],
                'Type': row['Type'],
                
            }

            for i in range(1, 6):
                ingredient_key = f'Ingredient {i}'
                if row[ingredient_key]:
                    ingredients = row[ingredient_key].split(';')
                    for ingredient in ingredients:
                        if 'Any' in ingredient:
                            recipe['ingredients'].append({
                                'type': ingredient.replace('Any ', ''),
                                'name': None
                            })
                        else:
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
