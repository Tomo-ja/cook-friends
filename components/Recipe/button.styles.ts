import styled from "styled-components";
import Button from "../Button/button.styles";

const RecipeButton = styled(Button)`

	width: 25%;
	font-size: 13px;
	padding: 0.5em 1em;


	:hover{
		background-color: #FFCE99;
		opacity: 1;
	}

	:active{
		transform: translateY(5px)
	}
`

export default RecipeButton