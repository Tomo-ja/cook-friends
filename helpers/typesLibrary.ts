export type User = {
	email: string,
	favoriterecipe: string[],
	historyrecipe: string[],
	password: string,
	username: string,
	id: string
}

export type Fridge = {
	ingredient_api_id: string,
	name: string,
	amount: number,
	unit: string,
	stored_at: string
}[]
export type CurrentFridge ={
	ingredient_api_id: string;
	name: string;
	amount: number;
	unit: string;
	stored_at: string;
}
[];
export type RecipeSummary = {
	id: number,
	title: string,
	image: string,
}

export type RecipeSearchResult = {
	results: RecipeSummary[],
	offset: number,
	number: number,
	totalResults: number
}

export type RecipeSearchParams = {
	query: string | string[],
	number: number,
	offset: number,
	sort: string,
	includeIngredients: string
}

export type Ingredient = {
	"id": number,
	"name": string,
	"amount": number,
	"unit": string,
}

export type RecipeInstruction = {
	number: number,
	step: string,
}

export type RecipeInfo = {
	"id": number,
	"title": string,
	"readyInMinutes": number,
	"servings": number,
	"image": "https://spoonacular.com/recipeImages/715449-556x370.jpg",

	"analyzedInstructions":{
				"name": "",
				"steps": RecipeInstruction[]
	}[],

	"extendedIngredients": Ingredient[],
	
	"vegetarian": boolean,
	"vegan": boolean,
	"veryHealthy": boolean,
	"veryPopular": boolean,
	"cuisines": string[],
	"dishTypes": string[],

}