import React, { useState } from "react"
import StyledInput from "./input.styles"

type Props = {
	amount: number
}

const Input = ({ amount }: Props) => {

	const [stateAmount, setStateAmount] = useState<string>(amount.toString())

	const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
		const newValue = e.currentTarget.value
		setStateAmount(newValue)
	}

	return (
		<StyledInput 
			type='number'
			min={0}
			value={stateAmount}
			onChange={handleOnChange}
		/>
	)
}

export default Input