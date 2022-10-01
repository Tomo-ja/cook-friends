import React, { Dispatch, SetStateAction } from "react"
import StyledInput from "./input.styles"

type Props = {
	amount: number,
	setAmounts: Dispatch<SetStateAction<number[]>>,
	index: number
}

const Input = ({ amount, index, setAmounts }: Props) => {

	const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
		const newValue = e.currentTarget.value
		setAmounts(prev => {
			const next = [...prev]
			next[index] = parseInt(newValue, 10) || 0
			return next
		})
	}

	return (
		<StyledInput 
			type='text'
			pattern="^[0-9]*$"
			min={0}
			value={amount}
			onChange={handleOnChange}
		/>
	)
}

export default Input