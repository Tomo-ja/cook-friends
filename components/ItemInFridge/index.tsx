import ItemFridge, {classNames} from "./itemInFridge.style";


// have to pass fridge object

const ItemInFridge = () => {


	return(
		<ItemFridge useAsFilter={true}>
			<div className={classNames.itemFridgeLeft}>
				<p className={classNames.foodName}>
					food name
				</p>
				<p className={classNames.expireDate}>
					3 days
				</p>
			</div>
			<div className={classNames.itemFridgeRight}>
				<div className={classNames.arrowTop}></div>
				<div className={classNames.amount}>amount: 400g</div>
				<div className={classNames.arrowBottom}></div>
			</div>
		</ItemFridge>
	)
}

export default ItemInFridge