import { useContext, useEffect, useState } from "react";
import { Form } from "../components/Form/Form";
import FridgeSection from "../components/ItemInFridge";
import appAxios from "../constants/axiosBase";
import Container from "../styles/container.styles";
import MainContent from "../styles/mainContent.styles";
import SubContent from "../styles/subContent.styles";
import { stringToDate } from "../helpers";
import { count, log } from "console";
import { GetServerSideProps } from "next/types";
import { Fridge, CurrentFridge } from "../helpers/typesLibrary";
import Amount, { amountContext } from "../useContext/useAmount";
import ContextAmount from "../useContext/useAmount";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";
import { NextPageContext } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import StyledSwitch from "../components/switch/siwtch";

export default function FridgeList(props: any) {
	const [fridge, setFridge] = useState<any>([]);
	const [submit, setSubmit] = useState<boolean>(false);
	const [id, setId] = useState<string>("")
	const context = useContext(amountContext);
	const [switchModal, setSwitchModal] = useState<boolean>(false);

	const subumitState = (boolean: boolean): void => {
		return setSubmit(!boolean);
	};
	const [test, setTest] = useState<any>()
	// useEffect(() => {
	// 	setTest(props.fridges);
	// },[])

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
			<Container>
				<SubContent className={switchModal ? "open" : ""}>
					<Form
						btn='fridge'
						signUp={false}
						userId={id}
						modal={switchModal}
						setModal={setSwitchModal}
					/>
				</SubContent>
				<MainContent>
					<FridgeSection
						fridge={fridge}
						// fridge={props.fridges || fridge}
						useAsFilter={false}
						fridgeAction={subumitState}
						fridgeDel={submit}
					/>
					<StyledSwitch>
						<FontAwesomeIcon icon={faPlus} onClick={handleSwitch} />
					</StyledSwitch>
				</MainContent>
			</Container>
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

