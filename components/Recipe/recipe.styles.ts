import styled from "styled-components";
import MainContent from "../../styles/mainContent.styles";
import Container from "../../styles/container.styles";

export const RecipeContainer = styled(Container)`
	justify-content: center;
`


const Recipe = styled(MainContent)`

	position: relative;

	h2{
		margin-bottom: 8px;
	}

	p{
		margin: 0;
	}

`

export default Recipe