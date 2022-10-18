import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";

import Link from "next/link";

import FontAwesomeButton, { IconKind } from "../FontAwesomeButton";

import StyledInput from "../Input/input.styles";
import StyledButton from "../Button/button.styles";
import StyledForm from "./form.styles";
import StyledSearchBar from "../SearchBarSection/searchBar.styles";
import StyledSearchBarSection from "../SearchBarSection/searchBarSection.styled";
import StyledSuggestBox from "../SearchBarSection/suggestBox.styles";

import appAxios from "../../constants/axiosBase";
import { spoonacularApiAxios } from "../../constants/axiosBase";
import { amountContext } from "../../useContext/useAmount";
import { shoppingContext } from "../../useContext/useShoppingList";

// TODO: need to be refactored

interface props {
	btn: string;
	signUp: boolean;
	userId?: string;
	modal?: boolean;
	setModal?: (arg:boolean) => void;
	setTrigger?: Dispatch<SetStateAction<number>>;
}

interface ErrMsg {
	account: boolean;
	password: boolean;
	validation: boolean;
	login: boolean;
	loginPsw: boolean;
}
interface firdge {
	user_id: string | undefined;
	ingredient_api_id: number;
	name: string;
}


const Form = ({ btn, signUp, userId, modal, setModal, setTrigger }: props) => {
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
	const [switchModal, setSwitchModal] = useState<boolean>(false);
	const context = useContext(amountContext);
	const contextShoppping = useContext(shoppingContext);

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
					// console.log("user cookie", res.data);
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
				setTrigger!(prev => prev + 1)
			});
		} else if (btn === "shopping") {
			const Ref = {
				...addFridge,
				amount: thiredInputRef.current?.value,
				memo: fourthInputRef.current?.value,
			};
			appAxios.post("api/shoppingList/add", Ref).then((res) => {
				console.log("add", res.data.shoppingList);
				inputRef.current!.value = "";
				thiredInputRef.current!.value = "";
				fourthInputRef.current!.value = "";
				contextShoppping?.updateShoppingList(res.data.shoppingList.list);
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
			user_id: userId,
			ingredient_api_id: id,
			name: ingredient,
		});
	};
	const handleSwitch = () => {
		setSwitchModal(!switchModal);
		console.log("switch clicked");
		console.log("clicked", modal);
		
		setModal?.(!modal);
	};
	return (
		<StyledForm>
			<FontAwesomeButton
				handleClick={handleSwitch}
				target={null}
				iconKind={IconKind.XMark}
				displayOnlyMobile={true}
				isButtonSquare={true}
				iconColor='white'
				bcColor="black"
			/>
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
					<StyledSearchBarSection>
						<StyledSearchBar
							placeholder='Search by Ingredients'
							onChange={handleOnChange}
							onKeyDown={handleKeyDown}
							ref={inputRef}
						/>
						{prediction.length !== 0 && (
							<StyledSuggestBox>
								{prediction.map((word) => (
									<li
										key={word.id}
										onClick={() => handleSubmit(word.name, word.id)}
									>
										{word.name}
									</li>
								))}
							</StyledSuggestBox>
						)}
					</StyledSearchBarSection>
					<div>
						<label htmlFor='Amount'>Amount</label>
						<StyledInput id='Amount' type='number' ref={firstInputRef} />
					</div>
					<div>
						<label htmlFor='cPassword'>Date</label>
						<StyledInput id='cPassword' type='date' ref={fourthInputRef} />
					</div>
				</>
			)}
			{signUp && (
				<>
					<div>
						<label htmlFor='Name'>Name</label>
						<StyledInput id='Name' type={"text"} ref={firstInputRef} />
					</div>
					<div>
						<label htmlFor='Email'>Email</label>
						<StyledInput
							id='Email'
							type={btn === "fridge" ? "text" : "email"}
							ref={secondInputRef}
						/>
					</div>
					<div>
						<label htmlFor='Password'>Password</label>
						<StyledInput
							id='Password'
							type={btn === "fridge" ? "text" : "password"}
							ref={thiredInputRef}
						/>
					</div>
					<div>
						<label htmlFor='cPassword'>Password</label>
						<StyledInput id='cPassword' type='password' ref={fourthInputRef} />
					</div>
				</>
			)}
			{btn === "Login" && (
				<>
					<div>
						<label htmlFor='Email'>Email</label>
						<StyledInput id='Email' type='email' ref={secondInputRef} />
					</div>
					<div>
						<label htmlFor='Password'>Password</label>
						<StyledInput id='Password' type='password' ref={thiredInputRef} />
					</div>
				</>
			)}
			{btn === "shopping" && (
				<>
					<StyledSearchBarSection>
						<StyledSearchBar
							placeholder='Search by Ingredients'
							onChange={handleOnChange}
							onKeyDown={handleKeyDown}
							ref={inputRef}
						/>
						{prediction.length !== 0 && (
							<StyledSuggestBox>
								{prediction.map((word) => (
									<li
										key={word.id}
										onClick={() => handleSubmit(word.name, word.id)}
									>
										{word.name}
									</li>
								))}
							</StyledSuggestBox>
						)}
					</StyledSearchBarSection>
					<div>
						<label htmlFor='Password'>Amount</label>
						<StyledInput id='Amount' type='text' ref={thiredInputRef} />
					</div>
					<div>
						<label htmlFor='Password'>Memo</label>
						<StyledInput id='memo' type='text' ref={fourthInputRef} />
					</div>
				</>
			)}
			<StyledButton
				width='300px'
				fontSize='14px'
				fontThin={true}
				onClick={connectApi}
			>
				{btn}
			</StyledButton>
			{btn === "Login" && (
				<div>
					{" "}
					You don&apos;t have an account yet ?{" "}
					<Link href='/signup' className='signup'>
						Signup
					</Link>{" "}
				</div>
			)}
		</StyledForm>
	);
};

export default Form
