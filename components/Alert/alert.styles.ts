import styled, { keyframes } from "styled-components";

interface IAlert {
	isError: boolean
}

const AlertAnime = keyframes`
	0% { transform: translateX(100px); opacity: 0; }
	25% { transform: translateX(0px); opacity: 1;};
	75% { transform: translateX(0px); opacity: 1;};
	100% { transform: translateX(100px); opacity: 0;};
`

const Alert = styled.p<IAlert>`
	position: fixed;
	bottom: 5%;
	right: 5%;
	padding: 0.5em 1.5em;
	border-radius: 5px;
	background-color: ${props => props.isError ? '#F4989C' : '#80CFF1'};
	color: white;
	font-size: 20px;
	animation: ${AlertAnime} 5s ease-in-out forwards;
	z-index: 100;
`


export default Alert