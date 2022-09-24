import axios from 'axios'

const appAxios = axios.create ({
	baseURL: 'http://localhost:3000'
})


export const spoonacularApiAxios = axios.create ({
	baseURL: 'https://api.spoonacular.com',
	params: {
		apiKey: process.env.API_KEY
	}
})

export default appAxios