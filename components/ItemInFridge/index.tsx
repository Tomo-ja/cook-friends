import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import Amount from "./amount";
import ItemInFridge, {classNames} from "./itemInFridge.styles";
import StyledLink from "../../styles/link.styles";
import { defineExpireDate } from "../../helpers";
import { Fridge } from "../../helpers/typesLibrary";

// FIXME: if you want to pass any additional props, you can pass but optional like example?: number
type Props = {
	fridge: Fridge,
	useAsFilter: boolean,
	setMustIncludeIngredients?: Dispatch<SetStateAction<string[]>>
}

// TODO: for atsu, you will want to create new function here to update database and may want to pass it as props to Amount component

const FridgeSection = ({ fridge, useAsFilter, setMustIncludeIngredients}: Props) => {

	const router = useRouter()
	const [selectedAsFilter, setSelectedAsFilter] = useState<boolean[]>(()=> {
		const init: boolean[] = []
		for(let i=0; i<fridge.length; i++) {
			init.push(false)
		}
		return init
	})

	const handleClickFilter = (idx: number) => {
		if(useAsFilter){
			const isFilterOut = selectedAsFilter[idx]
			setSelectedAsFilter(prev => {
				const changing = [...prev]
				changing[idx] = !prev[idx]
				return changing
			})
			if(setMustIncludeIngredients){
				console.log('call set state from child')
				if (isFilterOut) {
					setMustIncludeIngredients(prev => [...prev].filter(food => food !== fridge[idx].name))
				} else {
					setMustIncludeIngredients(prev => [...prev, fridge[idx].name])
				}
			}
		}
	}

	const handleClickLink = (ingredient: string) => {
		if(useAsFilter){return}
		router.push({
			pathname: '/explore',
			query: {keyword: ingredient}
		})
	}

	return(
		<div>
			{fridge.map((item, idx) => (
				<ItemInFridge 
					useAsFilter={useAsFilter}
					key={item.ingredient_api_id} 
					className={selectedAsFilter[idx] ? classNames.selected : ""}
					onClick={() => handleClickFilter(idx)}
				>
					<div className={classNames.itemFridgeLeft}>
						{useAsFilter ?
							<p className={classNames.foodName}>
								{item.name}
							</p>
						:
						<StyledLink 
							hoverColor="#ffaa4e"
							onClick={() => handleClickLink(item.name)}
						>
							{item.name}
						</StyledLink>
						}
						<p className={classNames.expireDate}>
							Bought in {defineExpireDate(item.stored_at) === 0 ? 'Today' : `${defineExpireDate(item.stored_at)} days ago`}
						</p>
					</div>
					<div className={classNames.itemFridgeRight}>
						{useAsFilter ? 
							<p className={classNames.amount}>{item.amount}{item.unit}</p>
						:
							<>
								<Amount amount={item.amount} unit={item.unit}/>
							</>
						}
					</div>
				</ItemInFridge>
			))}
		</div>
	)
}

export default FridgeSection