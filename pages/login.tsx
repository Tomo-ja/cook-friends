import React from 'react'
import { useCookies } from 'react-cookie'
import appAxios from '../constants/axiosBase'

export default function Login() {
	const [cookie, setCookie] = useCookies(['user'])

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		try{
			const response = await appAxios.post('/api/auth/login', {
					username: 'testUser1',
					password: 'testUser1'
			})

			const user = await response.data
			setCookie('user', JSON.stringify(user), {
				path: '/',
				maxAge: 3600, // expires 1hr
				sameSite: true 
			})
			console.log(user)
		} catch(err) {
			console.log(err)
		}
	}
	return (
		<>
			<h1>login page</h1>
			<form onSubmit={handleSubmit}>
				<button >login</button>
			</form>
		</>
	)
}

