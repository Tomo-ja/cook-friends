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
	const firstInputRef = useRef<HTMLInputElement>(null!);
	const secondInputRef = useRef<HTMLInputElement>(null!);
	const thiredInputRef = useRef<HTMLInputElement>(null!);
	const fourthInputRef = useRef<HTMLInputElement>(null!);

	const fridgenameRef = useRef<HTMLInputElement>(null!);
	const categoryRef = useRef<HTMLInputElement>(null!);
	const amountRef = useRef<HTMLInputElement>(null!);
	const dateRef = useRef<HTMLInputElement>(null!);
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
			if (!(thiredInputRef.current?.value === fourthInputRef.current?.value))
				return setErr({ ...err, password: false });
			if (
				!thiredInputRef.current?.value.match(
					/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/
				)
			)
				return setErr({ ...err, validation: false });
			const Ref = {
				username: firstInputRef.current?.value,
				email: secondInputRef.current?.value,
				password: thiredInputRef.current?.value,
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
					appAxios.post("api/fridge/create", { user_id: res.data._id }).then(res => console.log(res))
					appAxios.post("api/shoppingList/create", { user_id: res.data._id }).then(res => console.log(res))
					router.push("/login");
				}
			});
		} else if (btn === "Login") {
			const Ref = {
				email: secondInputRef.current?.value,
				password: thiredInputRef.current?.value,
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
					console.log("user cookie", res.data);
					setCookie(null, "user", JSON.stringify(res.data), {
						maxAge: 30 * 24 * 60 * 60,
						path: "/",
					});
					router.push("/");
				}
			});
		} else if (btn === "fridge") {
			const Ref = {
				user_id:"633a59d4733aa93cea103d6e",
				ingredient_api_id:100000 ,
				name: firstInputRef.current?.value,
				category: secondInputRef.current?.value,
				amount: thiredInputRef.current?.value,
				unit: "g",
				stored_at: fourthInputRef.current?.value,
			};
			console.log(Ref);
			
			appAxios.post("api/fridge/add", Ref ).then((res) => {
				console.log(res);
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
					<Input
						id='Name'
						type={"text"}
						ref={firstInputRef}
					/>
				</div>
			)}
			<div>
				<label htmlFor='Email'>{btn === "fridge" ? "Category" : "Email"}</label>
				<Input
					id='Email'
					type={btn === "fridge" ? "text" : "email"}
					ref={secondInputRef}
				/>
			</div>
			<div>
				<label htmlFor='Password'>
					{btn === "fridge" ? "Amount" : "Password"}
				</label>
				<Input
					id='Password'
					type={btn === "fridge" ? "text" : "password"}
					ref={thiredInputRef}
				/>
			</div>
			{signUp && (
				<div>
					<label htmlFor='cPassword'>
						{btn === "fridge" ? "Date" : "Confirm Password"}
					</label>
					<Input
						id='cPassword'
						type={btn === "fridge" ? "date" : "password"}
						ref={fourthInputRef}
					/>
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
