import Image from "next/image";
import { useRouter } from 'next/router';

import StyledRecipesSectionHome from "./recipeSection.styles";
import StyledRecipeItem from '../RecipesSection/item.styles'
import StyledImage from "../../styles/image.styles";

import { RecipeMinimize } from "../../helpers/typesLibrary";

type Props = {
	title: string,
	displayRecipes: RecipeMinimize[],
	isFavorite: boolean
}

const RecipesSectionHome = ({ title, displayRecipes, isFavorite }: Props) => {

	const router = useRouter()

	const handleOnSeeMoreClick = () => {
		if ( isFavorite ) {
			router.push({
				pathname: '/explore',
				query: {favorite: true}
			})
		} else {
			router.push({
				pathname: '/explore',
				query: {history: true}
			})
		}
	}

	const handleOnRecipeClick = (recipeId: number) => {
    router.push(`/recipe/${recipeId}`)
	}

	return (
		<div>
			<StyledRecipesSectionHome lessThan3={displayRecipes.length < 3 }>
			<h2>{title}</h2>
			<span onClick={() => handleOnSeeMoreClick()}>See more...</span>
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