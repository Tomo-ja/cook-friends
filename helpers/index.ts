import cookie from 'cookie'

const parseCookies = (req: any) => {
	return cookie.parse(req ? req.headers.cookie || "": document.cookie)
}

export default parseCookies
