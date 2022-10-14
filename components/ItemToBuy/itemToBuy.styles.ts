import styled from "styled-components";
const StyledItemToBuy = styled.div`
	margin: 16px;
	width: 200px;
	border: black solid 1px;
	padding: 8px;
	.NameAmount {
		display: flex;
		flex-direction: column;
		.FoodName {
			margin: 0;
			padding-top: 8px;
			font-size: 16px;
			font-weight: bold;
		}
		.Amount {
			margin: 0;
			padding-top: 8px;
			font-size: 14px;
			color: #93918f;
		}
	}
	.txt {
		margin: 0;
		padding-top: 8px;
		color: #93918f;
		font-size: 14px;
	}
	.btnContainer {
		width: 100px;
		margin: 0 auto;
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
	}
	@media only screen and (max-width: 375px) {
    margin: 0;
    margin-top : 16px;
    width: 340px;
		.NameAmount {
			display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
			.FoodName {
				margin: 0;
				padding-top: 8px;
				font-size: 16px;
				font-weight: bold;
			}
			.Amount {
				margin: 0;
				padding-top: 8px;
				font-size: 14px;
				color: #93918f;
			}
		}
	}
`;
export const className = {
	NameAmount: "NameAmount",
	FoodName: "FoodName",
	Amount: "Amount",
	txt: "txt",
	btnContainer: "btnContainer",
	
};
export default StyledItemToBuy;