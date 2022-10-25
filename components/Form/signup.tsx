import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
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


const SignupFrom = ({ btn}: props) => {
	const router = useRouter();
	const firstInputRef = useRef<HTMLInputElement>(null!);
	const secondInputRef = useRef<HTMLInputElement>(null!);
	const thiredInputRef = useRef<HTMLInputElement>(null!);
	const fourthInputRef = useRef<HTMLInputElement>(null!);

	const [err, setErr] = useState<ErrMsg>({
		account: true,
		password: true,
		validation: true,
		login: true,
		loginPsw: true,
	});

	const connectApi = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
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
			appAxios.post("/api/auth/register", { data: Ref }).then((res) => {
				if (res.data === "exsist") {
					return setErr({
						...err,
						password: true,
						validation: true,
						account: false,
					});
				} else {
					appAxios
						.post("/api/fridge/create", { user_id: res.data._id })
						.then((res) => console.log(res));
					appAxios
						.post("/api/shoppingList/create", { user_id: res.data._id })
						.then((res) => console.log(res));
					router.push("/login");
				}
			});
		
	};
	return (
		<StyledForm>
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
			<StyledButton
				width='300px'
				fontSize='14px'
				fontThin={true}
				onClick={connectApi}
			>
				{btn}
			</StyledButton>
		</StyledForm>
	);
};

export default SignupFrom;
