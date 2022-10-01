
import Input from "./input"

import StyledModal, {classNames} from "./modal.styles"
import StyledButton from './button.styles'
import { Ingredient } from "../../helpers/typesLibrary"

type Props = {
	handleModalClose: (isAddList: boolean) => void,
	addItem: Ingredient | null
}

const AddListModal = ({ handleModalClose, addItem }: Props) => {

	if (addItem === null ) {return <></>}

	return(
		<StyledModal>
			<div>
				<h3>Would you like to add following item to shopping list?</h3>
				<span>You can adjust amount how much you exactly want to add</span>
				<form>
					<div>
						<p>{addItem.name} {addItem.unit === "" ? "" : `(${addItem.unit})`}</p>
						<Input amount={addItem.amount} />
					</div>
				</form>

				<div className={classNames.buttonGroup}>
					<StyledButton>Add</StyledButton>
					<StyledButton onClick={() => handleModalClose(true)}>Cancel</StyledButton>
				</div>
			</div>
		</StyledModal>
	)
}

export default AddListModal