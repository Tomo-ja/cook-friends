import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";

import FontAwesomeButton, { IconKind } from "../FontAwesomeButton";

import StyledItemToBuy from "../ItemToBuy/itemToBuy.styles";

import { AlertInfo, ItemOnList } from "../../helpers/typesLibrary";
import appAxios from "../../constants/axiosBase";
import { shoppingContext } from "../../useContext/useShoppingList";


type Props = {
	list: ItemOnList[];
	userId: string;
	setAlert: Dispatch<SetStateAction<AlertInfo| null>>,
}

const ItemToBuy = ({ list, userId, setAlert }: Props) => {
	
	const context = useContext(shoppingContext);
	useEffect(() => {
		context?.updateShoppingList(list);
	}, [list]);

	const handleDelete = (id: string) => {
		appAxios
			.post("/api/shoppingList/delete", {
				user_id: userId,
				ingredient_api_id: id,
			})
			.then((res) => {
				context?.updateShoppingList(res.data.shoppingList.list);
				setAlert({ isError: false, message: 'Successfully Delete Item'})
			}).catch(() => {
				setAlert({ isError: true, message: 'Failed Delete Item'})
			})
	};
	const handleFridge = async (e: ItemOnList) => {

		const Ref = {
			user_id: userId,
			amount: e.amount,
			ingredient_api_id: e.ingredient_api_id,
			name: e.name,
			created_at: e.created_at,
		};
		try {
			await appAxios.post("/api/fridge/add", Ref)
			setAlert({ isError: false, message: 'Successfully Add Item to Fridge'})
		} catch {
			setAlert({ isError: true, message: 'Failed Add Item to Fridge'})
		}

		await appAxios
			.post("/api/shoppingList/delete", {
				user_id: userId,
				ingredient_api_id: e.ingredient_api_id,
			})
			.then((value) => {
				context?.updateShoppingList(value.data.shoppingList.list);
			});
	};
	if(!context || context.shoppingList.length < 1)return<h2>shopping List is empty</h2>
	return (
		<>
			<div style={{ display: "Grid", gridTemplateColumns: "1fr 1fr" }}>
				{context?.shoppingList.map((item: ItemOnList, index: number) => {
					return (
						<StyledItemToBuy key={index}>
							<div className='NameAmount'>
								<p className='FoodName'>{item.name}</p>
								<p className='Amount'>{item.amount}</p>
							</div>
							<p className='txt'>{item.memo}</p>
							<div className='btnContainer'>
								<FontAwesomeButton 
									handleClick={handleDelete}
									target={item.ingredient_api_id}
									iconKind={IconKind.Trash}
								/>
								<FontAwesomeButton 
									handleClick={handleFridge}
									target={item}
									iconKind={IconKind.Cart}
								/>
							</div>
						</StyledItemToBuy>
					);
				})}
			</div>
		</>
	);
};

export default ItemToBuy;
