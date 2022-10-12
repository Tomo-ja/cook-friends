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
export default function FridgeList(props: any) {
	const [fridge, setFridge] = useState<any>([]);
	const [submit, setSubmit] = useState<boolean>(false);
  const context = useContext(amountContext);
// console.log("context",context?.changedAmountList);

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
				.post("api/fridge/show", { user_id: "633a59d4733aa93cea103d6e" })
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
	}, [submit, context?.changedAmountList]);
	return (
		<Amount>
			<Container>
				<SubContent>
					<Form
						btn='fridge'
						signUp={false}
						fridge={submit}
						fridgeAction={subumitState}
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
				</MainContent>
			</Container>
		</Amount>
	);
}
// export async function getData(): Promise<Fridge> {
// 	const fridgeData = await appAxios.post("/api/fridge/show", {
// 		user_id: "633a59d4733aa93cea103d6e",
// 	});
// 	const fridge: Fridge = [];
// 	Object.values(fridgeData.data).forEach((value: any) => {
// 		fridge.push({
// 			ingredient_api_id: value.ingredient_api_id,
// 			name: value.name,
// 			amount: value.amount,
// 			unit: value.unit,
// 			stored_at: stringToDate(value.stored_at).toString(),
// 		});
// 	});
// 	return fridge;
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const fridges = await getData();

// 	return {
// 		props: { fridges },
// 	};
// };
