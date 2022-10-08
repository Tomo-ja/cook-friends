import { classNames } from "./itemInFridge.styles";
import { useRef, useState } from "react";
import appAxios from "../../constants/axiosBase";

type Props = {
	amount: number;
	unit: string;
	ingredentId: string;
	useAsFilter: boolean;
};

// TODO: need to decide how to define steps by one press
// TODO: for Atsu, this component is all yours. you can modify however you like
const decideSteps = (number: number, unit: string): number => {
	return 1;
};

const Amount = ({ amount, unit, ingredentId, useAsFilter }: Props) => {
	const [textAmount, setTextAmount] = useState(amount);
	const steps = decideSteps(amount, unit);

	const [change, setChange] = useState(false);
	const changedValue = useRef<HTMLInputElement>(null!);
	const changehandle = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		console.log("working");
		setChange(true);
	};
	const hanldeUpdate = () => {
		const changedAmount = changedValue.current?.value;
		appAxios
			.post("api/fridge/remove", {
				user_id: "633a59d4733aa93cea103d6e",
				amount: changedAmount,
				ingredient_api_id: ingredentId,
			})
			.then((res) => console.log("amount change", res));
	};

	return (
		<>
			{useAsFilter && 
			<p className={classNames.amount}>
				Amount: {textAmount}
				{unit}
			</p>}
			{!useAsFilter &&
				<div>
					<input
						className={classNames.amount}
						placeholder={String(textAmount)}
						type='number'
						onChange={changehandle}
						ref={changedValue}
					/>
					{change && <button onClick={() => hanldeUpdate()}>change</button>}
				</div>
			}
		</>
	);
};

export default Amount;
