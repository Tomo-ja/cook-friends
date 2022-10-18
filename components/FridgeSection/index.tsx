import { Dispatch, SetStateAction, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import Amount from "./amount";

import StyledItemInFridge, { classNames } from "./itemInFridge.styles";
import StyledButton from "../Button/button.styles";
import StyledLink from "../../styles/link.styles";

import { defineExpireDate } from "../../helpers";
import { Fridge } from "../../helpers/typesLibrary";
import appAxios from "../../constants/axiosBase";
import { amountContext } from "../../useContext/useAmount";



type Props = {
	fridge: Fridge;
	useAsFilter: boolean;
	urlQuery?: ParsedUrlQuery;
	setMustIncludeIngredients?: Dispatch<SetStateAction<string[]>>;
	fridgeAction?: (arg: boolean) => void;
	fridgeDel?: boolean;
	userId?: string;
	
};


const FridgeSection = ({ fridge, useAsFilter, setMustIncludeIngredients, urlQuery, userId }: Props) => {

	const context = useContext(amountContext);

	useEffect(() => {
		context?.updateList(fridge);
	}, [fridge]);

	const router = useRouter();

	const [selectedAsFilter, setSelectedAsFilter] = useState<boolean[]>(() => {
		const init: boolean[] = [];
		for (let i = 0; i < fridge.length; i++) {
			init.push(false);
		}
		return init;
	});

	const handleDelete = async (e: number) => {
		const deletedFridgeItem = context?.changedAmountList.filter(
			(item, index) => e === index
		);
		console.log("del", deletedFridgeItem);
		const currentFridgeItem = context?.changedAmountList.filter(
			(item, index) => e !== index
		);
		
		if (deletedFridgeItem) {
			await appAxios
				.post("api/fridge/delete", {
					user_id: userId,
					ingredient_api_id: deletedFridgeItem[0].ingredient_api_id,
				})
				.then((res) => {
					console.log("delet", res);
					context?.updateList(currentFridgeItem);
				});
		} else {
			console.log("YABAI");
		}
	};

	const handleClickFilter = (idx: number) => {
		if (useAsFilter) {
			const isFilterOut = selectedAsFilter[idx];
			setSelectedAsFilter((prev) => {
				const changing = [...prev];
				changing[idx] = !prev[idx];
				return changing;
			});
			if (setMustIncludeIngredients) {
				if (isFilterOut) {
					setMustIncludeIngredients((prev) =>
						[...prev].filter((food) => food !== fridge[idx].name)
					);
				} else {
					setMustIncludeIngredients((prev) => [...prev, fridge[idx].name]);
				}
			}
		}
	};

	const handleClickLink = (ingredient: string) => {
		if (useAsFilter) {
			return;
		}
		router.push({
			pathname: "/explore",
			query: { keyword: ingredient },
		});
	};

	useEffect(() => {
		setSelectedAsFilter(() => {
			const init: boolean[] = [];
			for (let i = 0; i < fridge.length; i++) {
				init.push(false);
			}
			return init;
		});
	}, [urlQuery]);


	return (
		<div>
			{context?.changedAmountList.map((item, idx) => (
				<StyledItemInFridge
					useAsFilter={useAsFilter}
					key={item.ingredient_api_id}
					className={selectedAsFilter[idx] ? classNames.selected : ""}
					onClick={() => handleClickFilter(idx)}
				>
					<div className={classNames.itemFridgeLeft}>
						{useAsFilter ? (
							<p className={classNames.foodName}>{item.name}</p>
						) : (
							<>
								<StyledLink
									hoverColor='#ffaa4e'
									onClick={() => handleClickLink(item.name)}
								>
									{item.name}
								</StyledLink>
								<p
									className={
										defineExpireDate(item.stored_at) > 5
											? classNames.expireDate
											: ""
									}
								>
									Bought in{" "}
									{defineExpireDate(item.stored_at) === 0
										? "Today"
										: `${defineExpireDate(item.stored_at)} days ago`}
								</p>
							</>
						)}
					</div>
					<div className={classNames.itemFridgeRight}>
						{useAsFilter ? (
							<p className={classNames.amount}>{item.amount}</p>
						) : (
							<>
								<Amount
									amount={item.amount}
									unit={item.unit}
									ingredentId={item.ingredient_api_id}
									useAsFilter={useAsFilter}
										userId={userId}
								/>
							</>
						)}
					</div>
					<div className={classNames.itemFridgeRight}>
						<StyledButton
							width='75px'
							fontSize="11px"
							fontThin={true}
							onClick={() => handleDelete(idx)}
						>
							delete
						</StyledButton>
					</div>
				</StyledItemInFridge>
			))}
		</div>
	);
};

export default FridgeSection;
