import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartPlus } from "@fortawesome/free-solid-svg-icons"

import StyledIconButton from "../IconButton/iconButton.styles"
import StyledIngredientSection, {classNames} from "./section.styles"
import { Fridge, Ingredient } from "../../helpers/typesLibrary"


// TODO: pass fridge data and recipes ingredients data to display

type Props = {
	ingredients: Ingredient[],
	fridge: Fridge | null
}

const capitalize = (string: string): string => {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

const IngredientSection = ({ ingredients, fridge }: Props) => {

	const userHasIngredient: boolean[] = []

	if (fridge) {
		ingredients.forEach((ingredient, idx) => {
			if(fridge.filter(food => food.name === ingredient.name).length > 0){
				userHasIngredient[idx] = true
			}else{
				userHasIngredient[idx] = false
			}
		})
	}

	console.log(userHasIngredient)

	return(
		<StyledIngredientSection>
			<h3>Ingredients <span>(serving for 2 people)</span></h3>
			<p className={`${classNames.textRed}  ${classNames.explain}`}>Red text indicate you do NOT have that ingredient</p>
			<ul>
				{ingredients.map((ingredient, idx) => (
				<li className={classNames.complexList} key={ingredient.id}>
					<StyledIconButton backgroundColor='#000' square={true}>
						<FontAwesomeIcon icon={faCartPlus} color = 'white' size='sm' style={{display: 'block'}}/>
					</StyledIconButton>
					<div className={classNames.inOneLine}>
						<p className={userHasIngredient[idx] ? '' : classNames.textRed}>{capitalize(ingredient.name)}</p>
						<p>{ingredient.amount} {ingredient.unit}</p>
					</div>
				</li>
				))}

			</ul>
		</StyledIngredientSection>
	)
}

export default IngredientSection