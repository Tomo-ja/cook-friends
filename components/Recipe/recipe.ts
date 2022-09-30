import styled from "styled-components";
const Recipe = styled.div`
	width: 100%;
	.DishName {
		font-size: 28px;
		font-weight: bold;
	}
	.Img {
		width: 680px;
		object-fit: contain;
	}
	.IngredientConatiner {
		.Ingredients {
			font-size: 20px;
			margin: 0;
		}
		.People {
			margin: 8px 0;
			font-size: 14px;
			color: #93918f;
		}
		.EachIngredients {
			display: flex;
			justify-content: space-between;
			margin: 16px 0;
			.EachIngredientsRight {
				display: flex;
				align-items: center;
			}
			.Amount {
				margin: 0;
			}
		}
	}
	.InstructionContainer {
		.Instruction {
			font-size: 20px;
			margin: 0;
		}
	}
`;
export const className = {
	DishName: "DishName",
	Img: "Img",
	IngredientConatiner: "IngredientConatiner",
	Ingredients: "Ingredients",
	People: "People",
	EachIngredients: "EachIngredients",
	EachIngredientsRight: "EachIngredientsRight",
	Amount: "Amount",
	InstructionContainer: "InstructionContainer",
	Instruction: "Instruction",
};
export default Recipe;
