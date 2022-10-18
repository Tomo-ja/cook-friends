import styled from "styled-components";

interface IItemInFridge {
	useAsFilter: boolean
}

const ItemInFridge = styled.div<IItemInFridge>`
	width: 100%;
	height: 55px;
	display: flex;
	justify-content: space-between;
	align-items: center;
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
		position: relative;

		:hover{
			color: #151413;
			cursor: default;
		}

		/* .Arrow-Top{
			border-top: solid 4px #d9d9d9;
			border-left: solid 4px #d9d9d9;
			width: 10px;
			height: 10px;
			transform: rotate(45deg);
			position: absolute;
			right: 10%;
			top: -9px;

			:hover{
				cursor: pointer;
			}
			:active {
				border-top: solid 4px #ffaa4e;
				border-left: solid 4px #ffaa4e;
			}

		}
		.Arrow-Bottom{
			border-bottom: solid 4px #d9d9d9;
			border-right: solid 4px #d9d9d9;
			width: 10px;
			height: 10px;
			transform: rotate(45deg);
			position: absolute;
			right: 10%;
			bottom: -9px;

			:hover{
				cursor: pointer;
			}
			:active {
				border-bottom: solid 4px #ffaa4e;
				border-right: solid 4px #ffaa4e;
			} */
		/* } */
		.Amount{
			color: inherit;
			width: 30%;
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
	selected: 'Selected'
}

export default ItemInFridge;