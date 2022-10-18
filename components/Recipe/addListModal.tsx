import { useState } from "react"

import Input from "./input"

import StyledModal, {classNames} from "./modal.styles"
import StyledButton from './button.styles'

import { Ingredient, User } from "../../helpers/typesLibrary"
import  appAxios  from '../../constants/axiosBase'

type Props = {
	handleModalClose: (isAddList: boolean) => void,
	addItem: Ingredient,
	user: User,
	title: string
}

const AddListModal = ({ handleModalClose, addItem, user, title }: Props) => {

	const [amounts, setAmounts] = useState<number[]>([addItem.amount])


	if (addItem === null ) {return <></>}


	const handleClickAdd = async () => {
		try{
			console.log(addItem.id.toString(), addItem.name)
			await appAxios.post('api/shoppingList/add', {
				user_id: user.id,
				ingredient_api_id: addItem.id.toString(),
				name: addItem.name,
				amount: amounts[0],
				unit: addItem.unit,
				memo: `Use for ${title}`
			})
			handleModalClose(true)
		}catch{
			console.log('adding item to shopping list fail')
		}
	}

	return(
		<StyledModal>
			<div>
				<h3>Would you like to add following item to shopping list?</h3>
				<span>You can adjust amount how much you exactly want to add</span>
				<form>
					<div>
						<p>{addItem.name} {addItem.unit === "" ? "" : `(${addItem.unit})`}</p>
						<Input amount={amounts[0]} index={0} setAmounts={setAmounts}/>
					</div>
				</form>

				<div className={classNames.buttonGroup}>
					<StyledButton onClick={() => handleClickAdd()}>Add</StyledButton>
					<StyledButton onClick={() => handleModalClose(true)}>Cancel</StyledButton>
				</div>
			</div>
		</StyledModal>
	)
}

export default AddListModal