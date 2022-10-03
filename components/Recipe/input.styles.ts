import styled from "styled-components";
import Input from "../Input/input.styles";

const RecipeInput = styled(Input)`
	width: 100px;
	height: 36px;
	text-align: right;
	margin-bottom: 0%;

	::-webkit-inner-spin-button,
	::-webkit-outer-spin-button{
		appearance: none;
		margin: 0;
	}
`

export default RecipeInput