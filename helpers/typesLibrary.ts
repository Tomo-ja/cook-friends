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
	category: string[],
	stored_at: string
}[]

export type RecipeSummary = {
	vegetarian: boolean,
	veryHealthy: boolean,
	veryPopular: boolean,
	aggregateLikes: number,
	id: number,
	title: string,
	readyInMinutes: number,
	servings: number,
	image: string,
	summary: string,
	cuisines: string[],
	dishTypes: string[],
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
	addRecipeInformation: boolean,
	includeIngredients: string
}