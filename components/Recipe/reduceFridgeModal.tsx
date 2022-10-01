import Input from "./input"

import StyledModal, {classNames} from "./modal.styles"
import StyledButton from './button.styles'
import StyledInput from './input.styles'
import { Ingredient } from "../../helpers/typesLibrary"


type Props = {
	handleModalClose: (isAddList: boolean) => void,
	reduceItems: Ingredient[]
}

const ReduceFridgeModal = ({ handleModalClose, reduceItems }: Props) => {


	return(
		<StyledModal>
			<div>
				<h3>Would you like to reduce following items from your fridge?</h3>
				<span>You can adjust amount how much you exactly used</span>
				<form>
					{reduceItems.map((item, idx) => (
						<div key={item.id}>
							<p>{item.name} {item.unit === "" ? "" : `(${item.unit})`}</p>
							<Input amount={item.amount} />
						</div>
					))}
				</form>

				<div className={classNames.buttonGroup}>
					<StyledButton>Reduce</StyledButton>
					<StyledButton onClick={() => handleModalClose(false)}>Cancel</StyledButton>
				</div>

			</div>
		</StyledModal>
	)
}

export default ReduceFridgeModal