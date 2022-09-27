import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Form } from "../components/Form/Form";
import appAxios from "../constants/axiosBase";
import Container from "../styles/container.styles";
// }

export async function getServerSideProps(ctx?: NextPageContext) {
	const cookie = parseCookies(ctx);
	// console.log(cookie.accessToken); // { accessToken: 'test1234' }

	return {
		props: {
			Id: cookie.accessToken || null,
		},
	};
}
type Inputs = {
	example: string;
	exampleRequired: string;
};
const Login = ({ Id }: any) => {
	// const [cookie, setCookie] = useCookies(['user'])
	// const CookieSubmit = async (e: React.SyntheticEvent) => {
	// 	e.preventDefault()
	// 	console.log("working");
	// 	try{
	// 		const response = await appAxios.post('/api/auth/login', {
	// 				username: 'testUser1',
	// 				password: 'testUser1'
	// 		})
	// 		const user = await response.data
	// 		setCookie('user', JSON.stringify(user), {
	// 			path: '/',
	// 			maxAge: 3600, // expires 1hr
	// 			sameSite: true
	// 		})
	// 		console.log(user)
	// 	} catch(err) {
	// 		console.log(err)
	// 	}
	// }
	return (
		<div>
			<Container>
				<Form btn='Login' signUp={false} />
			</Container>
			{/* <form onSubmit={cookieSubmit}>
				<button >login</button>
			</form> */}
		</div>
	);
};

export default Login;
