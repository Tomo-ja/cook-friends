import cookie from 'cookie'

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

export default parseCookies
