import Input from "../Input/input.styles";
import Button from "../Button/button.styles";
import FormStyled from "./form.styles";
import appAxios from "../../constants/axiosBase"
import {useRef } from "react";

interface props {
	btn: string;
	signUp: boolean;
}
interface Ref{
  username: string,
  email: string,
  password : string
}

export const Form = ({ btn, signUp }: props) => {
  const usernameRef = useRef<HTMLInputElement>(null!)
  const emailRef = useRef<HTMLInputElement>(null!)
  const passwordRef = useRef<HTMLInputElement>(null!)
  const passwordRef2 = useRef<HTMLInputElement>(null!)
  const Ref = {
		username: usernameRef.current?.value,
		email: emailRef.current?.value,
		password: passwordRef.current?.value,
	}; 
	const connectApi = (method: string) => {
		appAxios.get("api/auth/register", { data: Ref })
		.then(res=>console.log(res))
}
	return (
		<FormStyled>
			{<p className='ErrMesg'>This Email has an account</p>}
			{<p className='ErrMesg'>Password is not matched</p>}
			{signUp &&
				<div>
					<label htmlFor='Name'>Name</label>
					<Input id='Name' type={"text"} ref={usernameRef} />
				</div>
			}
			<div>
				<label htmlFor='Email'>Email</label>
        <Input id='Email' type={"email"} ref={emailRef} />
			</div>
			<div>
				<label htmlFor='Password'>Password</label>
        <Input id='Password' type={"password"} ref={passwordRef} />
			</div>
      {signUp && <div>
        <label htmlFor='cPassword'>Confirm Password</label>
        <Input id='cPassword' type={"password"} ref={passwordRef2} />
      </div>}
			<Button width='300px' fontSize='14px' fontThin={true}>
				{btn}
			</Button>
		</FormStyled>
	);
};
