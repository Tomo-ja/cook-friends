import { useState } from "react"
import Input from "./input"

import StyledModal, {classNames} from "./modal.styles"
import StyledButton from './button.styles'
import { Ingredient } from "../../helpers/typesLibrary"


type Props = {
	handleModalClose: (isAddList: boolean) => void,
	reduceItems: Ingredient[]
}

const ReduceFridgeModal = ({ handleModalClose, reduceItems }: Props) => {

	const init: number[] = []
	reduceItems.forEach(item => {
		init.push(item.amount)
	})

	const [amounts, setAmounts] = useState<number[]>(init)


	const handleClickReduce = async () => {
		console.log(amounts)
	}
	

	return(
		<StyledModal>
			<div>
				<h3>Would you like to reduce following items from your fridge?</h3>
				<span>You can adjust amount how much you exactly used</span>
				<form>
					{reduceItems.map((item, idx) => (
						<div key={item.id}>
							<p>{item.name} {item.unit === "" ? "" : `(${item.unit})`}</p>
							<Input amount={amounts[idx]} index={idx} setAmounts={setAmounts}/>
						</div>
					))}
				</form>

				<div className={classNames.buttonGroup}>
					<StyledButton onClick={() => handleClickReduce()}>Reduce</StyledButton>
					<StyledButton onClick={() => handleModalClose(false)}>Cancel</StyledButton>
				</div>

			</div>
		</StyledModal>
	)
}

export default ReduceFridgeModal