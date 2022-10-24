import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import Amount from "./amount";

import StyledItemInFridge, {classNames} from "./itemInFridge.styles";
import StyledLink from "../../styles/link.styles";

import { defineExpireDate } from "../../helpers";
import { AlertInfo, Fridge } from "../../helpers/typesLibrary";

type Props = {
	setTrigger?: Dispatch<SetStateAction<number>>,
	useAsFilter: boolean,
	fridge?: Fridge,
	urlQuery?: ParsedUrlQuery,
	setMustIncludeIngredients?: Dispatch<SetStateAction<string[]>>,
	userId?: string,
	setAlert?: Dispatch<SetStateAction<AlertInfo | null>>,

}

const initFilter = (length: number): boolean[] => {
	const init: boolean[] = []
	for (let i=0; i<length; i++){
		init.push(false)
	}
	return init
}


const FridgeSection = ({ fridge, useAsFilter, setMustIncludeIngredients , urlQuery, userId, setTrigger, setAlert }: Props) => {

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
	if (!fridge || fridge.length < 1)
		return <h2 style={{"textAlign":"center"}}>fridge is empty</h2>;

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
								<Amount 
									userId={userId}
									useAsFilter={false} 
									ingredientId={item.ingredient_api_id} 
									amount={item.amount} 
									unit={item.unit} 
									name={item.name}
									setTrigger={setTrigger}
									setAlert={setAlert}
								/>
							</>
						}
					</div>
				</StyledItemInFridge>
			))}
		</div>
	)
}

export default FridgeSection