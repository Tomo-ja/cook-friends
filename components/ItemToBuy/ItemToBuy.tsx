import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../IconButton/iconButton.styles";
import StyledItemToBuy from "../ItemToBuy/itemToBuy.styles";
import appAxios from "../../constants/axiosBase";
import { Timestamp } from "mongodb";
import { shoppingContext } from "../../useContext/useShoppingList";
interface list {
	amount: number;
	created_at: Timestamp;
	ingredient_api_id: string;
	memo: string;
	name: string;
	_id: string;
}
type itemTobuy = {
	[x: string]: any;
	list: list[];
};

const ItemToBuy = ({ list }: itemTobuy) => {
	const [buringToItem, setBuringToItem] = useState<list>();

	const context = useContext(shoppingContext);
	useEffect(() => {
		context?.updateShoppingList(list);
	}, [list]);

	const handleDelete = (id: string) => {
		appAxios
			.post("api/shoppingList/delete", {
				user_id: "633a59d4733aa93cea103d6e",
				ingredient_api_id: id,
			})
			.then((res) => { context?.updateShoppingList(res.data.shoppingList.list); console.log(res.data);
			 });
	};
	const handlefridge = async (e: list) => {
		console.log(e);
		console.log("clicked");
		const Ref = {
			user_id: "633a59d4733aa93cea103d6e",
			amount: e.amount,
			ingredient_api_id: e.ingredient_api_id,
			name: e.name,
			created_at: e.created_at,
		};
		await appAxios.post("api/fridge/add", Ref).then((res) => {
		});
		await appAxios
			.post("api/shoppingList/delete", {
				user_id: "633a59d4733aa93cea103d6e",
				ingredient_api_id: e.ingredient_api_id,
			})
			.then((value) => {
				context?.updateShoppingList(value.data.shoppingList.list);
			});
	};

	return (
		<>
			<div style={{ display: "Grid", gridTemplateColumns: "1fr 1fr" }}>
				{context?.shoppingList.map((item: list, index: number) => {
					return (
						<StyledItemToBuy key={index}>
							<div className='NameAmount'>
								<p className='FoodName'>{item.name}</p>
								<p className='Amount'>{item.amount}</p>
							</div>
							<p className='txt'>{item.memo}</p>
							<div className='btnContainer'>
								<IconButton
									backgroundColor='gray'
									onClick={() => handleDelete(item.ingredient_api_id)}
								>
									<FontAwesomeIcon icon={faTrash} style={{ color: "#000" }} />
								</IconButton>
								<IconButton
									backgroundColor='gray'
									onClick={() => handlefridge(item)}
								>
									<FontAwesomeIcon icon={faShoppingCart} />
								</IconButton>
							</div>
						</StyledItemToBuy>
					);
				})}
			</div>
		</>
	);
};

export default ItemToBuy;
