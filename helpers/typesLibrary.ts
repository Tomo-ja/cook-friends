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

// FIXME: change return so that reduce response data amount2
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