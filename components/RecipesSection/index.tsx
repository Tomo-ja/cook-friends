import StyledRecipesSection from "./recipesSection.styles";
import StyledRecipeItem from "./item.styles";
import StyledImage from "../../styles/image.styles";
import { RecipeSearchResult } from "../../helpers/typesLibrary";

type Props = {
	recipesSearchResult: RecipeSearchResult
}

const RecipeSection = ({ recipesSearchResult }: Props) => {

	console.log(recipesSearchResult.results)

	return (
		<StyledRecipesSection>
			{recipesSearchResult.results.map(recipe => (
				<StyledRecipeItem key={recipe.id}>
					{/* <StyledImage
						fill
						sizes="100%"
						alt=""
						src={recipe.image}
					/> */}

				</StyledRecipeItem>
			))}
		</StyledRecipesSection>
	)
}

export default RecipeSection