import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";

import Link from "next/link";


import StyledInput from "../Input/input.styles";
import StyledButton from "../Button/button.styles";
import StyledForm from "./form.styles";

import appAxios from "../../constants/axiosBase";

interface props {
	btn: string;
}

interface ErrMsg {
	account: boolean;
	password: boolean;
	validation: boolean;
	login: boolean;
	loginPsw: boolean;
}


const LoginForm = ({ btn }: props) => {
	const router = useRouter();
	const firstInputRef = useRef<HTMLInputElement>(null!);
	const secondInputRef = useRef<HTMLInputElement>(null!);
	const [err, setErr] = useState<ErrMsg>({
		account: true,
		password: true,
		validation: true,
		login: true,
		loginPsw: true,
	});

	const connectApi = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		const Ref = {
			email: firstInputRef.current?.value,
			password: secondInputRef.current?.value,
		};
		appAxios.post("api/auth/login", { data: Ref }).then((res) => {
			if (res.data === "NotExists") {
				return setErr({
					password: true,
					validation: true,
					account: true,
					login: false,
					loginPsw: false,
				});
			} else if (res.data === "worngPassword") {
				return setErr({
					password: true,
					validation: true,
					account: true,
					login: true,
					loginPsw: false,
				});
			} else {
				const cookies = parseCookies();
				setCookie(null, "user", JSON.stringify(res.data), {
					maxAge: 30 * 24 * 60 * 60,
					path: "/",
				});
				router.push("/");
			}
		});
	};
	return (
		<StyledForm>
			{!err.login && <p className='ErrMesg'>We can&apos;t find the user</p>}
			{!err.loginPsw && <p className='ErrMesg'>Password is not coorect</p>}
			<>
				<div>
					<label htmlFor='Email'>Email</label>
					<StyledInput id='Email' type='email' ref={firstInputRef} />
				</div>
				<div>
					<label htmlFor='Password'>Password</label>
					<StyledInput id='Password' type='password' ref={secondInputRef} />
				</div>
			</>
			<StyledButton
				width='300px'
				fontSize='14px'
				fontThin={true}
				onClick={connectApi}
			>
				{btn}
			</StyledButton>
				<div style={{"textAlign": "center" ,"marginTop" : "10px"}}>
					{" "}
					You don&apos;t have an account yet ?{" "}
					<Link href='/signup' className='signup'>
						Signup
					</Link>{" "}
				</div>
		</StyledForm>
	);
};

export default LoginForm;
