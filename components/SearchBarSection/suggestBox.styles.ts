import styled from "styled-components";

const SuggestBox = styled.ul`

	display: block;
	margin-top: 0;
	padding: 0;
	background-color: white;
	border: #D5D2CD solid 2px;
	border-top-color: #ffaa4e;
	position: absolute;
	top: 44px;
	left: 40px;
	z-index: 10;

	li{
		display: block;

		padding: 5px 20px 5px 5px;
		font-size: 17px;
		color: #151413;
		cursor: pointer;

		:hover{
			background-color: #ffaa4e8a;
		}
	}

`

export default SuggestBox