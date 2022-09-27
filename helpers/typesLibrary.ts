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
