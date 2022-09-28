import styled from "styled-components";

const Pagination = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;

	button{
		all: unset;
		display: block;
		margin: 16px;
		border: #ffaa4e solid 1px;
		padding: 0.5em 1em;
		color: #151413;
		border-radius: 5px;
		transition: all 0.25s ease;


		&:hover{
			background-color: #ffaa4e;
			color: white;
		}
		:active{
			transform: translate(0, 2.5px)
		}
	}
`


export default Pagination