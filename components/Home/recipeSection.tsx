import Image from "next/image";

import StyledRecipesSectionHome from "./recipeSection.styles";
import StyledRecipeItem from '../RecipesSection/item.styles'
import StyledImage from "../../styles/image.styles";


import { RecipeInfo } from "../../helpers/typesLibrary";

type Props = {
	title: string,
	displayRecipes: RecipeInfo[]
}

const RecipesSectionHome = ({ title, displayRecipes}: Props) => {

	const handleOnRecipeClick = (recipeId: number) => {

	}

	// TODO: develope navigation when each content clicked
	return (
		<div>
			<StyledRecipesSectionHome lessThan3={displayRecipes.length < 3 }>
			<h2>{title}</h2>
			<span>See more...</span>
				{displayRecipes.map((recipe) => (
					<StyledRecipeItem key={recipe.id}>
						<StyledImage width="100%" ratio={1} radius={"5px"} shadow={true}>
							<Image
								onClick={() => handleOnRecipeClick(recipe.id)}
								src={recipe.image}
								alt={'picture of dish'}
								layout='fill'
								objectFit='cover'
							/>
						</StyledImage>
						<h3 onClick={() => handleOnRecipeClick(recipe.id)}>{recipe.title}</h3>
					</StyledRecipeItem>
				))}
			</StyledRecipesSectionHome>
		</div>
	)
}

export default RecipesSectionHome