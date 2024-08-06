import csv
import json


def parser(csv_file, json_file):
    ingredients = []

    with open(csv_file, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            ingredient = {
                'id': int(row['ID']),
                'Name': row['Name'],
                'Type': row['Type'],
                'Effect': row['Effect'],
                'Prefix': row['Prefix'],
                'sellPrice': row['Sell Price'],
                'buyPrice': row['Buy Price'],
                'locations': [location.strip() for location in row['Locations/Source'].split(';') if location.strip()]
            }
            ingredients.append(ingredient)
    
    with open(json_file, 'w') as jsonfile:
        json.dump(ingredients, jsonfile, indent=4)


csv_file = 'ingredients.csv'
json_file = 'ingredients.json'

parser(csv_file, json_file)
