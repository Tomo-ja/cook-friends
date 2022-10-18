import { classNames } from "./itemInFridge.styles";
import { useContext, useRef, useState } from "react";
import appAxios from "../../constants/axiosBase";
import { amountContext } from "../../useContext/useAmount";

type Props = {
	amount: number;
	unit: string;
	ingredentId: string;
	useAsFilter: boolean;
	userId?: string;
	// tempFridge: object[];
};

// TODO: need to decide how to define steps by one press
// TODO: for Atsu, this component is all yours. you can modify however you like
const decideSteps = (number: number, unit: string): number => {
	return 1;
};

const Amount = ({
	amount,
	unit,
	ingredentId,
	useAsFilter,
	userId
}: Props) => {
	const context = useContext(amountContext)
	const [textAmount, setTextAmount] = useState(amount);
	const steps = decideSteps(amount, unit);
	const [change, setChange] = useState(false);
	const changedValue = useRef<HTMLInputElement>(null!);
	const changehandle = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		setChange(true);
	};
	const hanldeUpdate = () => {
		const changedAmount = changedValue.current?.value;
		appAxios
			.post("api/fridge/remove", {
				user_id: userId,
				amount: changedAmount,
				ingredient_api_id: ingredentId,
			})
			.then((res) => {
				context?.updateList(Object.values(res.data));
				changedValue.current!.value =""
			});
	};

	return (
		<>
			{useAsFilter && (
				<p className={classNames.amount}>
					Amount: {amount}
					{unit}
				</p>
			)}
			{!useAsFilter && (
				<div style={{ "display": "flex", "justifyContent": 'space-between'}}>
					<p>{amount}</p>
					<input
						className={classNames.amount}
						placeholder={String(0)}
						type='number'
						onChange={changehandle}
						ref={changedValue}
					/>
					{change && <button onClick={() => hanldeUpdate()}>change</button>}
				</div>
			)}
		</>
	);
};

export default Amount;
