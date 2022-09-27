import styled from "styled-components";

const Item = styled.div`

	width: 30%;
	color: #151413;
	aspect-ratio: 2;
	position: relative;


	h3{
		width: 100%;
		font-size: 17px;
		font-weight: bold;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		transition: opacity 0.3s ;


		:hover{
		opacity: 0.6;
	}
	}

	img{
		transition: opacity 0.3s ;

		:hover{
		opacity: 0.6;
	}
	}

	span{
		display: inline-block;
		font-size: 13px;
		vertical-align: 2px;
		margin-left: 7.5px;
		color: #93918F;
		transition: opacity 0.3s ;

		:hover{
		opacity: 0.6;
	}
	}

	button{
		position: absolute;
		top: 0;
		right: 0;
		z-index: 10;
		border-radius: 2px;
	}

	@media screen and (max-width: 768px) {
		h3{
			font-size: 13px;
		}

		span{
			font-size: 11px;
		}
	}
	@media screen and (max-width: 470px) {
		width: 47.5%
	}

`

export default Item