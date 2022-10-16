import { Dispatch, SetStateAction, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Amount from "./amount";
import ItemInFridge, { classNames } from "./itemInFridge.styles";
import StyledLink from "../../styles/link.styles";
import { defineExpireDate } from "../../helpers";
import { Fridge, CurrentFridge } from "../../helpers/typesLibrary";
import { ParsedUrlQuery } from "querystring";
import appAxios from "../../constants/axiosBase";
import { amountContext } from "../../useContext/useAmount";
import Button from "../Button/button.styles";



// FIXME: if you want to pass any additional props, you can pass but optional like example?: number
type Props = {
	fridge: Fridge;
	useAsFilter: boolean;
	urlQuery?: ParsedUrlQuery;
	setMustIncludeIngredients?: Dispatch<SetStateAction<string[]>>;
	fridgeAction?: (arg: boolean) => void;
	fridgeDel?: boolean;
};
// interface CurrentFridge  {
// 	ingredient_api_id: string,
// 	name: string,
// 	amount: number,
// 	unit: string,
// 	stored_at: string
// }[]

// TODO: for atsu, you will want to create new function here to update database and may want to pass it as props to Amount component

const FridgeSection = ({
	fridge,
	useAsFilter,
	setMustIncludeIngredients,
	urlQuery,
	fridgeAction,
	fridgeDel,
}: Props) => {
	const context = useContext(amountContext)
	
	const [tempFridge, setTempFridge] = useState<CurrentFridge[]>([]);
	const [amountChange, setAmountChange] = useState<boolean>(false)
	// console.log("tempFridge", tempFridge);
	useEffect(() => {

		context?.updateList(fridge);
		// fridgeAction?.(!fridgeDel)
	}, [fridge])

	const router = useRouter();
	const [selectedAsFilter, setSelectedAsFilter] = useState<boolean[]>(() => {
		const init: boolean[] = [];
		for (let i = 0; i < fridge.length; i++) {
			init.push(false);
		}
		return init;
	});

	const handleDelete = async(e: number) => {
		const deletedFridgeItem = context?.changedAmountList.filter(
			(item, index) => e === index
		);
		console.log("del",deletedFridgeItem);
		const currentFridgeItem = context?.changedAmountList.filter(
			(item, index) => e !== index
		);
		console.log("currentFridgeItem", currentFridgeItem);
		if (deletedFridgeItem) {			
			await appAxios
				.post("api/fridge/delete", {
					user_id: "633a59d4733aa93cea103d6e",
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
				<ItemInFridge
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
									setTempFridge={() => setTempFridge(tempFridge)}
								/>
							</>
						)}
					</div>
					<div className={classNames.itemFridgeRight}>
						<Button
							width='50px'
							fontSize='5px'
							fontThin={true}
							onClick={() => handleDelete(idx)}
						>
							delete
						</Button>
					</div>
				</ItemInFridge>
			))}
		</div>
	);
};

export default FridgeSection;
