import { RecipeInfo } from "./helpers/typesLibrary"

export const autoCompleteData = {
	data: {

	}

}

export const randomRecipeData = [
	{
		recipes: [
			{
				id: 715495,
				title: 'Turkey Tomato Cheese Pizza',
				image: 'https://spoonacular.com/recipeImages/715495-556x370.jpg',
			}
		]
	},
	{
		recipes: [
			{
				id: 635058,
				title: 'Black Bean and Peppers Taco Filling',
				image: 'https://spoonacular.com/recipeImages/635058-556x370.jpg',
			}
		]
	},
	{
  recipes: [
    {
      id: 632241,
      title: 'Alouette Crème De Brie Shrimp Cups',
      image: 'https://spoonacular.com/recipeImages/632241-556x370.jpg',
    }
  ]
}
]

export const complexSearchData = {
	data: {
		number: 6,
		offset: 0,
		totalResults: 20,
		results: [
			{
				id: 7765051,
				image : "https://spoonacular.com/recipeImages/776505-312x231.jpg",
				title: "Sausage & Pepperoni Stromboli",
			},
			{
				id: 715449,
				image: "https://spoonacular.com/recipeImages/715449-312x231.jpg",
				title: "How to Make OREO Turkeys for Thanksgiving",
			},
			{
				dishTypes: ['lunch', 'main course', 'main dish', 'dinner'],
				id: 716410,
				image: "https://spoonacular.com/recipeImages/716410-312x231.jpg",
				title: "Cannoli Ice Cream w. Pistachios & Dark Chocolate",
			},
			{
				id:716423,
				image:"https://spoonacular.com/recipeImages/716423-312x231.jpg",
				title:"Grilled Zucchini with Goat Cheese and Balsamic-Honey Syrup",
			},
			{
				id: 715421,
				image: "https://spoonacular.com/recipeImages/715421-312x231.jpg",
				title: "Cheesy Chicken Enchilada Quinoa Casserole",
			},
			{
				id:715437,
				image:"https://spoonacular.com/recipeImages/715437-312x231.jpg",
				title:"Homemade King Ranch Chicken Casserole",
			},
		]
	}
}

export const recipeDetailsData: RecipeInfo = {
	"id": 632241,
	"title": "Alouette Crème De Brie Shrimp Cups",
	"readyInMinutes": 45,
	"servings": 30,
	"image": "https://spoonacular.com/recipeImages/632241-556x370.jpg",

	"analyzedInstructions":[
			{
			"name": "",
			"steps": [
				{
					number: 1,
					step: "Arrange tartlet shells on 2 serving plates. Spoon a scant teaspoon Alouette Crme de Brie in each.In medium bowl, combine shrimp and all remaining ingredients. Toss to coat shrimp.",
				},
				{
					number: 2,
					step: "Place 1 shrimp over cheese in each shell. Spoon a little orange juice-chive mixture over shrimp.",
				},
				{
					number: 3,
					step: "Serve immediately.Variation:For a slightly salty flavor, substitute 30 cup-shaped tortilla chips for the phyllo tartlet shells.If using phyllo tartlet shells, these can be served cold or warm (warm for 5 minutes at 350 F).",
				},
			],
		}
	],
	
	"extendedIngredients": [
		{
			id: 1006,
			name: 'brie',
			amount: 5,
			unit: 'oz'
		},
		{
			id: 11156,
			name: 'chives',
			amount: 1,
			unit: 'tablespoon'
		},
		{
			id: 1034053,
			name: "extra virgin olive oil",
			amount: 2,
			unit: "tablespoons"
		},
		{
			id: 11215,
			name: "garlic",
			amount: 0.125,
			unit: "tablespoons"
		},
		{
			id: 9206,
			name: "orange juice",
			amount: 1,
			unit: "tablespoon"
		},
		{
			id: 9216,
			name: "orange peel",
			amount: 0.5,
			unit: "teaspoon"
		},
		{
			id: 93817,
			name: "phyllo shells",
			amount: 4.2,
			unit: "oz"
		},
		{
			id: 1032009,
			name: "red pepper flakes",
			amount: 0.25,
			unit: "teaspoon"
		},
	],
	
	"vegetarian": false,
	"vegan": false,
	"veryHealthy": false,
	"veryPopular": false,
	"cuisines": [],
	"dishTypes": ['antipasti', 'starter', 'snack', 'appetizer', 'antipasto', "hor d'oeuvre"],
}
