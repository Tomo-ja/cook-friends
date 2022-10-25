import axios from 'axios'

const appAxios = axios.create ({
	baseURL: process.env.API_BASE_URL
})


export const spoonacularApiAxios = axios.create ({
	baseURL: 'https://api.spoonacular.com',
	params: {
		apiKey: process.env.API_KEY
	}
})

export default appAxios