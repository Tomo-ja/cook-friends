import React, { useContext, useEffect } from "react";

import FontAwesomeButton, { IconKind } from "../FontAwesomeButton";

import StyledItemToBuy from "../ItemToBuy/itemToBuy.styles";

import { ItemOnList } from "../../helpers/typesLibrary";
import appAxios from "../../constants/axiosBase";
import { shoppingContext } from "../../useContext/useShoppingList";


type Props = {
	list: ItemOnList[];
	userId: string;
}

const ItemToBuy = ({ list, userId }: Props) => {
	
	const context = useContext(shoppingContext);
	useEffect(() => {
		context?.updateShoppingList(list);
	}, [list]);

	const handleDelete = (id: string) => {
		appAxios
			.post("api/shoppingList/delete", {
				user_id: userId,
				ingredient_api_id: id,
			})
			.then((res) => {
				context?.updateShoppingList(res.data.shoppingList.list);
				console.log(res.data);
			});
	};
	const handleFridge = async (e: ItemOnList) => {

		const Ref = {
			user_id: userId,
			amount: e.amount,
			ingredient_api_id: e.ingredient_api_id,
			name: e.name,
			created_at: e.created_at,
		};
		await appAxios.post("api/fridge/add", Ref).then((res) => {
		});
		await appAxios
			.post("api/shoppingList/delete", {
				user_id: userId,
				ingredient_api_id: e.ingredient_api_id,
			})
			.then((value) => {
				context?.updateShoppingList(value.data.shoppingList.list);
			});
	};

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
