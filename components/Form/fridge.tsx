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
	const inputRef = useRef<HTMLInputElement>(null);
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
				inputRef.current!.value = "";
				setTrigger!((prev) => prev + 1);
			});
		}
	// };
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
	return (
		<StyledForm>
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
						<StyledInput id='cPassword' type='date' ref={secondInputRef} />
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
		</StyledForm>
	);
};



export default FridgeForm;
