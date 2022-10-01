import { useState } from "react"
import Input from "./input"

import StyledModal, {classNames} from "./modal.styles"
import StyledButton from './button.styles'
import { Ingredient, User } from "../../helpers/typesLibrary"

import  appAxios  from '../../constants/axiosBase'


type Props = {
	handleModalClose: (isAddList: boolean) => void,
	reduceItems: Ingredient[],
	user: User
}

const ReduceFridgeModal = ({ handleModalClose, reduceItems, user }: Props) => {

	const init: number[] = []
	reduceItems.forEach(item => {
		init.push(item.amount)
	})

	const [amounts, setAmounts] = useState<number[]>(init)


	const handleClickReduce = async () => {
		try {
			await Promise.all(reduceItems.map((item, idx) => {
				appAxios.post('api/fridge/remove', {
					user_id: user.id,
					ingredient_api_id: item.id.toString(),
					amount: amounts[idx],
				})
			}))
			handleModalClose(false)
		}catch{
			console.log('reducing items from fridge fails')
		}
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