import React from 'react'
import { useCookies } from 'react-cookie'
import { Form } from '../components/Form/Form'
import appAxios from '../constants/axiosBase'
import Container from '../styles/container.styles'
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
	example: string;
	exampleRequired: string;
};

export default function Login() {
	const [cookie, setCookie] = useCookies(['user'])
	  const {
			register,
			handleSubmit,
			watch,
			formState: { errors },
		} = useForm<Inputs>();
		const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	const CookieSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		console.log("working");
		
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
		<div>
			<Container>
				<Form btn="Login" signUp={false} />
			</Container>
			{/* <form onSubmit={cookieSubmit}>
				<button >login</button>
			</form> */}
		</div>
	);
}

