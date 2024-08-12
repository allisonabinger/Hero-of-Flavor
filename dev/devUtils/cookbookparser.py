import csv
import json

# parser for cookbook, which is the display for recipes
# without ingredient matching, just with categories and ingredients


def parser(csv_file, json_file):
    recipes = []

    with open(csv_file, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            recipe = {
                'id': int(row['Unique ID']),
                'Name': row['Name'],
                'Category': row['Category'].split(';'),
                'Ingredients': []
            }

            for i in range(1, 6):
                ingredient_key = f'Ingredient {i}'
                if row[ingredient_key]:
                    ingredients = [opt.strip() for opt in row[ingredient_key].split(' or ')]
                    recipe['Ingredients'].append(ingredients)

            recipes.append(recipe)

    with open(json_file, 'w') as jsonfile:
        json.dump(recipes, jsonfile, indent=4)


csv_file = 'cookbook.csv'
json_file = 'cookbook.json'

parser(csv_file, json_file)
