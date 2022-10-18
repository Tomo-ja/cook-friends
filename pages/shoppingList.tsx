import React, { useContext, useEffect, useState } from "react";
import { NextPageContext } from "next";
import { parseCookies} from "nookies";
import { Timestamp } from "mongodb";

import Form from "../components/Form/Form";
import FontAwesomeButton, { IconKind } from "../components/FontAwesomeButton";
import ItemToBuy from "../components/ItemToBuy/ItemToBuy";

import StyledContainer from "../styles/container.styles";
import StyledMainContent from "../styles/mainContent.styles";
import StyledSubContent from "../styles/subContent.styles";

import appAxios from "../constants/axiosBase";
import { ItemOnList } from "../helpers/typesLibrary";
import ContextShopping, { shoppingContext } from "../useContext/useShoppingList";


export default function ShoppingList( props :any) {

	const context = useContext(shoppingContext);
	const [shoppingList, setShoppingList] = useState<ItemOnList[]>([]);
	const [switchModal, setSwitchModal] = useState<boolean>(false);

	useEffect(() => {
		const fetchShoppingList = async () => {
			await appAxios
				.post("api/shoppingList/show", {
					user_id: props.Id.id,
				})
				.then((res) => {
					setShoppingList(res.data.shoppingList.list);
				});
		};
		fetchShoppingList();
	}, [context?.shoppingList]);

	const handleSwitch = () => {
		setSwitchModal(!switchModal);
	};

	return (
		<ContextShopping>
			<StyledContainer>
				<StyledSubContent className={switchModal ? "open" : ""}>
					<Form
						btn={"shopping"}
						signUp={false}
						userId={props.Id.id}
						modal={switchModal}
						setModal={setSwitchModal}
					/>
				</StyledSubContent>
				<StyledMainContent>
					<ItemToBuy list={shoppingList} userId={props.Id.id} />
				</StyledMainContent>
				<FontAwesomeButton
					handleClick={handleSwitch}
					target={null}
					iconKind={IconKind.Plus}
					displayOnlyMobile={true}
				/>
			</StyledContainer>
		</ContextShopping>
	);
}
export async function getServerSideProps(ctx?: NextPageContext) {
	const cookie = parseCookies(ctx);
	const cookieId = JSON.parse(cookie.user);
	return {
		props: {
			Id: cookieId || null,
		},
	};
}