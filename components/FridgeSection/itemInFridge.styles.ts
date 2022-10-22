import styled from "styled-components";

interface IItemInFridge {
	useAsFilter: boolean
}

const ItemInFridge = styled.div<IItemInFridge>`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	border: black solid 1px;
	border-radius: 5px;
	padding: 8px 16px;
	margin-bottom: 8px;

	:hover{
		border-color: ${props => props.useAsFilter ? '#ffaa4e' : 'black'} ;
		cursor: ${props => props.useAsFilter ? 'pointer' : 'default'} ;
	}

	p{
		margin: 0;
	}

	.ItemFridgeLeft{
		flex: 1 1 100px;
		.FoodName{
			font-size: 17px;
		}
		.ExpireDate{
			color: #93918F;
			font-size: 11px;
		}
	}

	.ItemFridgeRight{
		color: #93918F;
		margin-block: 8px;

		:hover{
			color: #151413;
			cursor: default;
		}

		.EditContainer{
			display: flex;
			justify-content: space-between;
		}

		.Amount{
			color: inherit;
			width: 30%;
		}

		input.Amount{
			outline: none;
			padding-right: 8px;
			text-align: right;

			color: black;

			:hover, :focus{
				outline: none;
				border-color: #FFAA4E;
				border: #FFAA4E 2px solid;
			}
		}

		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
}

	}

	&.Selected {
		border-color: #ffaa4e;
		background-color: #ffaa4e;
		.ExpireDate, .Amount{
			color: white;
		}
		.FoodName{
			color: #151413;
		}
	}

	@media screen and (max-width: 1000px) {
			.ItemFridgeRight{
				display: ${props => props.useAsFilter ? 'none' : 'block'};
			}
	}
	@media screen and (max-width: 768px) {
		.ItemFridgeRight{
			display: block;
		}
	}


`

export const classNames = {
	itemFridgeLeft: 'ItemFridgeLeft',
	itemFridgeRight: 'ItemFridgeRight',
	foodName: 'FoodName',
	expireDate: 'ExpireDate',
	arrowTop: 'Arrow-Top',
	arrowBottom: 'Arrow-Bottom',
	amount: 'Amount',
	selected: 'Selected',
	editContainer: 'EditContainer'
}

export default ItemInFridge;