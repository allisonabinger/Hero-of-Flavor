import csv


# reads csv
def read_csv(file_path):
    with open(file_path, mode='r') as file:
        return list(csv.DictReader(file))


# helper fun to write to csv
def write_csv(file_path, data, fieldnames):
    with open(file_path, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)


ingredients = read_csv('ingredients.csv')
recipes = read_csv('recipetest.csv')

ingredient_dict = {}
for ingredient in ingredients:
    if ingredient['Type'] not in ingredient_dict:
        ingredient_dict[ingredient['Type']] = []
    ingredient_dict[ingredient['Type']].append(ingredient)


def generate_variants(base_ingredients, ingredient_dict):
    variants = [[]]

    for ingredient in base_ingredients:
        new_variants = []
        if 'Any' in ingredient:
            ingredient_type = ingredient.split()[-1]
            for variant in variants:
                if ingredient_type in ingredient_dict:
                    for special_ingredient in ingredient_dict[ingredient_type]:
                        new_variants.append(variant + [special_ingredient['Name']])
        elif ';' in ingredient:
            choices = ingredient.split(';')
            for choice in choices:
                for variant in variants:
                    new_variants.append(variant + [choice])
        else:
            for variant in variants:
                new_variants.append(variant + [ingredient])
        variants = new_variants

    return variants


new_recipes = []
for recipe in recipes:
    base_name = recipe['Name']
    base_ingredients = [recipe[f'Ingredient {i}'] for i in range(1, 6) if recipe[f'Ingredient {i}']]

    for variant in generate_variants(base_ingredients, ingredient_dict):
        for i in range(len(variant)):
            ingredient = variant[i]
            for special_ingredient in ingredient_dict.get(ingredient.split()[-1], []):
                new_variant = variant.copy()
                new_variant[i] = special_ingredient['Name']
                new_recipe_name = f"{special_ingredient['Recipe Prefix']} {base_name}".strip()
                new_recipes.append({
                    'Name': new_recipe_name,
                    'Ingredient 1': new_variant[0] if len(new_variant) > 0 else '',
                    'Ingredient 2': new_variant[1] if len(new_variant) > 1 else '',
                    'Ingredient 3': new_variant[2] if len(new_variant) > 2 else '',
                    'Ingredient 4': new_variant[3] if len(new_variant) > 3 else '',
                    'Ingredient 5': new_variant[4] if len(new_variant) > 4 else '',
                    'Effect': special_ingredient['Effect']
                })


fieldnames = ['Name', 'Ingredient 1', 'Ingredient 2', 'Ingredient 3', 'Ingredient 4', 'Ingredient 5', 'Effect']
write_csv('new_recipes.csv', new_recipes, fieldnames)
