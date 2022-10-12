import Input from "../Input/input.styles";
import Button from "../Button/button.styles";
import FormStyled from "./form.styles";
import appAxios from "../../constants/axiosBase";
import { useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";
import { NextPageContext } from "next";
import Link from "next/link";
import SearchSection from "../SearchBarSection/index";
import SearchBar from "../SearchBarSection/searchBar.styles";
import SuggestBox from "../SearchBarSection/suggestBox.styles";
import SearchBarSection from "../SearchBarSection/searchBarSection.styled";
import { spoonacularApiAxios } from "../../constants/axiosBase";
import { Timestamp } from "mongodb";
import { log } from "console";
import { amountContext } from "../../useContext/useAmount";

interface props {
	btn: string;
	signUp: boolean;
	fridge?: boolean;
	fridgeAction?: (arg: boolean) => void;
}
interface ErrMsg {
	account: boolean;
	password: boolean;
	validation: boolean;
	login: boolean;
	loginPsw: boolean;
}
interface firdge {
	user_id: string;
	ingredient_api_id: number;
	name: string;
}
// export async function getServerSideProps(ctx:any) {
// 	const cookies = nookies.get(ctx);
// 	nookies.set(ctx, "accessToken", '1', {
// 		maxAge: 30 * 24 * 60 * 60,
// 		path: "/login",
// 	});

// 	return { cookies };

export const Form = ({ btn, signUp, fridge, fridgeAction }: props) => {
	const router = useRouter();
	const firstInputRef = useRef<HTMLInputElement>(null!);
	const secondInputRef = useRef<HTMLInputElement>(null!);
	const thiredInputRef = useRef<HTMLInputElement>(null!);
	const fourthInputRef = useRef<HTMLInputElement>(null!);
	const [prediction, setPrediction] = useState<{ id: number; name: string }[]>(
		[]
	);
	const inputRef = useRef<HTMLInputElement>(null);
	const [addFridge, setAddfridge] = useState<firdge>();
	const [err, setErr] = useState<ErrMsg>({
		account: true,
		password: true,
		validation: true,
		login: true,
		loginPsw: true,
	});
	const context = useContext(amountContext);
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
					appAxios
						.post("api/fridge/create", { user_id: res.data._id })
						.then((res) => console.log(res));
					appAxios
						.post("api/shoppingList/create", { user_id: res.data._id })
						.then((res) => console.log(res));
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
				...addFridge,
				stored_at: fourthInputRef.current?.value,
				amount: firstInputRef.current?.value,
			};
			appAxios.post("api/fridge/add", Ref).then((res) => {
				console.log("add", res);
				inputRef.current!.value = "";
				const arr = Object.values(res.data);
				context?.updateList(arr);
				// fridgeAction(fridge);
			});
		}
	};
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			if (prediction.length === 0) {
				alert("Sorry we can not find the word as ingredients ");
			} else {
				alert("Please choose word from prediction box by pressing");
			}
		}
	};
	const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
		spoonacularApiAxios
			.get("/food/ingredients/autocomplete", {
				params: {
					number: 10,
					query: e.currentTarget.value,
					metaInformation: true,
				},
			})
			.then((data) => {
				const words: { id: number; name: string }[] = data.data;
				setPrediction(words);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleSubmit = (ingredient: string, id: number) => {
		setPrediction([]);
		inputRef.current!.value = ingredient;
		setAddfridge({
			user_id: "633a59d4733aa93cea103d6e",
			ingredient_api_id: id,
			name: ingredient,
		});
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
			{btn === "fridge" && (
				<>
					<SearchBarSection>
						<SearchBar
							placeholder='Search by Ingredients'
							onChange={handleOnChange}
							onKeyDown={handleKeyDown}
							ref={inputRef}
						/>
						{prediction.length !== 0 && (
							<SuggestBox>
								{prediction.map((word) => (
									<li
										key={word.id}
										onClick={() => handleSubmit(word.name, word.id)}
									>
										{word.name}
									</li>
								))}
							</SuggestBox>
						)}
					</SearchBarSection>
					<div>
						<label htmlFor='Amount'>Amount</label>
						<Input id='Amount' type='number' ref={firstInputRef} />
					</div>
					<div>
						<label htmlFor='cPassword'>Date</label>
						<Input id='cPassword' type='date' ref={fourthInputRef} />
					</div>
				</>
			)}
			{signUp && (
				<>
					<div>
						<label htmlFor='Name'>Name</label>
						<Input id='Name' type={"text"} ref={firstInputRef} />
					</div>
					<div>
						<label htmlFor='Email'>Email</label>
						<Input
							id='Email'
							type={btn === "fridge" ? "text" : "email"}
							ref={secondInputRef}
						/>
					</div>
					<div>
						<label htmlFor='Password'>Password</label>
						<Input
							id='Password'
							type={btn === "fridge" ? "text" : "password"}
							ref={thiredInputRef}
						/>
					</div>
					<div>
						<label htmlFor='cPassword'>Password</label>
						<Input id='cPassword' type='password' ref={fourthInputRef} />
					</div>
				</>
			)}
			{btn === "Login" && (
				<>
					<div>
						<label htmlFor='Email'>Email</label>
						<Input id='Email' type='email' ref={secondInputRef} />
					</div>
					<div>
						<label htmlFor='Password'>Password</label>
						<Input id='Password' type='password' ref={thiredInputRef} />
					</div>
				</>
			)}
			{btn === "shpping" && (
				<>
					<div>
						<label htmlFor='Email'>Name</label>
						<Input id='name' type='namel' ref={secondInputRef} />
					</div>
					<div>
						<label htmlFor='Password'>Amount</label>
						<Input id='Amount' type='text' ref={thiredInputRef} />
					</div>
					<div>
						<label htmlFor='Password'>Memo</label>
						<Input id='memo' type='text' ref={fourthInputRef} />
					</div>
				</>
			)} 
			<Button
				width='300px'
				fontSize='14px'
				fontThin={true}
				onClick={connectApi}
			>
				{btn}
			</Button>
			{!signUp && btn !== "fridge" && (
				<div>
					{" "}
					You don&apos;t have an account yet ?{" "}
					<Link href='/signup' className='signup'>
						Signup
					</Link>{" "}
				</div>
			)}
		</FormStyled>
	);
};
