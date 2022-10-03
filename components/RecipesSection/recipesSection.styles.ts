import styled from "styled-components";

interface IRecipesSection {
	lessThan3?: boolean
}

const RecipesSection = styled.section<IRecipesSection>`
	width: 100%;

	display: flex;
	flex-wrap: wrap;
	justify-content: ${props => props.lessThan3 ? 'space-around' : 'space-between'};

	div{
		margin-bottom: 10px;
	}

`

export default RecipesSection