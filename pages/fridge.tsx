import { useEffect, useState } from "react";
import { Form } from "../components/Form/Form";
import FridgeSection from "../components/ItemInFridge";
import appAxios from "../constants/axiosBase";
import Container from "../styles/container.styles";
import MainContent from "../styles/mainContent.styles";
import SubContent from "../styles/subContent.styles";

export default function Fridge() {
	const [fridge, setFridge] = useState<any>()
	console.log("effectAPI", fridge);
	
	useEffect(() => {
		appAxios.post("api/fridge/show", { user_id: "633a59d4733aa93cea103d6e" })
			.then(res=>console.log(res)
			)
			// .then(res => setFridge([res.data]));

	},[])
	return (
		<Container>
			<SubContent>
				<Form btn='fridge' signUp={true} />
			</SubContent>
			<MainContent>
				<FridgeSection fridge={fridge} useAsFilter={true} />
			</MainContent>
		</Container>
	);
}
