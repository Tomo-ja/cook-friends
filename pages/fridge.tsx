import { NextPageContext } from "next";
import { useContext, useEffect, useState } from "react";
import { parseCookies, } from "nookies";

import Form from "../components/Form/Form";
import FridgeSection from "../components/FridgeSection";
import FontAwesomeButton, { IconKind } from "../components/FontAwesomeButton";

import StyledContainer from "../styles/container.styles";
import StyledMainContent from "../styles/mainContent.styles";
import StyledSubContent from "../styles/subContent.styles";

import appAxios from "../constants/axiosBase";
import { stringToDate } from "../helpers";
import ContextAmount, { amountContext } from "../useContext/useAmount";

export default function FridgeList(props: any) {
	const [fridge, setFridge] = useState<any>([]);
	const [id, setId] = useState<string>("")
	const context = useContext(amountContext);
	const [switchModal, setSwitchModal] = useState<boolean>(false);


	useEffect(() => {
		const fetch = async () => {
			await appAxios
				.post("api/fridge/show", { user_id: props.Id.id })
				.then((res) => {
					const tempArr: {
						ingredient_api_id: number;
						name: string;
						amount: number;
						stored_at: string;
					}[] = [];
					Object.values(res.data).forEach((value: any) => {
						tempArr.push({
							ingredient_api_id: value.ingredient_api_id,
							name: value.name,
							amount: value.amount,
							stored_at: stringToDate(value.stored_at).toString(),
						});
					});
					setFridge(tempArr);
				});
		};
		fetch();
		setId(props.Id.id);
	}, [context?.changedAmountList]);

	const handleSwitch = () => {
		setSwitchModal(!switchModal);
	}

	return (
		<ContextAmount>
			<StyledContainer>
				<StyledSubContent className={switchModal ? "open" : ""}>
					<Form
						btn='fridge'
						signUp={false}
						userId={id}
						modal={switchModal}
						setModal={setSwitchModal}
					/>
				</StyledSubContent>
				<StyledMainContent>
					<FridgeSection
						fridge={fridge}
						useAsFilter={false}
						userId={id}
					/>
					<FontAwesomeButton
						handleClick={handleSwitch}
						target={null}
						iconKind={IconKind.Plus}
						displayOnlyMobile={true}
					/>
				</StyledMainContent>
			</StyledContainer>
		</ContextAmount>
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

