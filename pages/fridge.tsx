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
import { Fridge, User, AlertInfo } from "../helpers/typesLibrary";
import FridgeForm from "../components/Form/fridge";
import Alert from "../components/Alert";

type Props = {
	user: User,
}

const FridgeList = ({ user }: Props) => {

	const [fridgeUpdateTrigger, setFridgeUpdateTrigger] = useState(0)

	const [displayedFridge, setDisplayedFridge] = useState<Fridge>([])
	const [switchModal, setSwitchModal] = useState<boolean>(false);
	const [alert, setAlert] = useState<AlertInfo | null>(null)

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
				<FontAwesomeButton
					handleClick={handleSwitch}
					target={null}
					iconKind={IconKind.XMark}
					displayOnlyMobile={true}
					isButtonSquare={true}
					iconColor='white'
					bcColor='black'
				/>
				<FridgeForm btn='fridge'
					userId={user.id}
					modal={switchModal}
					setTrigger={setFridgeUpdateTrigger}
					setAlert={setAlert}
				/>
			</StyledSubContent>
			<StyledMainContent>
				<FridgeSection
					setTrigger={setFridgeUpdateTrigger}
					fridge={displayedFridge}
					useAsFilter={false}
					userId={user.id}
					setAlert={setAlert}
				/>
				<FontAwesomeButton
					handleClick={handleSwitch}
					target={null}
					iconKind={IconKind.Plus}
					displayOnlyMobile={true}
				/>
			</StyledMainContent>
			{alert && 
				<Alert isError={alert.isError} message={alert.message} setAlert={setAlert} />
			}
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



