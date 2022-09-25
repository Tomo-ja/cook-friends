import styled from 'styled-components';
const ItemFridge = styled.div`
	width: 680px;
	height: 55px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	border: black solid 1px;
	border-radius: 5px;
	.ItemFridgeLeft {
		margin-left: 20px;
		.FoodName {
			padding-top: 4px; // 6.5
			margin: 0;
			font-size: 17px;
		}
		.ExpireDate {
			font-size: 11px;
			margin: 0;
			padding-top: 4px;
		}
	}
	.ItemFridgeRight {
		position: relative;
		display: flex;
		align-items: center;
		margin-right: 10px;
		.Arrow-Top {
			border-top: solid 4px #d9d9d9;
			border-left: solid 4px #d9d9d9;
			width: 10px;
			height: 10px;
			transform: rotate(45deg);
			position: absolute;
			right: 55px;
			top: 6px;
			:active {
				border-top: solid 4px #ffaa4e;
				border-left: solid 4px #ffaa4e;
			}
		}
		.Arrow-Bottom {
			border-bottom: solid 4px #d9d9d9;
			border-right: solid 4px #d9d9d9;
			width: 10px;
			height: 10px;
			transform: rotate(45deg);
			position: absolute;
			right: 55px;
			bottom: 6px;
			:active {
				border-bottom: solid 4px #ffaa4e;
				border-right: solid 4px #ffaa4e;
			}
		}

		.Amount {
			margin: 0;
			margin-right: 10px;
			padding: 0;
			display: flex;
			align-items: center;
		}
	}
	@media only screen and (max-width: 375px) {
		width: 328px;
		height: 55px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		border: black solid 1px;
		border-radius: 5px;
	}
`;

export const classNames = {
	itemFridgeLeft: 'ItemFridgeLeft',
	itemFridgeRight: 'ItemFridgeRight',
	foodName: 'FoodName',
	expireDate: 'ExpireDate',
	arrowTop: 'Arrow-Top',
	arrowBottom: 'Arrow-Bottom',
	amount: 'Amount'
}

export default ItemFridge;
