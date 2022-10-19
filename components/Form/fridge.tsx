import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import StyledInput from "../Input/input.styles";
import StyledButton from "../Button/button.styles";
import StyledForm from "./form.styles";

import appAxios from "../../constants/axiosBase";
import { spoonacularApiAxios } from "../../constants/axiosBase";
import SearchBarSection from "../SearchBarSection/index";

// TODO: need to be refactored

interface props {
	btn: string;
	userId?: string;
	modal?: boolean;
	setTrigger?: Dispatch<SetStateAction<number>>;
}
interface firdge {
	user_id: string | undefined;
	ingredient_api_id: number;
	name: string;
}
const FridgeForm = ({ btn, userId, setTrigger }: props) => {
	const router = useRouter();
	const firstInputRef = useRef<HTMLInputElement>(null!);
	const secondInputRef = useRef<HTMLInputElement>(null!);
	const [prediction, setPrediction] = useState<{ id: number; name: string }[]>(
		[]
	);
	const [addFridge, setAddfridge] = useState<firdge>();
	const connectApi = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		const Ref = {
			...addFridge,
			stored_at: secondInputRef.current?.value,
			amount: firstInputRef.current?.value,
		};

		appAxios.post("api/fridge/add", Ref).then((res) => {
			console.log("add", res);
			setTrigger!((prev) => prev + 1);
		});
	};
	
	return (
		<StyledForm>
			<>
				<SearchBarSection list={setAddfridge} userid={userId} />
				<div>
					<label htmlFor='Amount'>Amount</label>
					<StyledInput id='Amount' type='number' ref={firstInputRef} />
				</div>
				<div>
					<label htmlFor='cPassword'>Date</label>
					<StyledInput id='cPassword' type='date' ref={secondInputRef} />
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

export default FridgeForm;
