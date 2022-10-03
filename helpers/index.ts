import cookie from 'cookie'

const keywords = [
	'Japanese',
	'Chinese',
	'Italian',
	'Spicy',
	'Noodle',
	'Rice',
	'Pasta',
	'Soup',
	'Salad', 
]

const parseCookies = (req: any) => {
	return cookie.parse(req ? req.headers.cookie || "": document.cookie)
}

export const stringToDate = (dateish: string): Date => {
	const date = new Date(dateish)
	return new Date (
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
	)
}

// FIXME: need to return when expire instead of when user bought
export const defineExpireDate = (dayBought: string): number => {
	const diffInSeconds = (new Date()).getTime() - (new Date(dayBought)).getTime()
	return Math.floor(diffInSeconds / (1000 * 3600 * 24))
}

export const popupKeywords = (): string[] => {
	return keywords
}

export default parseCookies
