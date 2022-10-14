import { Form } from "../components/Form/Form";
import Container from "../styles/container.styles";
import MainContent from "../styles/mainContent.styles";
import SubContent from "../styles/subContent.styles";
import ItemToBuy from "../components/ItemToBuy/ItemToBuy";
import React, { useContext, useEffect, useState } from "react";
import appAxios from "../constants/axiosBase";
import { amountContext } from "../useContext/useAmount";
import { Timestamp } from "mongodb";
import Context from "../useContext/useAmount";
import ContextShopping, { shoppingContext } from "../useContext/useShoppingList";
interface list {
	amount: number;
	created_at: Timestamp;
	ingredient_api_id: string;
	memo: string;
	name: string;
	_id: string;
}

export default function ShoppingList() {
	const context = useContext(shoppingContext);
	const [shoppingList, setShoopingList] = useState<list[]>([]);
	// console.log(context?.shoppingList);

	useEffect(() => {
		const fetchShoopingList = async () => {
			await appAxios
				.post("api/shoppingList/show", {
					user_id: "633a59d4733aa93cea103d6e",
				})
				.then((res) => {
						setShoopingList(res.data.shoppingList.list);
				});
		};
		fetchShoopingList();
	}, [context?.shoppingList]);
	return (
		<ContextShopping>
			<Container>
				<SubContent>
					<Form btn={"shopping"} signUp={false} />
				</SubContent>
				<MainContent>
					<ItemToBuy list={shoppingList} />
				</MainContent>
			</Container>
		</ContextShopping>
	);
}
