import { GetServerSideProps, InferGetServerSidePropsType, NextPageContext } from "next";
import { useContext, useEffect, useState } from "react";
import * as cookie from 'cookie'

import Form from "../components/Form/Form";
import FridgeSection from "../components/FridgeSection";
import FontAwesomeButton, { IconKind } from "../components/FontAwesomeButton";

import StyledContainer from "../styles/container.styles";
import StyledMainContent from "../styles/mainContent.styles";
import StyledSubContent from "../styles/subContent.styles";

import appAxios from "../constants/axiosBase";
import { stringToDate } from "../helpers";
import { Fridge, User } from "../helpers/typesLibrary";

type Props = {
	user: User,
}

const FridgeList = ({ user }: Props) => {

	const [fridgeUpdateTrigger, setFridgeUpdateTrigger] = useState(0)

	const [displayedFridge, setDisplayedFridge] = useState<Fridge>([])
	const [switchModal, setSwitchModal] = useState<boolean>(false);

	const handleSwitch = () => {
		setSwitchModal(!switchModal);
	}

	useEffect(() => {
		const fetchFridgeData = async () => {
			const fridge: Fridge = []
			const fridgeData = await appAxios.post('api/fridge/show', {
				user_id: user.id
			})
			Object.values(fridgeData.data).forEach((value: any) => {
				fridge.push(
					{
						ingredient_api_id: value.ingredient_api_id,
						name: value.name,
						amount: value.amount,
						unit: value.unit,
						stored_at: stringToDate(value.stored_at).toString()
					}
				)
			})
			setDisplayedFridge(fridge)
		}

		fetchFridgeData()

	}, [fridgeUpdateTrigger])

	return (
		<StyledContainer>
			<StyledSubContent className={switchModal ? "open" : ""}>
				<Form
					btn='fridge'
					signUp={false}
					userId={user.id}
					modal={switchModal}
					setModal={setSwitchModal}
					setTrigger={setFridgeUpdateTrigger}
				/>
			</StyledSubContent>
			<StyledMainContent>
				<FridgeSection
					setTrigger={setFridgeUpdateTrigger}
					fridge={displayedFridge}
					useAsFilter={false}
					userId={user.id}
				/>
				<FontAwesomeButton
					handleClick={handleSwitch}
					target={null}
					iconKind={IconKind.Plus}
					displayOnlyMobile={true}
				/>
			</StyledMainContent>
		</StyledContainer>
	);
}

export default FridgeList

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const cookieData = cookie.parse(req.headers.cookie!)
	const user: User = JSON.parse(cookieData.user)

	return { 
		props: {
			user,
		}
	}
}



