import styled from "styled-components";
import RecipesSection from "../RecipesSection/recipesSection.styles";


const RecipesSectionHome = styled(RecipesSection)`

	margin-block: 44px;
	span{
		display: block;
		width: 100%;
		height: 1em;
		margin-top: -31px;
		margin-bottom: 36px;
		text-align: right;
		transition: all 0.25s;
		cursor: pointer;

		:hover{
			color: #ffaa4e;
		}
	}

	@media screen and (max-width: 768px) {

		span{
			font-size: 13px;
		}
	}

`

export default RecipesSectionHome