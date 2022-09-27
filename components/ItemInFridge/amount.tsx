import { useState } from "react"
import { classNames } from "./itemInFridge.styles"

type Props = {
	amount: number,
	unit: string
}

// TODO: need to decide how to define steps by one press
// TODO: for Atsu, this component is all yours. you can modify however you like
const decideSteps = (number: number, unit: string): number => {
	return 1
}

const Amount = ({amount, unit}: Props) => {

	const [textAmount, setTextAmount] = useState(amount)
	const steps = decideSteps(amount, unit)



	return (
		<>
			<div className={classNames.arrowTop}></div>
			<p className={classNames.amount}>
				Amount: {textAmount}{unit}
			</p>
			<div className={classNames.arrowBottom}></div>
		</>
	)
}

export default Amount