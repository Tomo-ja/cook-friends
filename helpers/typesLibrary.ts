import { Timestamp } from "mongodb";

export type User = {
	email: string,
	favoriterecipe: string[],
	historyrecipe: string[],
	password: string,
	username: string,
	id: string
}

export type Ingredient = {
	id: number,
	name: string,
	amount: number,
	unit: string
}

export type ItemOnList = {
	ingredient_api_id: string;
	name: string;
	amount: number;
	created_at: Timestamp;
	memo: string;
	_id: string;
}

export type Fridge = {
	ingredient_api_id: string,
	name: string,
	amount: number,
	unit: string,
	stored_at: string
}[]


export type RecipeSearchResult = {
	results: RecipeMinimize[],
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



export type RecipeInstruction = {
	number: number,
	step: string,
}

export type RecipeInfo = {
	"id": number,
	"title": string,
	"readyInMinutes": number,
	"servings": number,
	"image": string,

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

export type RecipeMinimize = {
	id: number,
	title: string,
	image: string
}

export type RandomRecipes = {
	recipes: RecipeMinimize[]
}

export type AlertInfo = {
	isError: boolean, 
	message: string
}