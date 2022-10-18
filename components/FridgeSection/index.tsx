import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import Amount from "./amount";

import StyledItemInFridge, {classNames} from "./itemInFridge.styles";
import StyledLink from "../../styles/link.styles";

import { defineExpireDate } from "../../helpers";
import { Fridge } from "../../helpers/typesLibrary";

type Props = {
	useAsFilter: boolean,
	fridge?: Fridge,
	urlQuery?: ParsedUrlQuery,
	setMustIncludeIngredients?: Dispatch<SetStateAction<string[]>>,
	userId?: string
}

const initFilter = (length: number): boolean[] => {
	const init: boolean[] = []
	for (let i=0; i<length; i++){
		init.push(false)
	}
	return init
}


const FridgeSection = ({ fridge, useAsFilter, setMustIncludeIngredients , urlQuery, userId }: Props) => {

	const router = useRouter()

	const [selectedAsFilter, setSelectedAsFilter] = useState<boolean[]>([])

	useEffect(()=> {
		setSelectedAsFilter(()=> {
			if (!fridge) {
				return []
			} else {
				const init = initFilter(fridge.length)
				return init
			}
		})
	}, [urlQuery, fridge])

	if (!fridge) return <div>Loading...</div>


	const handleClickFilter = (idx: number) => {
		if(useAsFilter){
			const isFilterOut = selectedAsFilter[idx]
			setSelectedAsFilter(prev => {
				const changing = [...prev]
				changing[idx] = !prev[idx]
				return changing
			})
			if(setMustIncludeIngredients){
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
				<StyledItemInFridge 
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
								<Amount useAsFilter={false} ingredientId={item.ingredient_api_id} amount={item.amount} unit={item.unit} name={item.name} />
							</>
						}
					</div>
				</StyledItemInFridge>
			))}
		</div>
	)
}

export default FridgeSection