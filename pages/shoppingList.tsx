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
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";
import { NextPageContext } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import StyledSwitch from "../components/switch/siwtch";
interface list {
	amount: number;
	created_at: Timestamp;
	ingredient_api_id: string;
	memo: string;
	name: string;
	_id: string;
}

export default function ShoppingList( props :any) {
	const context = useContext(shoppingContext);
	const [shoppingList, setShoopingList] = useState<list[]>([]);
	const [switchModal, setSwitchModal] = useState<boolean>(false);

	useEffect(() => {
		const fetchShoopingList = async () => {
			await appAxios
				.post("api/shoppingList/show", {
					user_id: props.Id.id,
				})
				.then((res) => {
					setShoopingList(res.data.shoppingList.list);
				});
		};
		fetchShoopingList();
	}, [context?.shoppingList]);
	const handleSwitch = () => {
		setSwitchModal(!switchModal);
	};
	return (
		<ContextShopping>
			<Container>
				<SubContent className={switchModal ? "open" : ""}>
					<Form
						btn={"shopping"}
						signUp={false}
						userId={props.Id.id}
						modal={switchModal}
						setModal={setSwitchModal}
					/>
				</SubContent>
				<MainContent>
					<ItemToBuy list={shoppingList} userId={props.Id.id} />
				</MainContent>
				<StyledSwitch>
					<FontAwesomeIcon icon={faPlus} onClick={handleSwitch} />
				</StyledSwitch>
			</Container>
		</ContextShopping>
	);
}
export async function getServerSideProps(ctx?: NextPageContext) {
	const cookie = parseCookies(ctx);
	// console.log(cookie.user); // { accessToken: 'test1234' }
	const cookieId = JSON.parse(cookie.user);
	return {
		props: {
			Id: cookieId || null,
		},
	};
}