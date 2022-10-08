import { useEffect, useState } from "react";
import { Form } from "../components/Form/Form";
import FridgeSection from "../components/ItemInFridge";
import appAxios from "../constants/axiosBase";
import Container from "../styles/container.styles";
import MainContent from "../styles/mainContent.styles";
import SubContent from "../styles/subContent.styles";
import { stringToDate } from "../helpers";
import { count, log } from "console";
import { GetServerSideProps } from "next/types";
import {
	Fridge,
} from "../helpers/typesLibrary";
export default function FridgeList( props :any ) {
	const [fridge, setFridge] = useState<any>([]);
	const [submit, setSubmit] = useState<boolean>(false);
	const subumitState = (boolean: boolean): void => {
		return setSubmit(!boolean);
	};
	console.log("submit", submit);
	
	useEffect(() => {
		const fetch = async () => {
			console.log("fatching");
			await appAxios
				.post("api/fridge/show", { user_id: "633a59d4733aa93cea103d6e" })
				.then((res) => {
					// console.log("useeffect working correctly");
					
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
	}, [submit]);
	return (
		<Container>
			<SubContent>
				fridge: boolean;
				<Form
					btn='fridge'
					signUp={true}
					fridge={submit}
					fridgeAction={subumitState}
				/>
			</SubContent>
			<MainContent>
				<FridgeSection
					fridge={fridge}
					useAsFilter={false}
					fridgeAction={subumitState}
					fridgeDel={submit}
				/>
			</MainContent>
		</Container>
	);
}
export async function getData(): Promise<Fridge> {
    const fridgeData = await appAxios.post("/api/fridge/show", {
			user_id: "633a59d4733aa93cea103d6e",
		});
	const fridge: Fridge = [];
		Object.values(fridgeData.data).forEach((value: any) => {
			fridge.push({
				ingredient_api_id: value.ingredient_api_id,
				name: value.name,
				amount: value.amount,
				unit: value.unit,
				stored_at: stringToDate(value.stored_at).toString(),
			});
		});	
	return fridge;

}

export const getServerSideProps: GetServerSideProps = async (context) => {

	const fridges = await getData();
	
	return {
		props: { fridges },
	};
}