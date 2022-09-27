import Input from "../Input/input.styles";
import Button from "../Button/button.styles";
import FormStyled from "./form.styles";
import appAxios from "../../constants/axiosBase";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";
import { NextPageContext } from "next";
import Link from "next/link";
interface props {
	btn: string;
	signUp: boolean;
}
interface ErrMsg {
	account: boolean;
	password: boolean;
	validation: boolean;
	login: boolean;
	loginPsw: boolean;
}
// export async function getServerSideProps(ctx:any) {
// 	const cookies = nookies.get(ctx);
// 	nookies.set(ctx, "accessToken", '1', {
// 		maxAge: 30 * 24 * 60 * 60,
// 		path: "/login",
// 	});

// 	return { cookies };

export const Form = ({ btn, signUp }: props) => {
	const router = useRouter();
	const usernameRef = useRef<HTMLInputElement>(null!);
	const emailRef = useRef<HTMLInputElement>(null!);
	const passwordRef = useRef<HTMLInputElement>(null!);
	const passwordRef2 = useRef<HTMLInputElement>(null!);
	const [err, setErr] = useState<ErrMsg>({
		account: true,
		password: true,
		validation: true,
		login: true,
		loginPsw: true,
	});
	const connectApi = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		if (btn === "Sign up") {
			if (!(passwordRef.current?.value === passwordRef2.current?.value))
				return setErr({ ...err, password: false });
			if (
				!passwordRef.current?.value.match(
					/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/
				)
			)
				return setErr({ ...err, validation: false });
			const Ref = {
				username: usernameRef.current?.value,
				email: emailRef.current?.value,
				password: passwordRef.current?.value,
			};
			console.log(Ref);
			appAxios.post("api/auth/register", { data: Ref }).then((res) => {
				if (res.data === "exsist") {
					return setErr({
						...err,
						password: true,
						validation: true,
						account: false,
					});
				} else {
					router.push("/login");
				}
			});
		} else if (btn === "Login") {
			const Ref = {
				email: emailRef.current?.value,
				password: passwordRef.current?.value,
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
					// const user = res.data;
					// setCookie(null, "user", JSON.stringify(user), {
					// 	path: "/",
					// 	maxAge: 3600, // expires 1hr
					// 	sameSite: true,
					// });
					router.push("/explore");
				}
			});
		}
	};
	return (
		<FormStyled>
			{!err.account && <p className='ErrMesg'>This Email has an account</p>}
			{!err.password && <p className='ErrMesg'>Password is not matched</p>}
			{!err.validation && (
				<div className='ErrMesg'>
					<p>Must contain a Capital Case, a Numebr</p>
					<p>At Least 8 Characters Long</p>
				</div>
			)}
			{!err.login && <p className='ErrMesg'>We can&apos;t find the user</p>}
			{!err.loginPsw && <p className='ErrMesg'>Password is not coorect</p>}
			{signUp && (
				<div>
					<label htmlFor='Name'>Name</label>
					<Input id='Name' type={"text"} ref={usernameRef} />
				</div>
			)}
			<div>
				<label htmlFor='Email'>Email</label>
				<Input id='Email' type={"email"} ref={emailRef} />
			</div>
			<div>
				<label htmlFor='Password'>Password</label>
				<Input id='Password' type={"password"} ref={passwordRef} />
			</div>
			{signUp && (
				<div>
					<label htmlFor='cPassword'>Confirm Password</label>
					<Input id='cPassword' type={"password"} ref={passwordRef2} />
				</div>
			)}
			<Button
				width='300px'
				fontSize='14px'
				fontThin={true}
				onClick={connectApi}
			>
				{btn}
			</Button>
			{!signUp && (
				<p>
					{" "}
					You don&apos;t have an account yet ?{" "}
					<Link href='/signup' className='signup'>
						Signup
					</Link>{" "}
				</p>
			)}
		</FormStyled>
	);
};
