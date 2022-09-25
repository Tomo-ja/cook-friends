import { useState } from "react";
import ItemInFridge, {classNames} from "./itemInFridge.styles";
import { Fridge } from "../../helpers/typesLibrary";

type Props = {
	fridge: Fridge
	useAsFilter: boolean
}


const FridgeSection = ({ fridge, useAsFilter }: Props) => {

	const [selectedAsFilter, setSelectedAsFilter] = useState(false)
	
	return(
		<div>
			{fridge.map(item => (
				<ItemInFridge 
					useAsFilter={useAsFilter} 
					key={item.ingredient_api_id} 
					className={selectedAsFilter ? classNames.selected : ""}
				>
					<div className={classNames.itemFridgeLeft}>
						<p className={classNames.foodName}>
							{item.name}
						</p>
						<p className={classNames.expireDate}>
						{item.stored_at.toString()}
						</p>
					</div>
					<div className={classNames.itemFridgeRight}>
						<div className={classNames.arrowTop}></div>
						<div className={classNames.amount}>
							{useAsFilter ? "" : "Amount: "}{item.amount}{item.unit}
						</div>
						<div className={classNames.arrowBottom}></div>
					</div>
				</ItemInFridge>
			))}
		</div>
	)
}

export default FridgeSection